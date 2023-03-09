import Register from "./Props/Register"
import Login from "./Props/Login";
import Home from "./Props/Home";
import "./Style.css"
import {createBrowserRouter, Navigate, RouterProvider ,useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import {AuthContext} from "./Auth/AuthContext"
import {login,logout} from "./Auth/Auth"
import Profile from "./Props/Profile";
import Feed from "./Props/Feed";
import Post from "./Props/Post";
import Explorer from "./Props/Explorer";
import WritePost from "./Props/WritePost";
import Cart from "./Props/Cart";


const router = createBrowserRouter([
  {path: "/", element: <Explorer/>},               //default path component
  {
    path: "/home", 
    element: <Home/>, 
    children: [
      {path: "profile", element: <Profile/>}, 
      {path: "feed", element: <Feed/>},
      {path:"post",element:<Post/>},
      {path:"writepost",element:<WritePost/>}
    ]
  },
  {path: "/register", element: <Register/>},
  {path:"/login",element:<Login/>},
  {path:"/cart",element:<Cart/>}
])

function App(){
  const [user, setUser] = useState(null)

  return (
    <>
      <AuthContext.Provider value={{user, setUser, login, logout}}>
        <RouterProvider router={router}/>
      </AuthContext.Provider>
    </>
  )
}

export default App;
