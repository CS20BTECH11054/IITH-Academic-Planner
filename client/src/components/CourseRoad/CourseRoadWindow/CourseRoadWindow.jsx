import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import Draggable from "react-draggable"

export class CourseRoadWindow extends Component {
  render() {
    const sem = this.props.sem
    const index = this.props.index
    return (
        <div className={`CourseRoadSemContainer ${(this.props.SelectedSem === sem) ? "active" : ""}`}>
        <div className="CourseRoadSemTitleContainer">
          <div onClick={()=>this.props.handleSemClick(sem)}>{sem} Semester</div>
          <FontAwesomeIcon onClick={()=>this.props.handlePlusClick(sem)} icon={faCirclePlus} style={{color: "#1290ff",}} />
        </div>
        <div className="CourseRoadSemCourseContainer">
          {this.props.Courses[index] && this.props.Courses[index].map(course => <Draggable onStart={()=>this.props.handleDragstart(sem)} onStop={(e, data)=>this.props.handleDragend(e, data, course)} bounds=".CourseRoadWindow" >{(course.msg.length !== 0) ? <div className="CourseRoadSemCourseItems active" onClick={()=>this.props.handleCourseClick(course)}> <FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#1e90ff",}} /> <div>{course.name}</div></div>: <div className="CourseRoadSemCourseItems" onClick={()=>this.props.handleCourseClick(course)}><div>{course.name}</div></div>}</Draggable>)}
        </div>
        </div>
    )
  }
}

export default CourseRoadWindow