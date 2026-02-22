import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();
    const [uname, setUname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(0);

    useEffect(() => {
        document.title = "SignUp"
    }, [])

    async function signup() {
        try {
            const res = await fetch(`${import.meta.env.VITE_server_url}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "name": uname, "username": username, "password": password, chats: [] })
            });
            const data = await res.json();
            if (res.status === 200) {
                alert(data.message || "Username already exists")
            }
            if (res.status === 201) {
                alert("Account created! Please login.");
                navigate('/login');
            }
            if (res.status >= 400) {
                alert(data.message || "Something went wrong");
            }
        } catch (err) {
            alert("Network error. Please try again.");
        }
    }

    async function fetch_username() {
        try {
            const res = await fetch(`${import.meta.env.VITE_server_url}/signup/username`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ "username": username })
            });
            if (res.status === 200) {
                alert("username already taken");
            } else {
                setStep(step + 1)
            }
        } catch (err) {
            alert("Network error. Please try again.");
        }
    }


    function next() {
        if (step === 0) {
            if (uname === "") {
                alert("Please enter your name")
            } else {
                setStep(step + 1);
            }
        }
        if (step === 1) {
            if (username === "") {
                alert("Please enter a username")
            } else {
                fetch_username();
            }
        }
        if (step === 2) {
            if (password.length < 8) {
                alert("Password must be at least 8 characters")
            } else {
                signup();
            }
        }
    }



    return (
        <main className='min-h-svh flex justify-center items-center bg-black text-white'>
            <div className='container flex py-20 flex-col md:max-w-[60vw] items-center justify-around mx-2 rounded-2xl h-[50vh] bg-neutral-950 border border-neutral-800'>
                <span className='text-4xl  mb-4'>Welcome!</span>
                <div className={"px-6 step-1 w-full flex flex-col"}>
                    <div className={(step === 0) ? '' : 'hidden'}>
                        <span className='text-2xl  '>Enter Name</span>
                        <input onKeyDown={(e) => { e.key === "Enter" ? next() : '' }} onChange={(e) => { setUname(e.target.value) }} placeholder='Name' type="text" className={`w-full bg-neutral-900 placeholder:text-white rounded-2xl h-14 focus:outline-none placeholder: border border-neutral-800 box-border px-6 my-4`} />
                    </div>
                    <div className={(step === 1) ? '' : 'hidden'}>
                        <span className='text-2xl  '>Create Username</span>
                        <input onKeyDown={(e) => { e.key === "Enter" ? next() : '' }} onChange={(e) => { setUsername(e.target.value) }} placeholder='Username' type="text" className={`w-full bg-neutral-900 placeholder:text-white rounded-2xl h-14 focus:outline-none placeholder: border border-neutral-800 box-border px-6 my-4`} />
                    </div>
                    <div className={(step === 2) ? '' : 'hidden'}>
                        <span className='text-2xl  '>Create Password</span>
                        <input onKeyDown={(e) => { e.key === "Enter" ? next() : '' }} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' type="password" className={`w-full bg-neutral-900 placeholder:text-white rounded-2xl h-14 focus:outline-none placeholder: border border-neutral-800 box-border px-6 my-4`} />
                    </div>
                    <div className='flex justify-center'>
                        <button id='signup' onClick={next} className=' w-36 border mt- h-10 rounded text-2xl font-bold cursor-pointer border-neutral-600 hover:bg-purple-600  hover: transition-all duration-300'>Next</button>
                    </div>
                </div>
                <Link to="/login" className=' mt-4'>Already have an account? Login</Link>
            </div>
        </main>
    )
}

export default SignUp;
