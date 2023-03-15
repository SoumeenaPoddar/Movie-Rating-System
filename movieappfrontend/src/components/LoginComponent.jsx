import React, { Component } from "react";
import {Link} from "react-router-dom";
import userservice from "../services/userservice";
import { message } from "antd";
import {RiMovie2Fill} from "react-icons/ri";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push("/register");
  }

  async login(event) {
    event.preventDefault();
    let user = { email: this.state.email, password: this.state.password };
    console.log(user);
    await userservice.login(user).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        console.log(data['userName']);
        localStorage.setItem("userName", data['userName']);
        localStorage.setItem("email",user['email'])
        this.props.history.push("/allMovies");
      } else message.error("invalid username or password ! Please Retry.");
    });
  }

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  

  render() {
    
    return (
      <div>
      <div className="w-full h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
          className="hidden sm:block absolute w-full h-full object-cover"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
            <div className="flex ml-10 items-center gap-1.5 cursor-pointer">
                {/* <RiMovie2Fill className="text-neutral-100 text-2xl text-purple-600"/> */}
                <Link to="/">
                    {/* <p className="text-neutral-100  text-2xl">Movieflix</p> */}
                    <img style={{height:'50px'}} src={process.env.PUBLIC_URL + '/Movie_Logo.jpeg'}></img>
                </Link>
                <h1 className="text-3xl font-bold">Sign In</h1>
            </div>
              <form onSubmit={this.login} className="w-full flex flex-col py-4">
                <input
                  onChange={this.emailHandler}
                  className="p-3 my-2 bg-gray-700 rouded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                />
                <input
                  onChange={this.passwordHandler}
                  className="p-3 my-2 bg-gray-700 rouded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  minLength="3"
                />
                <button className="bg-cyan-600 py-3 my-6 rounded font-bold">
                  Sign In
                </button>
                <p className="py-8">
                  <span className="text-gray-600">New to APS?</span>{" "}
                  <Link to="/register">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
  }
}

export default LoginComponent;
