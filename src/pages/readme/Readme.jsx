import React, { useState,useMemo } from 'react';
import Sections from './components/Sections';
import Preview from './components/Preview';
import Editor from './components/Editor';
import { saveAs } from 'file-saver';
import { useStore } from './store';

const Readme = () => {
  const activeSections = useStore(
    (state) => state.ActiveSections
  );

  const combinedMarkdown = useMemo(() => {
    return activeSections.map(section => section.markdown).join('\n');
  }, [activeSections]);

  const handleDownload = () => {
    const file = new Blob([combinedMarkdown], { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'Readme.md');
  };

  return (
    <div className="w-full h-screen grid grid-rows-[55px_30fr_0.5fr] bg-zinc-100">
      {/* Header */}
      <div className="col-span-2 bg-zinc-800 flex justify-between items-center">
        <div className="px-4 text-[30px] flex items-center h-full font-bold">Readme.md</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} role="button" stroke="currentColor" 
          className="size-9 border-2 p-1 mr-4 rounded-lg hover:bg-zinc-100 hover:text-zinc-800" onClick={()=>{handleDownload()}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="w-screen grid grid-cols-1 grid-rows-[10%_1fr] xl:grid-cols-[1fr_3.5fr] xl:grid-rows-none">
        <Sections />
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Editor />
          <Preview />
        </div>
      </div>

      {/* Footer */}
      <div className="col-span-2 bg-zinc-100 text-xs text-zinc-800">
        <div className="text-xs flex justify-center">Developed by Shreyansh Netam | View the Source Code on GitHub</div>
      </div>
    </div>
  );
};

export default Readme;