import { Link, Outlet , useNavigate } from "react-router-dom"

const Liout = () => {
    const navigate = useNavigate();

    const handleLogout =() =>{
        localStorage.removeItem('token');
        navigate('/auth')
    }
  return (
    <div>
      <nav>
        <Link to="/auth">Auth</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <hr/>
        <Outlet/>
    </div>
  )
}

export default Liout
