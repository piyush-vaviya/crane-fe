import React, { useEffect, useState } from "react";
// import getFullTime from "./localTime";
import { toast } from "react-toastify";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Header from "./Header";
import DirectMessageProfile from "./utils/DirectMessageProfile";
import Sender from "./Sender";
import MessageSenderEditor from "./MessageSenderEditor";
import axios from "../components/api/message";
import { getDifferedState } from "./api/utils";

const MessageSender = ({
  active,
  username,
  src,
  bio,
  friends,
  showProfileEditor,
  ownerUserName,
  ownerUserId,
  receiverId,
}) => {
  const [chatMessage, setChatMessage] = useState({});
  const [isSending, setIsSending] = useState();
  const [editingMode, setEditingMode] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [mappedMessages, setMappedMessages] = useState([]);
  const [editorId, setEditorId] = useState("");
  const [editorLocalKey, setEditorLocalKey] = useState("");
  const blocksFromHTML = convertFromHTML(``);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const getAllMessage = async () => {
    setLoading(true);
    const response = await axios.get(
      `/message?senderId=${ownerUserId}&receiverId=${receiverId}` // TODO: ahiya sender ne receiver ma _id aavse user ni
    );
    setChatMessage({ ...response.data });
    setLoading(false);
  };

  useEffect(() => {
    getAllMessage();
  }, []);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(state)
  );

  let messageLength = editorState
    ?.getCurrentContent()
    .getPlainText("\u0001")
    ?.trim()?.length;

  const content = editorState?.getCurrentContent()
    ? stateToHTML(editorState?.getCurrentContent(), {
        inlineStyles: {
          // Override default element (`strong`).

          BOLD: { attributes: { className: "bold" } },
          ITALIC: {
            // Add custom attributes. You can also use React-style `className`.
            attributes: { className: "italic" },
          },
          UNDERLINE: {
            attributes: { className: "underline" },
          },
          STRIKETHROUGH: { attributes: { className: "strikeThrough" } },
          CODE: {
            // Add custom attributes. You can also use React-style `className`.
            attributes: { className: "monoSpace" },
          },
          SUPERSCRIPT: { attributes: { className: "superScript" } },
          SUBSCRIPT: { attributes: { className: "subScript" } },

          // Use a custom inline style. Default element is `span`.
        },
      })
    : "";

  const sendMessage = async () => {
    const randomId = Math.floor(new Date().valueOf() * Math.random());

    let clonedMessages = { ...chatMessage };
    try {
      const duplicateMessage = {
        localId: randomId,
        _id: randomId,
        message: content,
        messageTime: new Date(),
        sending: true,
        sendingError: false,
        isEditing: false,
        isDeleting: false,
      };
      clonedMessages[randomId] = { ...duplicateMessage };
      setEditorState(EditorState.createEmpty());

      setChatMessage(clonedMessages);

      setIsSending(true);
      const data = {
        message: content,
        senderId: ownerUserId,
        receiverId: receiverId,
      };

      const response = await axios.post("/message", data);

      const { _id } = response;

      clonedMessages = { ...(await getDifferedState(setChatMessage)) };
      clonedMessages[randomId].sending = false;
      clonedMessages[randomId]._id = _id;
    } catch (error) {
      clonedMessages = { ...(await getDifferedState(setChatMessage)) };
      clonedMessages[randomId].sending = false;
      clonedMessages[randomId].sendingError = true;
      toast.error(error.message);
    }

    setChatMessage(clonedMessages);

    setIsSending(false);
  };

  const updateMessage = async (_id, localKey) => {
    setEditingMode(false);
    let clonedMessages = { ...mappedMessages };
    try {
      clonedMessages[localKey].isUpdating = true;
      setChatMessage(clonedMessages);
      setLoading(true);
      const data = { message: content, _id: _id };
      setEditorState(EditorState.createEmpty());
      const response = await axios.put("/message", data);

      clonedMessages[localKey].message = content;
      clonedMessages[localKey].isUpdating = false;
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
      setEditingMode(false);
      setEditorState(EditorState.createEmpty());
    }
    setChatMessage(clonedMessages);
    setLoading(false);
  };

  const mappedMessages = [];
  for (const messageKey of Object.keys(chatMessage)) {
    mappedMessages.push({ ...chatMessage[messageKey], localKey: messageKey });
  }

  return (
    <>
      <Header active={active} src={src} username={username} />
      <div className=" messenger d-flex flex-center ">
        <div className="d-flex flex-column messages-container mt-auto">
          <DirectMessageProfile
            active={active}
            username={username}
            src={src}
            bio={bio}
            hiUserSize={60}
          />
          <Sender
            showProfileEditor={showProfileEditor}
            src={src}
            username={username}
            active={active}
            chatMessage={mappedMessages}
            setChatMessage={setChatMessage}
            isSending={isSending}
            editorState={editorState}
            setEditorState={setEditorState}
            editingMode={editingMode}
            setEditingMode={setEditingMode}
            setEditorId={setEditorId}
            content={content}
            setEditorLocalKey={setEditorLocalKey}
            senderId={ownerUserId}
            receiverId={receiverId}
          />
        </div>
        <MessageSenderEditor
          editorState={editorState}
          setEditorState={setEditorState}
          messageLength={messageLength}
          sendMessage={sendMessage}
          messageReceiverName={username}
          friends={friends}
          ownerUserName={ownerUserName}
          username={username}
          editingMode={editingMode}
          setEditingMode={setEditingMode}
          updateMessage={updateMessage}
          editorId={editorId}
          editorLocalKey={editorLocalKey}
        />
      </div>
    </>
  );
};

export default MessageSender;
