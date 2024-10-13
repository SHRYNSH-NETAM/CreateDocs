import { React,useState,useEffect } from 'react';
import { useStore } from '../store';

const Sections = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputSection,setInputSection] = useState("");

  const activeSections = useStore(
    (state) => state.ActiveSections
  );

  const inactiveSections = useStore(
    (state) => state.InactiveSections
  );

  const moveToActive = useStore(
    (state) => state.MovetoActive
  );

  const moveToInactive = useStore(
    (state) => state.MovetoInactive
  );

  const addNewSection = useStore(
    (state) => state.addNewSection
  );

  const handleAddSection = () => {
    if (!inputSection) {
      alert("Please Enter a valid name!!");
      return;
    }
    
    const sectionExists = activeSections.some((section) => section.name === inputSection) || 
                          inactiveSections.some((section) => section.name === inputSection);
    
    if (sectionExists) {
      alert("Section with same Name already exists. Please use a Different Name");
      return;
    }

    setShowModal(false);
    addNewSection(inputSection, inputSection);
};

  const SelectedSection = useStore(
    (state) => state.SelectedSection
  );

  const toggleSelectedSection = useStore(
    (state) => state.toggleSelectedSection
  );

  const resetSelectedSection = useStore(
    (state) => state.ResetSelectedSection
  );

  const resetStore = useStore((state) => state.resetStore);

  function handleReset() {
    if (confirm("All sections of your readme will be removed; to continue, click OK")) {
      resetStore();
      location.reload(true);
    }
  }

  function handleSectionReset(slug,name) {
    if (confirm("All Content of this Section will Reset; to continue, click OK")) {
      resetSelectedSection(slug,name);
    }
  }

  useEffect(() => {
    if (activeSections && activeSections.length > 0) {
        toggleSelectedSection(activeSections[activeSections.length-1].slug);
    } else {
        toggleSelectedSection('');
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-[15%_auto] sm:grid-cols-[8%_auto] xl:grid-rows-[20px_auto] xl:grid-cols-none">
        <div className="p-1 px-3 flex justify-between text-zinc-700 font-semibold">
          <div>Sections</div>
          <div className="flex justify-center" role="button" onClick={handleReset}>
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

        <div className="m-2 border rounded-md border-zinc-500 flex flex-col max-h-full overflow-auto scrollbar-custom">
          <div className="relative flex flex-col bg-zinc-100 rounded-t-md">
            <p className="text-xs p-1 flex w-full items-center text-zinc-900 justify-center">
              Click on a section below to edit the contents
            </p>
            <nav className="flex flex-col gap-2 p-1.5">
              {activeSections.map((section, index) => (
                <div
                  key={index}
                  role="button"
                  onClick={() => toggleSelectedSection(section.slug)}
                  className={`text-slate-800 flex w-full items-center justify-between p-3 transition-all bg-white hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 rounded-md shadow border-2
                    ${SelectedSection.slug === section.slug ? 'border-zinc-500' : ''}`}
                >
                  {section.name}
                  { SelectedSection.slug === section.slug
                    ?
                    <div className="flex gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5"
                        onClick={()=>{handleSectionReset(section.slug,section.name)}}>
                        <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clipRule="evenodd"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"
                        onClick={()=>{
                          moveToInactive(section.slug);
                          toggleSelectedSection('');
                          }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </div>
                    :
                    <></>}
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
                      onSubmit={handleAddSection}
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