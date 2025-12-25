import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import search from '../image/icons/search.svg';
import send from '../image/icons/send.svg';


const Home = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [search_user, setSearch_user] = useState();
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('username') === null) {
      navigate('/login');
    };
    document.title = "Home";
    fetch_chats();
  }, [])

  async function fetch_chats() {
    const res = await fetch(`${import.meta.env.VITE_server_url}/home/chats_fetch`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username: localStorage.getItem("username"), password: localStorage.getItem("password") })
    })
    const chats = await res.json();
    setChats(chats);
  }

  async function add_chat() {
    const res = await fetch(`${import.meta.env.VITE_server_url}/home/addUser`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username: localStorage.getItem("username"), password: localStorage.getItem("password"), searchUser: search_user })
    })
    const data = await res.json();
    if (data.status === true) {
      fetch_chats();
    } else {
      alert(data.message)
    }
  }

  return (
    <div className='pt-16 bg-black h-svh text-white flex'>
      <div className="bg-black border-r-2 border-neutral-700 w-[22vw]">
        <div className="h-16 flex items-center box-border border-b border-neutral-700">
          <div className=" h-10 rounded-3xl w-full bg-neutral-900 border border-neutral-800 mx-4 px-3 flex items-center justify-between">
            <input onChange={(e) => { setSearch_user(e.target.value) }} type="text" className="w-[86%] my-2 focus:outline-none" placeholder="Search..." />
            <img src={search} onClick={add_chat} alt="search" className="h-7 cursor-pointer" />
          </div>
        </div>

        {chats.map(user => {
          return (
            <div key={user.id} onClick={() => { setChat(user) }} className="h-16 bg-neutral-900 border-b cursor-pointer px-4 border-neutral-700 flex items-center">
              <img src={`${import.meta.env.VITE_server_url}${user.dp}`} alt="dp" className="h-12 w-12 mr-4 object-fill rounded-full" />
              <div className="flex flex-col">
                <div className="font-bold">{user.name}</div>
                <div className="font-light">{user.status}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="bg-black w-[78vw] h-[svh-16]">
        <div className="h-16 box-border border-b px-4 border-neutral-700 flex items-center">
          <img src={`${import.meta.env.VITE_server_url}${chat.dp}`} alt="dp" className="h-12 w-12 object-fill mr-4 rounded-full" />
          <div className="text-2xl  font-bold">{chat.name}</div>

        </div>
        <div className="h-16 absolute w-[78vw] right-0 bottom-0 bg-neutral-900 border-t border-neutral-600 flex items-center">
          <div className="bg-neutral-950 px-4 border-neutral-700 border w-full h-11 rounded-4xl mx-4 flex items-center">
            <input type="text" className="focus:outline-none grow" placeholder="Enter message..." />
            <img src={send} alt="send" className="h-8 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;