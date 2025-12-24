import '../stylesheets/login.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    useEffect(() => {
        document.title = "Intract | Login"
    }, [])


    const [U, setUserid] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        console.log(U);
        console.log(password);
    }

    return (
        <main className='min-h-svh flex justify-center items-center bg-black'>
            <div className='form md:w-[40vw] md:h-[50vh] md:rounded-3xl flex flex-col justify-center items-center bg-neutral-950 border border-neutral-800'>
                <span className='text-4xl text-white mb-4'>Welcome back!</span>
                <input id='U' onChange={(e) => { setUserid(e.target.value) }} placeholder='Enter Username' type="text" className='text-white bg-neutral-900 rounded-2xl px-4 focus:outline-none placeholder:text-white border border-neutral-800 box-border my-4 w-[60%] h-9' />
                <input id='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password' type="password" className='text-white bg-neutral-900 rounded-2xl px-4 focus:outline-none placeholder:text-white border border-neutral-800 box-border my-4 w-[60%] h-9' />
                <button id='login' onClick={login} className='text-white my-4 w-[40%] border h-10 rounded-3xl text-2xl font-bold cursor-pointer border-neutral-600 hover:bg-purple-600  hover:text-white transition-all duration-300'>Login</button>
                <Link to="/signup" className='text-white mt-4'>Don't have an account? Create Account</Link>
            </div>
        </main>
    )
}

export default Login;