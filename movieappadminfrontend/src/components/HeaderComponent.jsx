import {RiMovie2Fill} from "react-icons/ri";
import React from "react";
import {Link,useHistory} from "react-router-dom"
import { BsFillEmojiSmileFill } from "react-icons/bs";

export default function HeaderComponent(){

  const history = useHistory()

  function logOut()
  {
      localStorage.clear();
      history.push('/');
  }
    return(
        <div className="p-3 drop-shadow-xl flex bg-neutral-800 top-0 z-40 w-screen">
            <div className="flex ml-10 items-center gap-1.5 cursor-pointer">
                {/* <RiMovie2Fill className="text-neutral-100 text-2xl text-purple-600"/> */}
                {/* <p className="text-neutral-100  text-2xl">Movieflix</p>       */}
                <img style={{height:'50px'}} src={process.env.PUBLIC_URL + '/Movie_Logo.jpeg'}></img>  

            </div>
            {localStorage.getItem("firstName") ? (
                <div className="flex items-center gap-1.5 cursor-pointer" style={{paddingLeft:'45rem'}}>
                  <BsFillEmojiSmileFill className="text-neutral-100 text-2xl text-purple-600"/>
                  <p className="text-[#FFFDE3] pr-4">{'Hi! '+localStorage.getItem("firstName")}</p>
                  <button
                      className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 "
                      onClick={logOut}
                  >
                      Logout
                  </button>
                </div>
            ) : (
                <div className="flex flex-row items-center">
                <Link to="/login">
                    <button className="text-[#FFFDE3] pr-4" style={{paddingLeft:'49rem'}}>Sign In</button>
                </Link>
                <Link to="/register">
                    <button className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 ">
                    Sign Up
                    </button>
                </Link>
                </div>
            )}
        </div>
    );
}