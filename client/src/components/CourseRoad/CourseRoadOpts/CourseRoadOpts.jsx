import React, { Component } from 'react'
import Select from "react-select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

export class CourseRoadOpts extends Component {
  render() {
    const ElectiveTypeoptions = [
        { "name": "Core", "label":"Core"},
        { "name": "Departmental", "label":"Departmental"},
        { "name": "Free", "label":"Free"},
        { "name": "LA/CA", "label":"LA/CA"}
      ]
    return (
        <div className="CourseRoadOptsContainer">
        <div className="CourseRoadAddOptsContainer">
          <div className="CourseRoadOptsItems">Elective Type:</div>
          <Select options={ElectiveTypeoptions} placeholder="Select"/>
          <div className="CourseRoadOptsItems">
            <input onChange={(e)=>this.props.handleInputChange(e)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="CourseRoadSearch" onClick={this.props.handleSearchClick}/>
          </div>
          <table className="CourseRoadTable">
            <tr className="CourseRoadTableRow"><th className="CourseRoadTableItems">Course Code</th><th className="CourseRoadTableItems">Course Name</th></tr>
            {this.props.SearchRes && this.props.SearchRes.map(course => <tr className={`CourseRoadTableRow ${(this.props.SelectedCourseAdd === course)? "active" : ""}`} onClick={()=>this.props.handleCourseAdding(course)}><td className="CourseRoadTableItems">{course.code}</td><td className="CourseRoadTableItems">{course.name}</td></tr>)}
          </table>
          <div className="DeptSelectOkbtn" onClick={this.props.handleCourseAddOk}>Ok</div>
        </div>
      </div>
    )
  }
}

export default CourseRoadOpts