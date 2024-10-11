import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import {useStore} from '../store'

const MarkdownEditor = () => {

  const SelectedSection = useStore(
    (state) => state.SelectedSection
  );

  const SetSelectedSection = useStore(
    (state) => state.SetSelectedSection
  );

  const handleEditorWillMount = (monaco) => {
    // Define a custom theme before the editor is mounted
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark', // can be 'vs', 'vs-dark', or 'hc-black'
      inherit: true, // inherit from the base theme
      rules: [], // Add custom rules for syntax highlighting if needed
      colors: {
        'editor.background': '#27272a' // Your custom background color
      }
    });
  };

  const handleEditorDidMount = (editor) => {
    editor.focus();
  };

  return (
    <div className="grid grid-rows-[20px_auto] h-full">
      <div className="p-1 text-zinc-700 font-semibold px-3">Editor</div>
      {SelectedSection.slug !== ''
      ?
      <Editor
        className="m-2 max-w-full h-[630px]"
        theme="myCustomTheme" // Apply the custom theme
        language="markdown"
        defaultValue=""
        value={SelectedSection.markdown}
        onChange={(value) => SetSelectedSection(SelectedSection.slug, value)}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        options={{
          glyphMargin: false,
          lineNumbers: 'off',
          minimap: {
            enabled: false
          },
        }}
      />
      :
      <></>
      }
    </div>
  );
};

export default MarkdownEditor;