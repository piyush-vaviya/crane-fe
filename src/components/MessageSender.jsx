import React, { useState } from "react";
import getFullTime from "./localTime";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import Header from "./Header";
import DirectMessageProfile from "./utils/DirectMessageProfile";
import Sender from "./Sender";
import MessageSenderEditor from "./MessageSenderEditor";

const MessageSender = ({
  active,
  username,
  src,
  bio,
  friends,
  showProfileEditor,
}) => {
  const [chatMessage, setChatMessage] = useState([]);
  const [editorFocus, setEditorFocus] = useState(false);
  const blocksFromHTML = convertFromHTML(``);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(state)
  );

  let messageLength = editorState?.getCurrentContent().getPlainText("\u0001");

  const sendMessage = (event) => {
    const messageDetails = {
      message: content,
      time: getFullTime("hh:mm tt"),
      tooltipTime: getFullTime("hh:mm:ss tt"),
      msgTime: getFullTime("hh:mm"),
    };
    setChatMessage([...chatMessage, messageDetails]);
    setEditorState(EditorState.createEmpty());
  };

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
            chatMessage={chatMessage}
          />
        </div>
        <MessageSenderEditor
          editorState={editorState}
          setEditorState={setEditorState}
          editorFocus={editorFocus}
          setEditorFocus={setEditorFocus}
          messageLength={messageLength}
          sendMessage={sendMessage}
          messageReceiverName={username}
          friends={friends}
        />
      </div>
    </>
  );
};

export default MessageSender;
