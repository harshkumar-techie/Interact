import '../stylesheets/login.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    useEffect(() => {
        document.title = "Login"
    }, [])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(0);

    const server_url = 'https://supreme-waffle-5gjx9v6vwjjqhqx-3000.app.github.dev';

    async function fetch_username() {
        const res = await fetch(`${server_url}/login/username`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "username": username })
        });
        const data = await res.json();
        if (data.exist === true) {
            setStep(step + 1)
        }

    }

    async function login() {
        const res = await fetch(`${server_url}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "username": username, "password": password })
        });
        const data = await res.json();
        if (data.auth) {
            localStorage.setItem("username", username)
            localStorage.setItem("password", password)
        } else {
            alert("Invalid Password!")
        }
    }

    function next() {
        if (step === 0) {
            if (username === "") {
                alert("Please enter username")
            } else {
                fetch_username();
            }
        }
        if (step === 1) {
            login();
        }
    }


    return (
        <main className='min-h-svh flex justify-center items-center bg-black text-white'>
            <div className='container flex py-20 flex-col md:max-w-[60vw] items-center justify-around mx-2 rounded-2xl h-[50vh] bg-neutral-950 border border-neutral-800'>
                <span className='text-4xl  mb-4'>Welcome!</span>
                <div className={"px-6 step-1 w-full flex flex-col"}>
                    <div className={(step === 0) ? '' : 'hidden'}>
                        <span className='text-2xl  '>Enter Username</span>
                        <input onChange={(e) => { setUsername(e.target.value) }} placeholder='Username' type="text" className={`w-full bg-neutral-900 placeholder:text-white rounded-2xl h-14 focus:outline-none placeholder: border border-neutral-800 box-border px-6 my-4`} />
                    </div>
                    <div className={(step === 1) ? '' : 'hidden'}>
                        <span className='text-2xl  '>Enter Password</span>
                        <input onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' type="password" className={`w-full bg-neutral-900 placeholder:text-white rounded-2xl h-14 focus:outline-none placeholder: border border-neutral-800 box-border px-6 my-4`} />
                    </div>
                    <div className='flex justify-center'>
                        <button id='signup' onClick={next} className=' w-36 border mt- h-10 rounded text-2xl font-bold cursor-pointer border-neutral-600 hover:bg-purple-600  hover: transition-all duration-300'>Next</button>
                    </div>
                </div>
                <Link to="/signup" className=' mt-4'>Don't have account? Signup</Link>
            </div>
        </main>
    )
}

export default Login;