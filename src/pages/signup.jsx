import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [step, setStep] = useState(0);

    const navigate = useNavigate();

    async function signup() {
        const res = await fetch('https://interact-server.vercel.app/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": name, "phone": phone, "password": password, "username": username })
        });
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        navigate("/home")
    }

    function submit() {
        if (name.length >= 4 && phone.length == 10 && password.length >= 7 && username.length >= 7) {
            signup();
        } else {
            console.log(name);
            console.log(phone);
            console.log(password);
            console.log(username);

            alert("invalid details")
        }
    }

    function validation(e) {
        if (e.target.id == "name") {
            setName(e.target.value);
        }
        if (e.target.id == "phone") {
            setPhone(e.target.value);
        }
        if (e.target.id == "password") {
            setPassword(e.target.value);
        }
        if (e.target.id == "username") {
            setUsername(e.target.value);
        }
    }


    return (
        <main className='min-h-svh flex justify-center items-center bg-black text-white'>
            <div className='form md:w-[40vw] md:h-[50vh] md:rounded-3xl flex flex-col justify-center items-center bg-neutral-950 border border-neutral-800'>
                <span className='text-4xl  mb-4'>Welcome!</span>
                <div className={`step-1 w-full flex justify-between items-center px-8 ${step === 0 ? '' : 'hidden'}`}>
                    <span className='text-2xl  '>Enter Name</span>
                    <input id='name' onChange={validation} placeholder='Name' type="text" className={` bg-neutral-900 placeholder:text-white rounded-2xl px-4 focus:outline-none placeholder: border border-neutral-800 box-border my-4 w-[60%] h-9`} />
                </div>
                <div className={`step-1 w-full flex justify-between items-center px-8 ${step === 0 ? '' : 'hidden'}`}>
                    <span className='text-2xl  '>Enter Mobile No.</span>
                    <input id='phone' onChange={validation} max={10} placeholder='Mobile No.' type="number" className=' bg-neutral-900 placeholder:text-white rounded-2xl px-4 focus:outline-none placeholder: border border-neutral-800 box-border my-4 w-[60%] h-9' />
                </div>
                <div className={`step-1 w-full flex justify-between items-center px-8 ${step === 0 ? '' : 'hidden'}`}>
                    <span className='text-2xl  '>Enter Username</span>
                    <input id='username' onChange={validation} placeholder='Username' type="text" className='  bg-neutral-900 placeholder:text-white rounded-2xl px-4 focus:outline-none placeholder: border border-neutral-800 box-border my-4 w-[60%] h-9' />
                </div>
                <div className={`step-1 w-full flex justify-between items-center px-8 ${step === 0 ? '' : 'hidden'}`}>
                    <span className='text-2xl  '>Enter Password</span>
                    <input id='password' onChange={validation} placeholder='Password' type="password" className='  bg-neutral-900 placeholder:text-white rounded-2xl px-4 focus:outline-none placeholder: border border-neutral-800 box-border my-4 w-[60%] h-9' />
                </div>
                <button id='signup' onClick={submit} className=' my-4 w-[40%] border h-10 rounded-3xl text-2xl font-bold cursor-pointer border-neutral-600 hover:bg-purple-600  hover: transition-all duration-300'>SignUp</button>
                <Link to="/login" className=' mt-4'>Already have an account? Login</Link>
            </div>
        </main>
    )
}

export default SignUp;
