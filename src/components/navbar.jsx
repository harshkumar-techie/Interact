import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  function log_out() {
    localStorage.clear();
    navigate('login')
  }

  return (
    <>
      <nav className="h-16 w-full fixed dark flex justify-between items-center px-4 box-border border-b-2 border-gray-500">
        <div>
          <h1 className="text-3xl text-purple-500 font-bold">Interact</h1>
        </div>
        <div>
          <ul className="flex gap-9">
            <li className={`px-4 py-1 border rounded-2xl cursor-pointer ${(localStorage.getItem("username") ? '' : 'hidden')}`} onClick={log_out}>Log Out</li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
