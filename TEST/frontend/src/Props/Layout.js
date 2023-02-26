import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import PropertyList from"./Enlist"

function Layout(){
    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <div className="col-2 border-end border-secondary" style={{height: "98vh"}}>
                    <Sidebar/>
                </div>
                <div className="col-7">
                    <Outlet/>
                </div>
                <div className="col-2 border-start border-secondary">
                    <PropertyList/>
                </div>
            </div>

        </div>
    )
}

export default Layout