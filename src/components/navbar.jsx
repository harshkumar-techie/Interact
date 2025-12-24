import { Link} from "react-router-dom";


const Navbar = () => {
  return (
    <>
      <nav className="h-16 w-full fixed dark flex justify-between items-center px-4 box-border border-b-2 border-gray-500">
        <div>
          <h1 className="text-3xl text-purple-500 font-bold">Intract</h1>
        </div>
        <div>
          <ul className="flex gap-9">
            <li><Link to={"/home"}>Home</Link></li>
            <li><Link to={"/login"}>Login</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
