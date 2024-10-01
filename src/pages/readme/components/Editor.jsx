import React from 'react';
import { Editor } from '@monaco-editor/react';

const MarkdownEditor  = ({ markdown, setMarkdown }) => {
  return (
    <div className="grid grid-rows-[20px_auto] h-full">
      <div className="p-1 text-black px-3">Editor</div>
        <Editor
            className="m-2 max-w-full h-[630px]"
            theme='vs-dark'
            language='markdown'
            defaultValue=""
            value={markdown}
            onChange={(value) => setMarkdown(value)}
            options={{ 
                "glyphMargin": false,
                // "folding": false,
                "lineNumbers": "off",
                minimap: {
                  enabled: false
                },
            }}
        />
    </div>
  );
};

export default MarkdownEditor ;
