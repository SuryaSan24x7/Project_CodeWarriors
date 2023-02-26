// import { Outlet } from "react-router-dom"
import "./explorer.css"
import { Link ,useNavigate} from "react-router-dom"
import logo from "./3.png"
import PropertyList from "./Enlist"; 
// import Web3 from 'ethereum/web3';
function Explorer(){
    let navigate = useNavigate(); 
    const loginBtn = () =>{ 
      let path = `/login`; 
      navigate(path);
    }
    const regBtn = () =>{ 
        let path = `/register`; 
        navigate(path);
      }
      async function connect() {
    //     if (window.ethereum) {
    //        await window.ethereum.request({ method: "eth_requestAccounts" });
    //        window.web3 = new Web3(window.ethereum);
    //        const account = web3.eth.accounts;
    //        //Get the current MetaMask selected/active wallet
    //        const walletAddress = account.givenProvider.selectedAddress;
    //        console.log(`Wallet: ${walletAddress}`);
    //     } else {
    //      console.log("No wallet");
    //     }
}

    
    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
            <nav className="navbar">
        <div className="logo">
            <img src={logo} className="logo-img" alt="logo" width="50" height="60"></img>
        </div>
        <div className="menu search">
            <div className="search-bar">
                <input type="text" className="search-input search-block"/>
                <button className="search-btn search-block"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
        <div className="menu">
            <span><button className="login" onClick={loginBtn}>Login</button></span>
        </div>
        <div className="menu">
            <span><button className="regBtn" onClick={regBtn}>Register</button></span>
        </div><div className="menu">
            <span className="text-bold" >More</span>
        </div>
        <div className="menu">
       <span> <input type="button" value="Connect Wallet" onclick={connect()}/></span>
        </div>
    </nav>
     </div>
<div>
        <div className="col-2 border-start border-secondary">
                    <PropertyList/>
                </div>
</div>
        </div>
    )
}

export default Explorer