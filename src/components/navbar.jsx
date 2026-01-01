import { useState, useEffect } from "react";


const Navbar = () => {

  return (
    <>
      <nav className="h-16 w-full fixed dark flex justify-between items-center px-4 box-border border-b-2 border-gray-500">
        <div>
          <h1 className="text-3xl text-purple-500 font-bold">Interact</h1>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
