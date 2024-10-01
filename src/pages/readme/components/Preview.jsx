import { marked } from 'marked';
import React, { useEffect } from 'react';
import dompurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

const Preview = ({ markdown }) => {
  marked.use({
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, language).value;
    },
    langPrefix: 'hljs language-',
  });

  const parsed = dompurify.sanitize(marked.parse(markdown));

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [markdown]);

  return (
    <div className="grid grid-rows-[20px_auto] h-full">
      <div className="p-1 px-3 text-black">Preview</div>
      <div className="bg-zinc-100 m-2 p-3 border rounded-md border-gray-900 overflow-auto max-h-[630px] max-w-full">
        <div className="prose font-sans">
          <div
            className="overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: parsed }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
