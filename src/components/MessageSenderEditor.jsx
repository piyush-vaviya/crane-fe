import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { RiSendPlane2Fill } from "react-icons/ri";
import { Button } from "@mui/material";
import CraneTooltip from "./CraneTooltip";

const getIcon = (iconName) => `icons/message-sender/${iconName}.svg`;

const MessageSenderEditor = ({
  editorFocus,
  setEditorFocus,
  messageLength,
  sendMessage,
  editorState,
  setEditorState,
  messageReceiverName,
  inputRef,
}) => {
  const [showToolbar, setShowToolbar] = useState(true);

  const toolbarHide = () => {
    setShowToolbar(!showToolbar);
  };
  return (
    <div
      className={`message-sender d-flex flex-column w-100 ${
        editorFocus ? "focus-message-sender" : ""
      }`}

      // onClick={focus}
    >
      <Editor
        editorState={editorState}
        toolbarClassName={`message-sender-toolbar ${showToolbar ? "" : "hide"}`}
        wrapperClassName="message-sender-wrapper"
        editorClassName="message-sender-textarea"
        onEditorStateChange={setEditorState}
        spellCheck="true"
        onFocus={() => setEditorFocus(true)}
        onBlur={() => setEditorFocus(false)}
        placeholder={`message ${messageReceiverName}`}
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

      <div className="message-send-container d-flex align-items-center">
        <div className=" flex-center mr-auto">
          <CraneTooltip
            title={<span className="fs-7 fw-bold">Hide Formatting</span>}
            content={
              <div
                className={`ml-3 mb-2 hide-format ${
                  showToolbar
                    ? "text-decoration-underline"
                    : "text-decoration-none"
                }`}
                onClick={toolbarHide}
              >
                Aa
              </div>
            }
          />
        </div>

        <div
          className={`d-flex ${
            messageLength ? "send-message-icon-active" : ""
          } send-message-icon  mr-1`}
        >
          <Button
            onClick={sendMessage}
            disabled={!messageLength ? true : false}
            onMouseDown={(e) => e.preventDefault()}
          >
            <RiSendPlane2Fill size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageSenderEditor;
