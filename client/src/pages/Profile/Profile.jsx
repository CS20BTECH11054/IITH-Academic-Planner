import Navbar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"
import React, { Component } from 'react'
import "./Profile.css"
import { withRouter } from "../../withRouter"

class Profile extends Component {

  constructor()
  {
    super()
    this.state={
      username:""
    }
  }

  handleChange(e)
  {
    this.setState({
      username: e.target.value
    })
  }

  handleClick()
  {
    localStorage.setItem("user",this.state.username)
    this.props.navigate("/")
  }

  render() {
    return (
    <div>
        <Navbar/>
        <Header pos="Profile"/>
        <div className="profilecontainer">
          <div className="profiletitle">Profile</div>
          <input className="inputtext" placeholder="Username" onChange={(e)=>this.handleChange(e)}></input>
          <input className="inputtext" placeholder="currentsemester"></input>
          <button className="submitbutton" onClick={()=>this.handleClick()}>Submit</button>
        </div>
    </div>
    )
  }
}

export default withRouter(Profile)