import Navbar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"
import React, { Component } from 'react'
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import Tasks from "./Tasks";
import "./Home.css"
import Daily from "./Daily";
import Weekly from "./Weekly";
import moment from "moment/moment";
import axios from "axios";

export default class Home extends Component {
  constructor()
  {
    super()
    this.state = {
      date : moment().format("MM/DD/YYYY"),
      task_name: "",
      task_date:"",
      all_tasks:{}
    }
  }
  handleCalendar=(e,value)=>{
    //console.log(moment(e).format("MM/DD/YYYY"))
     this.setState({
      date: moment(e).format("MM/DD/YYYY")
    })
    //console.log(this.state.date.)
  }
  handleChange(e,str)
  {
    (str === "task") ?
    this.setState({
      task_name: e.target.value
    }) : this.setState({
      task_date: e.target.value
    })
  }
  handleClick()
  {
    const handleTaskAdd = async () => {
      try {
        const headers = {
          'Authorization': `${sessionStorage.getItem('token')}`
        };
        const res = await axios.post(`http://localhost:5000/api/user/addTask`,{"task": this.state.task_name, "date":this.state.task_date},{headers});
        console.log(res)
        alert('The task has been added successfully')
      } catch (error) {
        console.log(error)
        }
      }
      handleTaskAdd()
  }

  componentDidMount()
  {
    const handleGetTasks = async () => {
      try {
        const headers = {
          'Authorization': `${sessionStorage.getItem('token')}`
        };
        const res = await axios.get(`http://localhost:5000/api/user/getAllTasks`,{headers});
        this.setState({
          all_tasks: res.data
        })
        console.log(res.data)
      } catch (error) {
        console.log(error)
        }
      }
      handleGetTasks()
  }

  render() {
    return (
    <div>
        <Navbar/>
        <Header/>
        <div className="Tasks">
          <Calendar onChange={this.handleCalendar} value={this.state.date} tileClassName={
            ({ date, view }) => {
              if(this.state.all_tasks[moment(date).format("MM/DD/YYYY")]){
               return  'highlight'
              }
            }
          }/>
          <Tasks date={this.state.date} all_tasks={this.state.all_tasks}/>
          <div className="AddTask">
            <div className="AddTaskItemsHead">Add Task</div>
            <input className="AddTaskItems" placeholder="Enter Task name" value={this.state.task_name} onChange={(e)=>this.handleChange(e,"task")}/>
            <input className="AddTaskItems" placeholder="Enter in MM/DD/YYYY format" type="text" pattern="\d{2}/\d{2}/\d{4}" value={this.state.task_date} onChange={(e)=>this.handleChange(e,"date")} />
            <div className="TaskOkbtn" onClick={()=>this.handleClick()}>Ok</div>
          </div>
        </div>
        <div className="Daily">
          <span className="DailyTitle"> Daily Tasks </span>
          <Daily tasks={this.state.all_tasks[moment().format("MM/DD/YYYY")]}/>
        </div>
        <div className="Daily">
          <span className="WeeklyTitle"> Weekly Tasks </span>
          <Weekly all_tasks={this.state.all_tasks} start={moment().startOf('week').format("MM/DD/YYYY")}/>
        </div>
    </div>
    )
  }
}