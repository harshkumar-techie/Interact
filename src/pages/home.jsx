import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import search from '../image/icons/search.svg';
import send from '../image/icons/send.svg';
import more from '../image/icons/more.svg';
import back_arrow from '../image/icons/arrow_back.svg';


const Home = () => {
  const [search_user, setSearch_user] = useState(""); //search user input
  const [message, setMessage] = useState(""); //message input
  const [chat_info, setChat_info] = useState(null);//chat header
  const [chat_data, setChat_data] = useState(null);//full sync data
  const [my_user, setMy_user] = useState("null");//current user
  const navigate = useNavigate()
  const syncTimerRef = useRef(null);
  const isMountedRef = useRef(true);


  useEffect(() => {
    document.title = "Home";
    isMountedRef.current = true;
    status()
    sync_chats();

    return () => {
      // Cleanup: stop polling when component unmounts
      isMountedRef.current = false;
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
        syncTimerRef.current = null;
      }
    };
  }, []);


  async function status() {
    try {
      const req = await fetch(`${import.meta.env.VITE_server_url}/home/status`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include"
      })
      const res = await req.json();
      if (!res.auth) {
        navigate('/login')
      } else {
        setMy_user(res.username);
      }
    } catch (err) {
      console.error("Status check failed:", err);
      navigate('/login');
    }
  }

  async function sync_chats() {
    try {
      const req = await fetch(`${import.meta.env.VITE_server_url}/home/sync_chats`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include"
      })
      const res = await req.json();
      if (isMountedRef.current) {
        setChat_data(res);
      }
    } catch (err) {
      console.error("Sync chats failed:", err);
    }
    // Only schedule next poll if still mounted
    if (isMountedRef.current) {
      syncTimerRef.current = setTimeout(() => {
        sync_chats()
      }, 1000);
    }
  }

  async function add_chat() {
    try {
      const res = await fetch(`${import.meta.env.VITE_server_url}/home/add_user`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ searchUser: search_user })
      })
      const data = await res.json();
      if (data.status === true) {
        setSearch_user("");
      } else {
        alert(data.message)
        setSearch_user("")
      }
    } catch (err) {
      alert("Failed to add user. Please try again.");
    }
  }

  async function send_msg() {
    try {
      const res = await fetch(`${import.meta.env.VITE_server_url}/home/msg`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ msg_to: chat_info.username, msg: message })
      })
      const data = await res.json();
      if (data.sent === true) {
        setMessage("");
      } else {
        alert("msg not sent");
      }
    } catch (err) {
      alert("Failed to send message. Please try again.");
    }
  }

  return (
    <div className='pt-16 bg-black h-svh text-white flex'>
      <div className={`bg-black border-r-2 ${!chat_info ? "block" : "hidden"} md:block border-neutral-700 w-full md:w-[22vw]`}> {/* chats user list */}
        <div className="h-16 flex items-center box-border px-2 border-b border-neutral-700">
          <div className=" h-10 rounded-3xl w-full bg-neutral-900 border border-neutral-800 px-3 flex items-center justify-between">
            <input onKeyDown={(key) => { key.key === "Enter" ? search_user === "" ? '' : add_chat() : '' }} onChange={(e) => { setSearch_user(e.target.value) }} value={search_user} type="text" className="w-[86%] my-2 focus:outline-none" placeholder="Search..." />
            <img src={search} onClick={add_chat} alt="search" className="h-6 cursor-pointer" />
          </div>
          <button><img src={more} alt="more" className="h-10 cursor-pointer" /></button>
        </div>

        {chat_data?.chats_list?.map(user => {
          return (
            <div key={user.username} onClick={() => setChat_info(user)} className="h-16  cursor-pointer mx-2 rounded-2xl px-3 transition-all duration-150 my-2  hover:bg-neutral-900 flex items-center">
              <img src={`${import.meta.env.VITE_server_url}/assets/dp/${user.dp}`} alt="dp" className={`h-12 w-12 mr-4 object-fill ${user.dp ? '' : "hidden"} rounded-full`} />
              <div className={`h-12 w-12 mr-4 bg-neutral-900 text-2xl font-bold flex justify-center border border-neutral-700 items-center ${!user.dp ? '' : "hidden"} rounded-full`}>{user.name[0]}</div>
              <div className="flex flex-col">
                <div className="font-bold">{user.name}</div>
                <div className="font-light">{user.username}</div>
              </div>
            </div>
          )
        })}
      </div>


      <div className={`bg-black text-white hidden md:${!chat_info ? "block" : "hidden"} md:w-[78vw] h-[svh-16] flex-col justify-center items-center`}>
        <div className="text-4xl my-5">Welcome! to Interact</div>
        <div className="text-3xl">Please click on a chat to Interact</div>
      </div>

      <div className={`bg-black ${!chat_info ? "hidden" : "block"} w-full md:w-[78vw] h-[svh-16] flex`} >
        <div className="h-16 fixed top-16 right-0 w-svw md:w-[78vw] box-border border-b px-4 border-neutral-700 flex items-center">
          <img src={back_arrow} alt="back_arrow" className={`md:hidden`} onClick={() => setChat_info(null)} />
          <img src={`${import.meta.env.VITE_server_url}/assets/dp/${chat_info?.dp}`} alt="dp" className={`h-12 w-12 mr-4 object-fill ${chat_info?.dp ? '' : "hidden"} rounded-full`} />
          <div className={`h-12 w-12 mr-4 bg-neutral-900 text-2xl font-bold flex justify-center border border-neutral-700 items-center ${!chat_info?.dp ? '' : "hidden"} rounded-full`}>{chat_info?.name?.[0]}</div>
          <div className="text-2xl  font-bold">{chat_info?.name}</div>
        </div>
        <div className="my-16 w-full flex flex-col-reverse overflow-y-scroll transition-all duration-300 scroll-hidden px-4">
          <div>
            {(chat_info ? chat_data?.chats_data?.find(obj => chat_info.username in obj)?.[chat_info?.username] || [] : []).map(c => {
              return (
                <div key={c.id} className={`flex ${(my_user === c.by) ? 'flex-row-reverse' : ''}`}>
                  <div className={`border border-neutral-800 max-w-[80%] overflow-hidden bg-neutral-900 min-h-10 my-1.5 content-center rounded-3xl px-5`}>
                    {c.msg}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="h-16 absolute w-svw md:w-[78vw] right-0 bottom-0 bg-neutral-900 border-t border-neutral-600 flex items-center">
          <div className="bg-neutral-950 px-4 border-neutral-700 border w-full h-11 rounded-4xl mx-4 flex items-center">
            <input onKeyDown={(key) => { key.key === "Enter" && message ? send_msg() : '' }} id="message" onChange={(e) => { setMessage(e.target.value) }} value={message} type="text" className="focus:outline-none grow" placeholder="Enter message..." />
            <img src={send} onClick={send_msg} alt="send" className="h-8 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;