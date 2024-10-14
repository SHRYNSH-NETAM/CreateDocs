import { marked } from 'marked';
import { useEffect,useMemo, useState } from 'react';
import dompurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useStore } from '../store';

const Preview = () => {

  const [output,setOutput] = useState("Preview");
  const activeSections = useStore(
    (state) => state.ActiveSections
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(combinedMarkdown);
  };

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
    <div className="basis-full flex flex-col max-w-[600px]">
      <div className="flex-none h-[20px] p-1 px-3 text-zinc-600 font-medium flex gap-4">
        <p role="button" className={`${output=="Preview" ? 'text-black font-bold' : ''}`} onClick={()=>{setOutput("Preview")}}>Preview</p>
        <p role="button" className={`${output=="Raw" ? 'text-black font-bold' : ''}`} onClick={()=>{setOutput("Raw")}}>Raw</p>
      </div>
      <div className="flex-1 bg-zinc-100 m-2 p-3 border rounded-md border-gray-900 overflow-y-auto scrollbar-custom flex flex-col relative">
        <div className="h-[0px] overflow-visible flex flex-col relative">
          {
          output == "Preview"
          ? null
          : <div>
              <div className="absolute top-3 right-3 z-50 p-0" role="button" onClick={handleCopy}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-zinc-700 hover:bg-zinc-300 focus:bg-black rounded-lg transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
              </div>
            </div>
        }
        {
          output == "Preview"
          ? <div className="prose font-sans flex flex-nowrap">
              <div className="overflow-x-auto inline" dangerouslySetInnerHTML={{ __html: parsed }} />
            </div>
          : <pre className="whitespace-pre-wrap text-zinc-700 text-wrap">{combinedMarkdown}</pre>
        }
        </div>
      </div>
    </div>
    // <div  className="basis-full bg-yellow-200"></div>
  );
};

export default Preview;
