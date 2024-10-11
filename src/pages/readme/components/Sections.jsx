import { React,useState,useMemo,useEffect } from 'react';
import { useStore } from '../store';

const Sections = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputSection,setInputSection] = useState("");

  useEffect(() => {
    if (activeSections && activeSections.length > 0) {
        toggleSelectedSection(activeSections[0].slug);
    } else {
        toggleSelectedSection(''); // Handled case when no sections are available
    }
  }, []);

  const activeSections = useStore(
    (state) => state.ActiveSections
  );

  const inactiveSections = useStore(
    (state) => state.InactiveSections
  );

  const moveToActive = useStore(
    (state) => state.MovetoActive
  );

  const addNewSection = useStore(
    (state) => state.addNewSection
  );

  const handleAddSection = () => {
    setShowModal(false)
    addNewSection(inputSection, inputSection);
  };

  const toggleSelectedSection = useStore(
    (state) => state.toggleSelectedSelection
  );

  return (
    <>
      <div className="grid grid-cols-[15%_auto] sm:grid-cols-[8%_auto] xl:grid-rows-[20px_auto] xl:grid-cols-none">
        <div className="p-1 px-3 flex justify-between text-zinc-700 font-semibold">
          <div>Sections</div>
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-5 pt-1"
            >
              <path
                fillRule="evenodd"
                d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z"
                clipRule="evenodd"
              />
            </svg>
            <div>Reset</div>
          </div>
        </div>

        <div className="m-2 border rounded-md border-zinc-500 flex flex-col h-[630px] overflow-auto scrollbar-custom">
          <div className="relative flex flex-col bg-zinc-100 rounded-t-md">
            <p className="text-xs p-1 flex w-full items-center text-zinc-900 justify-center">
              Click on a section below to edit the contents
            </p>
            <nav className="flex flex-col gap-2 p-1.5">
              {activeSections.map((section, index) => (
                <div
                  key={index}
                  role="button"
                  onClick={()=>{toggleSelectedSection(section.slug)}}
                  className="text-slate-800 flex w-full items-center p-3 transition-all bg-white hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 rounded-md shadow"
                >
                  {section.name}
                </div>
              ))}
            </nav>
          </div>
          <div className="relative flex flex-col bg-zinc-100 rounded-b-md">
            <p className="text-xs p-1 flex w-full items-center text-zinc-900 justify-center">
              Click on a section below to add it to your readme
            </p>
            <div className='flex w-full items-center justify-center'>
              <div
                role="button"
                onClick={() => setShowModal(true)}
                className="text-slate-800 flex w-[96%] items-center font-bold justify-center p-3 transition-all bg-white hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 rounded-md shadow"
              >
                + Custom Section
              </div>
            </div>
            <nav className="flex flex-col gap-2 p-1.5">
              {inactiveSections.map((section, index) => (
                <div
                  key={index}
                  role="button"
                  onClick={()=>{
                    moveToActive(section.slug);
                    toggleSelectedSection(section.slug);
                  }}
                  className="text-slate-800 flex w-full items-center p-3 transition-all bg-white hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 rounded-md shadow"
                >
                  {section.name}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex flex-col gap-3 items-center justify-center">
                  <p className="text-zinc-800 font-semibold text-xl">New Custom Section</p>
                  <input type="text" id="first_name" 
                      onChange={(e) => setInputSection(e.target.value)}
                      className="w-[450px] bg-zinc-100 border border-zinc-800 text-zinc-800 text-md rounded-md p-2.5" placeholder="Section Title" autoComplete="off" required />
                  <div className="w-full flex gap-5">
                    <button
                      onClick={handleAddSection}
                      className="w-full p-1.5 bg-zinc-700 font-semibold text-zinc-100 rounded-md">Add Section</button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full p-1.5 bg-zinc-100 border border-zinc-700 text-zinc-700 font-semibold rounded-md">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Sections;