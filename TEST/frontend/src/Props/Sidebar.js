import { useAuth } from "../Auth/Auth"
import "../Style.css"
import { Link } from "react-router-dom"
import userpic from "./user.jpg"
function Sidebar(){
    const {user} = useAuth()

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <img src={userpic} className="img-fluid user-pic"/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 fs-3 text-center">{user.name}</div>
            </div>
            <div className="row">
                <div className="col-12 fs-3 text-center">{user.email}</div>
            </div>
            <div className="row mt-5">
                <nav className="nav flex-column">
                    <Link className="nav-link" to="/home/profile">Profile</Link>
                    <Link className="nav-link" to="/home/feed">Feed</Link>
                    <Link className="nav-link" to="/home/post">Post</Link>
                    <div className="nav-link" to="#">Logout</div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar