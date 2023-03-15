import { message } from "antd";
import {Link} from "react-router-dom"
import React, { Component } from "react";
import userservice from "../services/userservice";
import {RiMovie2Fill} from "react-icons/ri";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      contact: "",
      password: "",
      confirmPassword: "",
    };
    this.register = this.register.bind(this);
  }

  firstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  lastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  userNameHandler = (event) => {
    this.setState({ userName: event.target.value });
  };

  contactHandler = (event) => {
    this.setState({ contact: event.target.value });
  };

  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  confirmPasswordHandler = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  register(event) {
    event.preventDefault();
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      contactNumber: this.state.contact,
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password
    };
    console.log(user);
    if (this.state.firstName === "") {
      message.error("First Name cannot be blank !");
    } else if (this.state.lastName === "") {
      message.error("Last Name cannot be blank !");
    } else if (this.state.contact.length !== 10) {
      message.error("Invalid Contact Number !");
    } else if (this.state.password !== this.state.confirmPassword) {
      message.error("Password and Confirm Password not same !");
    }
    else {
      userservice.register(user).then((res) => {
        console.log(res.data);
        if (res.ok) {
          localStorage.setItem("email", this.state.email);
          localStorage.setItem("userName", this.state.userName);
          this.props.history.push("/allMovies");
        } else message.error("Username or Email exist ! Please Login or Register with new details.");
      });
    }
  }

  render() {
    return (
      <div>
      <div className="overflow-auto w-full h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
          className="hidden sm:block absolute w-full h-full object-cover"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto pt-3">
            <div className="flex ml-10 items-center gap-1.5 cursor-pointer">
                {/* <RiMovie2Fill className="text-neutral-100 text-2xl text-purple-600"/> */}
                <Link to="/">
                    {/* <p className="text-neutral-100  text-2xl">Movieflix</p> */}
                    <img style={{height:'50px'}} src={process.env.PUBLIC_URL + '/Movie_Logo.jpeg'}></img>
                </Link>
                <h1 className="text-3xl font-bold">Sign Up</h1>
            </div>
              <form
                onSubmit={this.register}
                className="w-full flex flex-col py-4"
              >
		            <input
                  className="p-2 my-2 bg-gray-700 rouded"
                  type="text"
                  placeholder="First Name"
                  onChange={this.firstNameHandler}
                  required
                />

		            <input
                  className="p-2 my-2 bg-gray-700 rouded"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.lastNameHandler}
                  required
                />

                <input
                  className="p-2 my-2 bg-gray-700 rouded"
                  type="text"
                  placeholder="Username"
                  onChange={this.userNameHandler}
                  required
                />

		            <input
                  className="p-2 my-2 bg-gray-700 rouded"
                  type="text"
                  placeholder="Contact Number"
                  onChange={this.contactHandler}
                  required
                />

                <input
                  className="p-2 my-2 bg-gray-700 rouded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={this.emailHandler}
                  required
                />
                
                <input
                  className="p-2 my-2 bg-gray-700 rouded"
                  type="password"
                  placeholder="Password"
                  onChange={this.passwordHandler}
                  required
                  minLength="6"
                />
		
		            <input
                  className="p-2 my-2 bg-gray-700 rouded"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.confirmPasswordHandler}
                  required
                  minLength="6"
                />

                <button className="bg-cyan-600 py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default RegisterComponent;
