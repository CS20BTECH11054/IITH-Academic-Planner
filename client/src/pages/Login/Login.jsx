import Navbar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"

import React, { Component } from 'react'
import "./Login.css"
import { withRouter } from "../../withRouter"
import axios from "axios"

class Login extends Component {
  constructor(){
    super()
    this.state = {
      username:"",
      password:""
    }

  }
  handleusernameChange(e)
  {
    this.setState({
        username : e.target.value
      })
  }
  handlepwdChange(e)
  {
    this.setState({
        password : e.target.value
      })
  }
  loginsucceeded()
  {
    this.props.navigate('/', {state : {pos : "Home"}})
    localStorage.setItem('user', this.state.username)
  }
  handleClick()
  {
    axios.get(`http://localhost:5000/api/user/password?username=${this.state.username}`)
      .then(response => {
        (response.data === this.state.password)? this.loginsucceeded() : alert("Wrong Password")
      })
    
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Header pos="Login"/>
       <div>
       <div className="Logincontainer">
          <div className="Logintitle">Login</div>
          <input className="Logininputtext" placeholder="Username" onChange={(e)=>this.handleusernameChange(e)}></input>
          <input className="Logininputtext" type="password" placeholder="password" onChange={(e)=>this.handlepwdChange(e)}></input>
          <button className="Loginsubmitbutton" onClick={()=>this.handleClick()}>Submit</button>
        </div>
       </div>
      </div>
    )
  }
}

export default withRouter(Login)