import "./Navbar.css"
import {withRouter} from "../../withRouter"
import React, { Component } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import axios from "axios"

class Navbar extends Component {

  constructor()
  {
    super()
    this.state={
      button : ((sessionStorage.getItem('token')!==null)?<div>Logged In</div>:<GoogleOAuthProvider clientId="933155331955-95a3jte5q214fvbkt260cl9gehv13bd1.apps.googleusercontent.com">
      <GoogleLogin onSuccess={credentialResponse => {this.handleLogin(credentialResponse)}}onError={() => {console.log('Login Failed');}}/>
      </GoogleOAuthProvider>)
    }
  }
  
  handleClick()
  {
    this.props.navigate('/Login')
  }

  handleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/google-login`, credentialResponse);
      console.log(res.data); 
  
      // Store the token in local storage
      sessionStorage.setItem('token', res.data);

      console.log(sessionStorage.getItem('token'))
      if(sessionStorage.getItem('token') !== null)
      {
        this.setState({
          button: <div>Logged In</div>
        })
      }
          
    } catch (error) {
      console.error(error);
      }
    }

  render() {
    return (
      <div>
        <div className="navbar">
            <div className="navbarcontainer">
                <div className="navtitle">
                    <span className="title">Academic Planner</span>
                </div>
                {this.state.button}
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar)