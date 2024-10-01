import React from 'react'

const Sections = () => {
  return (
    <div className="bg-neutral-400 grid grid-cols-[15%_auto] sm:grid-cols-[8%_auto] xl:grid-rows-[20px_auto] xl:grid-cols-none">
        <div className="p-1 px-3 grid grid-cols-1 xl:grid-cols-2">
            <div >Sections</div>
            <div>Reset</div>
        </div>
        <div className="bg-red-400 m-2"></div>
    </div>
  )
}

export default Sections