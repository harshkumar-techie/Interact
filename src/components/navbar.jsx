import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";


const Navbar = () => {
  const navigate = useNavigate();
  const [dp_link, setDP_link] = useState("")

  function log_out() {
    localStorage.clear();
    navigate('login')
  }

  useEffect(() => {
    profile();
  }, [])

  async function profile() {
    const res = await fetch(`${import.meta.env.VITE_server_url}/home/profile_pic`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username: localStorage.getItem("username"), password: localStorage.getItem("password") })
    })
    const data = await res.json();
    setDP_link(data.dp_link);
  }

  return (
    <>
      <nav className="h-16 w-full fixed dark flex justify-between items-center px-4 box-border border-b-2 border-gray-500">
        <div>
          <h1 className="text-3xl text-purple-500 font-bold">Interact</h1>
        </div>
        <div>
          <ul className="flex gap-9">
            <Link to={"/profile"}>
              <img src={`${import.meta.env.VITE_server_url}/assets/dp/${dp_link}`} alt="DP" className="cursor-pointer h-12 w-12 object-fill rounded-full" />
            </Link>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
