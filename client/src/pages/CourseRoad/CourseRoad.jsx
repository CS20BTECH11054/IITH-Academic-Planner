//import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"

import React, { Component } from 'react'
import axios from "axios"
import SemCredInfo from "../../components/CourseRoad/SemCredInfo/SemCredInfo"
import Course from "../../components/CourseRoad/Course/Course"
import DeptSelectWindow from "../../components/CourseRoad/DeptSelectWindow/DeptSelectWindow"
import CourseRoadOpts from "../../components/CourseRoad/CourseRoadOpts/CourseRoadOpts"
import CourseInfo from "../../components/CourseRoad/CourseInfo/CourseInfo"
import CourseRoadWindow from "../../components/CourseRoad/CourseRoadWindow/CourseRoadWindow"
import './CourseRoad.css'

export default class CourseRoad extends Component {

  constructor(){
    super()
    this.CourseRef = [React.createRef(), React.createRef(), React.createRef(), React.createRef(),
    React.createRef(), React.createRef(), React.createRef(), React.createRef()]
    this.state={
      SelectedDep : "",
      currentDep : "",
      SelectedSem: "",
      SelectedPlusSem: "",
      SelectedCourse: null,
      SelectedCourseAdd: null,
      SearchRes: [],
      DragprevSem: "",
      Input: "",
      SetLoading: true,
      Courses: [ [], [], [], [], [], [], [], [],]
    }
  }
  checkForPrereq(course)
  {
    for(var i=0; i<course.prerequisites.length; i++)
    {
      var check = false;
      for(var j=0; j<course.sem-1;j++)
      {
        const prereq = course.prerequisites[i]
        const newArray = this.state.Courses[j].filter(Course => Course.code === prereq)
        if(newArray.length !== 0)
        {
          check = true;
          break;
        }
      }
      if(check === false)
      {
        course.setMsg(`The prerequisite ${course.prerequisites[i]} is not satisfied \n`)
      }
    }
  }
  checkForTimetableClash(course)
  {
    const clashCourses = this.state.Courses[course.sem-1].filter(Course => (Course.slot === course.slot && Course !== course) )
    if(clashCourses.length !== 0)
    {
      for(var i=0; i<clashCourses.length;i++)
      {
        course.setMsg(`Timetable is clashing with ${clashCourses[i].code}`)
      }
    }
  }
  updateMsg()
  {
    for(var i = 0; i < this.state.Courses.length; i++)
    {
      for(var j=0; j< this.state.Courses[i].length; j++)
      {
        const c = this.state.Courses[i][j]
        c.msg = []
        this.checkForPrereq(this.state.Courses[i][j])
        this.checkForTimetableClash(this.state.Courses[i][j])
      }
    }
  }
  AddCourse(course)
  {
    const newArray = this.state.Courses[(course.sem-1)].concat(course)
    this.setState({
      Courses : [
        ...this.state.Courses.slice(0, course.sem-1),
        newArray,
        ...this.state.Courses.slice(course.sem)
      ]
    }, function(){
       this.updateMsg()
    })
  }

  handleDeptClick = () =>
  {
      this.setState({
        SetLoading: false
      })
      this.setState({
        SelectedDep : this.state.currentDep
      }, function(){
        var sem = 0
        const handleCourseRoad = async () => {
          try {
            const headers = {
              'Authorization': `${sessionStorage.getItem('token')}`
            };
            const res = await axios.get(`http://localhost:5000/api/user/courseRoad?dept=${this.state.SelectedDep}&sem=${sem}`,{headers});
            for(var i=0; i<res.data.length; i++)
            {
              const course = new Course(res.data[i].name, res.data[i].code, res.data[i].credits, res.data[i].dept, res.data[i].slot, res.data[i].prerequisites, res.data[i].sem)
              this.AddCourse(course)
            }
            sem = sem + 1;
            (sem === 8) ? this.setState({
              SetLoading: true
            }) : handleCourseRoad()
            
          } catch (error) {
            console.log(error)
            sem = sem + 1;
            (sem === 8) ? this.setState({
              SetLoading: true
            }) : handleCourseRoad()
            }
          }

          handleCourseRoad()
      })
  }

  handleDeptSelChange = (e) =>{
    const obj = e["name"]
    this.setState({
      currentDep : obj
    })
  }
  
  handleSemClick = (Sem)=>{
    (this.state.SelectedSem !== Sem) ?
    this.setState({
      SelectedSem : Sem
    }) : this.setState({SelectedSem : ""})
  }

  handlePlusClick = (Sem)=>{
    (this.state.SelectedPlusSem !== Sem) ?
    this.setState({
      SelectedPlusSem : Sem
    }) : this.setState({SelectedPlusSem : ""})
  }

  handleInputChange = (e) => {
    this.setState({
      Input: e.target.value
    })
  }

  handleCourseAddOk = () => {
    const Stringtonum = {
      "First" : 1,"Second" : 2,"Third" : 3,"Fourth" : 4,"Fifth" : 5,"Sixth" : 6,"Seventh" : 7,"Eighth" : 8
    }
    if(this.state.SelectedCourseAdd === null)
    {
      alert("Please search for course before adding it")
      return
    }
    var selcourse = this.state.SelectedCourseAdd
    var newcourse = new Course(selcourse.name, selcourse.code, selcourse.credits,selcourse.dept, selcourse.slot, selcourse.prerequisites, selcourse.sem)
    newcourse.sem = Stringtonum[this.state.SelectedPlusSem]
    this.AddCourse(newcourse)
    this.setState({
      Input: "",
      SelectedPlusSem: "",
      SelectedCourseAdd: null
    })
  }
  
  handleCourseClick = (course) =>{
    (this.state.SelectedCourse !== course)?
    this.setState({
      SelectedCourse: course
    }) : this.setState({
      SelectedCourse: null
    })
  }

  handleDragstart = (Sem) =>{
    this.setState({
      DragprevSem : Sem
    })
  }
  
  handleDragend = (e,data, course) =>{
    const Course_curr_y = e.clientY
    var currSem = 0
    for(var i=0; i<8; i++)
    {
      var top = this.CourseRef[i].current.getBoundingClientRect().top
      var height = this.CourseRef[i].current.getBoundingClientRect().height
      if(top < Course_curr_y && Course_curr_y < top + height)
      {
        currSem = i;
        break;
      }
    }
    const Stringtonum = {
      "First" : 1,"Second" : 2,"Third" : 3,"Fourth" : 4,"Fifth" : 5,"Sixth" : 6,"Seventh" : 7,"Eighth" : 8
    }
    const oldSem = Stringtonum[this.state.DragprevSem]-1
    if(oldSem === currSem)
    {
      return
    }
    const newCourse = new Course(course.name,course.code,course.credits,course.dept,course.slot,course.prerequisites, currSem+1)
    const oldArray = this.state.Courses[(course.sem-1)].filter(Course => Course !== course)
    this.setState({
      Courses : [
        ...this.state.Courses.slice(0, course.sem-1),
        oldArray,
        ...this.state.Courses.slice(course.sem)
      ]
    }, function(){
      this.AddCourse(newCourse)
    })
  }

  handleSearchClick = ()=>
  {
    const handleCourseSearch = async () => {
    try {
      const headers = {
        'Authorization': `${sessionStorage.getItem('token')}`
      };
      const res = await axios.get(`http://localhost:5000/api/user/courses/search?name=${this.state.Input}`,{headers});
      this.setState({
        SearchRes: res.data
      })
    } catch (error) {
      console.log(error)
      }
    }
    handleCourseSearch()
  }

  handleCourseAdding = (course)=>{
    (this.state.SelectedCourseAdd !== course) ? this.setState({
      SelectedCourseAdd: course
    }) : this.setState({
      SelectedCourseAdd: null
    })
  }

  handleDeleteClick = () =>
  {
    var course =  this.state.SelectedCourse
    const oldArray = this.state.Courses[(course.sem-1)].filter(Course => Course !== course)
    this.setState({
      Courses : [
        ...this.state.Courses.slice(0, course.sem-1),
        oldArray,
        ...this.state.Courses.slice(course.sem)
      ]
    }, function(){
      this.updateMsg()
      this.setState({
        SelectedCourse: null
      })
    })
  }
  render() {
    const Semesters = [
      "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth"
    ]
    return (
      <div>
        <Navbar/>
        <Header pos="CourseRoad"/>
        {this.state.SetLoading && (this.state.SelectedSem !== "") ? 
          <SemCredInfo Courses={this.state.Courses} SelectedSem={this.state.SelectedSem} />
           : null}
        {(this.state.SelectedDep === "") ? 
          <DeptSelectWindow SelectedDep={this.state.SelectedDep} handleDeptSelChange={this.handleDeptSelChange} handleDeptClick={this.handleDeptClick}/>
        : null}
        {this.state.SetLoading && (this.state.SelectedDep !== "") ? 
        <div className="CourseRoadWindow">
          {Semesters.map((sem,index) => 
            <div ref = {this.CourseRef[index]}><CourseRoadWindow Courses = {this.state.Courses} sem = {sem} index = {index} SelectedSem={this.state.SelectedSem} handleSemClick={this.handleSemClick} handlePlusClick={this.handlePlusClick} handleDragstart={this.handleDragstart} handleDragend={this.handleDragend} handleCourseClick={this.handleCourseClick} />
            </div>)}
        </div> : null}
        {this.state.SetLoading && (this.state.SelectedPlusSem !== "") ? 
        <CourseRoadOpts handleInputChange={this.handleInputChange} handleSearchClick={this.handleSearchClick} SearchRes={this.state.SearchRes} SelectedCourseAdd={this.state.SelectedCourseAdd} handleCourseAdding={this.handleCourseAdding} handleCourseAddOk={this.handleCourseAddOk}/>
         : null}
        {this.state.SetLoading && (this.state.SelectedCourse !== null) ? 
        <CourseInfo SelectedCourse={this.state.SelectedCourse} handleDeleteClick={this.handleDeleteClick}/>
         : null}
      </div>
    )
  }
}