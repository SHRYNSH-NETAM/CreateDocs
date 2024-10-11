import { marked } from 'marked';
import React, { useEffect,useMemo } from 'react';
import dompurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useStore } from '../store';

const Preview = () => {

  const activeSections = useStore(
    (state) => state.ActiveSections
  );

  // const filteredActiveSections = useMemo(() => {
  //   return activeSections.filter((section) => section. === 'active');
  // }, [activeSections]);

    // Combine markdown from all active sections
    const combinedMarkdown = useMemo(() => {
      return activeSections.map(section => section.markdown).join('\n');
    }, [activeSections]);

  marked.use({
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, language).value;
    },
    langPrefix: 'hljs language-',
  });

  const parsed = dompurify.sanitize(marked.parse(combinedMarkdown));

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [combinedMarkdown]);

  return (
    <div className="grid grid-rows-[20px_auto] h-full">
      <div className="p-1 px-3 text-zinc-700 font-semibold">Preview</div>
      <div className="bg-zinc-100 m-2 p-3 border rounded-md border-gray-900 overflow-auto max-h-[630px] max-w-full scrollbar-custom">
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
