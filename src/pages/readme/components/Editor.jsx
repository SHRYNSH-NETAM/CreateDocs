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
    <div className="basis-full flex flex-col">
      <div className="flex-none h-[20px] p-1 text-zinc-700 font-semibold px-3">Editor</div>
      <div className="flex-1 m-2 flex items-center justify-center border border-zinc-800">
        {SelectedSection.slug !== ''
        ?
        <Editor
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
        <div className="text-zinc-700 font-semibold">Select a section from the left sidebar to edit the contents</div>
        }
      </div>
    </div>
    // <div className="basis-full bg-pink-200"></div>
  );
};

export default MarkdownEditor;