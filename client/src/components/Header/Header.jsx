//import React from "react"
import {withRouter} from "../../withRouter"
import "./Header.css"
import React, { Component } from 'react'

class Header extends Component {
    constructor(){
        super()
        this.state = {
            active: ""
        }
    }
    handleClick(act)
    {
        this.setState({
           active: act
        })
        if(act === 'Home')
        {
            this.props.navigate('/', {state : {pos : "Home"}})
        }
        else
        {
            this.props.navigate('/'+act, {state : {pos : act}})   
        }
    }
    componentDidMount()
    {
        if(this.props.location.state)
        {
            this.setState({
                active: this.props.location.state.pos
            })
        }
    }
    
  render() {
    return (
      <div>
        <div className="header">
            <div className="headercontainer">
            <div className="Home">
                    <span className={`items ${(this.state.active === "Home") ? "active" : ""}`} onClick={() => this.handleClick("Home")}>Home</span>
                </div>
                <div className="Timetable">
                    <span className={`items ${(this.state.active === "Timetable") ? "active" : ""}`} onClick={() =>this.handleClick("Timetable")}>Timetable</span>
                </div>
                <div className="Courses">
                    <span className={`items ${(this.state.active === "Courses") ? "active" : ""}`} onClick={() =>this.handleClick("Courses")}>Courses</span>
                </div>
                <div className="CourseRoad">
                    <span className={`items ${(this.state.active === "CourseRoad") ? "active" : ""}`} onClick={() =>this.handleClick("CourseRoad")}>CourseRoad</span>
                </div>
                {(localStorage.getItem('user') !== "null") ? <div className="Profile">
                    <span className={`items ${(this.state.active === "Profile") ? "active" : ""}`} onClick={() =>this.handleClick("Profile")}>Profile</span>
                </div> : <div></div>}
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)

/*
<div className="Home">
                    <span className={`items ${(this.state.active === "Home") ? "active" : ""}`} onClick={this.handleClick("Home")}>Home</span>
                </div>
                <div className="Timetable">
                    <span className={`items ${(this.state.active === "Timetable") ? "active" : ""}`} onClick={this.handleClick("Timetable")}>Timetable</span>
                </div>
                <div className="Courses">
                    <span className={`items ${(this.state.active === "Courses") ? "active" : ""}`} onClick={this.handleClick("Courses")}>Courses</span>
                </div>
                <div className="CourseRoad">
                    <span className={`items ${(this.state.active === "CourseRoad") ? "active" : ""}`} onClick={this.handleClick("CourseRoad")}>CourseRoad</span>
                </div>
                <div className="Profile">
                    <span className={`items ${(this.state.active === "Profile") ? "active" : ""}`} onClick={this.handleClick("Profile")}>Profile</span>
                </div>
*/