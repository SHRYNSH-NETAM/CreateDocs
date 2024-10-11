import React, { useState } from 'react';
import Sections from './components/Sections';
import Preview from './components/Preview';
import Editor from './components/Editor';

const Readme = () => {
  return (
    <div className="w-full h-screen grid grid-rows-[55px_30fr_0.5fr] bg-zinc-100">
      {/* Header */}
      <div className="col-span-2 bg-zinc-800">
        <div className="px-4 text-[30px] flex items-center h-full font-semibold">Readme.md</div>
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