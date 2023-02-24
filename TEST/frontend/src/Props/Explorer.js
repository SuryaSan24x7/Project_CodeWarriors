// import { Outlet } from "react-router-dom"
import "./explorer.css"
import { Link ,useNavigate} from "react-router-dom"
import "./3.png"
function Explorer(){
    let navigate = useNavigate(); 
    const loginBtn = () =>{ 
      let path = `/login`; 
      navigate(path);
    }

    
    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
            <nav className="navbar">
        <div className="logo">
            <img src="3.png" className="logo-img" alt="logo" width="50" height="60"></img>
        </div>
        <div className="menu search">
            <div className="search-bar">
                <input type="text" className="search-input search-block"/>
                <button className="search-btn search-block"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
        <div className="menu">
            <span><button className="login" style={{'height' :'20px'}} onClick={loginBtn}>Login</button></span>
        </div>
        <div className="menu">
            <span className="text-light" ><Link to="/register">Register</Link></span>
        </div><div className="menu">
            <span className="text-bold" >More</span>
        </div>
        <div className="menu">
            <span className="cart-icon"><i className="fa-solid fa-cart-shopping"></i></span>
            <span className="text-bold">Cart</span>
        </div>
    </nav>
            </div>

        </div>
    )
}

export default Explorer