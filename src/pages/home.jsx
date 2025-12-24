import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('username') === null) {
      navigate('/login');
    };
    document.title = "Home";
  }, [])

  return (


    <div className='pt-16 bg-black min-h-svh text-white'>Home</div>
  )
}

export default Home