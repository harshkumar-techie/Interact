
const Home = () => {
  const data = {}
  async function res() {
    const res = await fetch('http://localhost:3000/home', {
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


  return (
    <div className="pt-14 bg-black min-h-svh text-white">
      <div></div>
    </div>
  )
}

export default Home;
