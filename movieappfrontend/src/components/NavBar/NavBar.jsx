import {RiMovie2Fill} from "react-icons/ri";
import React from "react";
import {Link,useHistory} from "react-router-dom"
import SearchResults from "../SearchResults/SearchResults";
import {useDetectClickOutside} from "react-detect-click-outside";
import { BsFillEmojiSmileFill } from "react-icons/bs";

export default function NavBar(){

    const [search, setSearch] = React.useState("");
    const [showSearch, setShowSearch] = React.useState(false);
    const ref = useDetectClickOutside({ onTriggered: toggleSearchOff });
    const history = useHistory();
    function handleSetSearch(event){
        setSearch(prevState => event.target.value);
    }

    function toggleSearchOn(){
        setShowSearch(true);
    }

    function toggleSearchOff(){
        setShowSearch(false);
    }

    function logOut()
    {
        localStorage.clear();
        history.push('/allMovies');
    }

    return(
        <div className="p-3 drop-shadow-xl flex bg-neutral-800 top-0 z-40 w-screen">
            <div className="flex ml-10 items-center gap-1.5 cursor-pointer">
                {/* <RiMovie2Fill className="text-neutral-100 text-2xl text-purple-600"/> */}
                <Link to="/">
                    {/* <p className="text-neutral-100  text-2xl">Movieflix</p> */}
                    <img style={{height:'50px'}} src={process.env.PUBLIC_URL + '/Movie_Logo.jpeg'}></img>
                </Link>
            </div>
            <form className="ml-10 relative flex w-1/2  ml-10" ref={ref}>
                <input
                    type="text" id="simple-search"
                    className="bg-neutral-800 border border-neutral-700 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSetSearch}
                    onMouseDown={toggleSearchOn}
                />
                { showSearch &&
                    <SearchResults search={search}/>
                }
            </form>
                {localStorage.getItem("userName") ? (
                <div className="flex items-center gap-1.5 cursor-pointer" style={{paddingLeft:'5rem'}}>
                <BsFillEmojiSmileFill className="text-neutral-100 text-2xl text-purple-600"/>
                <p className="text-[#FFFDE3] pr-4">{'Hi! '+localStorage.getItem("userName")}</p>
                <button
                    className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 "
                    onClick={logOut}
                >
                    Logout
                </button>
              </div>
            ) : (
                <div>
                <Link to="/login">
                    <button className="text-[#FFFDE3] pr-4" style={{paddingLeft:'5rem'}}>Sign In</button>
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