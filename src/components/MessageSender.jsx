import React, { useState } from "react";
// import CraneTooltip from "./CraneTooltip";
// import PropTypes from "prop-types";
// import { EditorState, Modifier } from "draft-js";
import fullTime from "./localTime";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import DirectMessageProfile from "./DirectMessageProfile";
import Sender from "./Sender";
import { ContentState, convertFromHTML, EditorState } from "draft-js";

const getIcon = (iconName) => `icons/message-sender/${iconName}.svg`;

const MessageSender = (props) => {
  const [chatMessage, setChatMessage] = useState([]);

  const blocksFromHTML = convertFromHTML(``);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(state)
  );

  const [editorFocus, setEditorFocus] = useState(false);

  let messageLength = editorState?.getCurrentContent().getPlainText("\u0001");

  const sendMessage = () => {
    const messageDetails = {
      message: content,
      time: fullTime,
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

  // const focus = () => refs.editor.focus();

  // const handleKeyDown = (e, element, index) => {
  //   element.current.focus();
  // };
  // const inputRef = useRef(null);

  return (
    <div className=" messenger d-flex flex-center ">
      <div className="d-flex flex-column messages-container mt-auto">
        <DirectMessageProfile
          active={true}
          username="rashmika.piyush143"
          src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
          bio="This space is just for you. Jot down notes, list your to-dos, or
              keep links and files handy. You can also talk to yourself here,
              but please bear in mind you’ll have to supply both sides of the
              conversation."
        />
        <Sender
          src="https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg"
          username="rashmika.piyush143"
          active={true}
          chatMessage={chatMessage}
        />
      </div>

      <div
        className={`message-sender d-flex flex-column w-100 ${
          editorFocus ? "focus-message-sender" : ""
        }`}

        // onClick={focus}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="message-sender-toolbar"
          wrapperClassName="message-sender-wrapper"
          editorClassName="message-sender-textarea"
          onEditorStateChange={setEditorState}
          spellCheck="true"
          onFocus={() => setEditorFocus(true)}
          onBlur={() => setEditorFocus(false)}
          // onBlur={(e) => {
          //   handleKeyDown(e, inputRef);
          // }}
          // ref={inputRef}
          placeholder="jot something down"
          customStyleMap={{
            CODE: {
              fontFamily: "monospace",
              overflowWrap: "break-word",
              background: "rgb(34, 37, 41)",
              borderRadius: "3px",
              color: "rgb(232, 145, 45)",
              border: "1px solid rgb(60, 62, 66)",
              padding: "1px 3px",
            },
          }}
          mention={{
            separator: " ",
            trigger: "@",
            suggestions: [
              { text: "APPLE", value: "apple", url: "apple" },
              { text: "BANANA", value: "banana", url: "banana" },
            ],
          }}
          hashtag={{
            separator: " ",
            trigger: "#",
          }}
          toolbar={{
            options: ["inline", "list", "link", "remove", "history"],
            inline: {
              inDropdown: false,
              className: "message-sender-inline-wrapper",
              icon: getIcon("bold"),
              dropdownClassName: undefined,
              options: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "monospace",
                "superscript",
                "subscript",
              ],
              bold: {
                icon: getIcon("bold"),
                className: "sender-toolbar-icon",
              },
              italic: {
                icon: getIcon("italic"),
                className: "sender-toolbar-icon",
              },
              underline: {
                icon: getIcon("underline"),
                className: "sender-toolbar-icon",
              },
              strikethrough: {
                icon: getIcon("strikethrough"),
                className: "sender-toolbar-icon",
              },
              monospace: {
                icon: getIcon("monospace"),
                className: "sender-toolbar-icon",
              },
              superscript: {
                icon: getIcon("superscript"),
                className: "sender-toolbar-icon",
              },
              subscript: {
                icon: getIcon("subscript"),
                className: "sender-toolbar-icon",
              },
            },
            list: {
              inDropdown: false,
              className: "message-sender-inline-wrapper",
              dropdownClassName: undefined,
              options: ["unordered", "ordered"],
              unordered: {
                icon: getIcon("unordered"),
                className: "sender-toolbar-icon",
              },
              ordered: {
                icon: getIcon("ordered"),
                className: "sender-toolbar-icon",
              },
            },
            link: {
              inDropdown: false,
              className: "message-sender-inline-wrapper",
              popupClassName: undefined,
              dropdownClassName: undefined,
              showOpenOptionOnHover: true,
              defaultTargetOption: "_self",
              options: ["link", "unlink"],
              link: {
                icon: getIcon("link"),
                className: "sender-toolbar-icon",
              },
              unlink: {
                icon: getIcon("unlink"),
                className: "sender-toolbar-icon",
              },
              linkCallback: undefined,
            },
            remove: {
              icon: getIcon("remove"),
              className: "message-sender-inline-wrapper icon",
            },
            history: {
              inDropdown: false,
              className: "message-sender-inline-wrapper",
              dropdownClassName: undefined,
              options: ["undo", "redo"],
              undo: {
                icon: getIcon("undo"),
                className: "sender-toolbar-icon",
              },
              redo: {
                icon: getIcon("redo"),
                className: "sender-toolbar-icon",
              },
            },
          }}
        />

        <div className="message-send-container">
          <div
            className={`d-flex ${
              messageLength ? "send-message-icon-active" : ""
            } send-message-icon  mr-1`}
          >
            <button
              onClick={sendMessage}
              disabled={!messageLength ? true : false}
            >
              <RiSendPlane2Fill size={17} />
            </button>

            <MdKeyboardArrowDown size={17} className="pl-2 flex-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
