import React from "react";

import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextApi,
} from "@uiw/react-md-editor";

const WriteForm = ({
  userObj,
  onChangeImage,
  markdownContent,
  setMarkdownContent,
}) => {
  //custom md toolbar menu
  const title1 = {
    name: "title1",
    keyCommand: "title1",
    buttonProps: { "aria-label": "Insert title1" },
    icon: (
      <div width="12" height="12" viewBox="0 0 520 520">
        H1
      </div>
    ),
    execute: (state, api) => {
      let modifyText = `# ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `# `;
      }
      api.replaceSelection(modifyText);
    },
  };

  const title2 = {
    name: "title2",
    keyCommand: "title2",
    buttonProps: { "aria-label": "Insert title2" },
    icon: (
      <div width="12" height="12" viewBox="0 0 520 520">
        H2
      </div>
    ),
    execute: (state, api) => {
      let modifyText = `## ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `## `;
      }
      api.replaceSelection(modifyText);
    },
  };

  const title3 = {
    name: "title3",
    keyCommand: "title3",
    buttonProps: { "aria-label": "Insert title3" },
    icon: (
      <div width="12" height="12" viewBox="0 0 520 520">
        H3
      </div>
    ),
    execute: (state, api) => {
      let modifyText = `### ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `### `;
      }
      api.replaceSelection(modifyText);
    },
  };

  return (
    <MDEditor
      value={markdownContent}
      onChange={setMarkdownContent}
      height={810}
      commands={[
        title1,
        title2,
        title3,
        commands.divider,
        commands.bold,
        commands.italic,
        commands.strikethrough,
        commands.hr,
        commands.divider,
        commands.link,
        commands.quote,
        commands.code,
        commands.image,
        commands.divider,
        commands.unorderedListCommand,
        commands.orderedListCommand,
        commands.checkedListCommand,
        commands.divider,
        commands.codeEdit,
        commands.codeLive,
        commands.codePreview,
        commands.divider,
        commands.fullscreen,
      ]}
    />
  );
};

export default WriteForm;
