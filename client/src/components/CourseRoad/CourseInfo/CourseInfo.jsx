import React, { Component } from 'react'

export class CourseInfo extends Component {
  render() {
    return (
        <div className="CourseInfoContainer">
        <div className="CourseInfoTitleContainer">
          <div className="CourseInfoTitle">Course Info:</div>
          <div className="CourseInfoDelete" onClick={this.props.handleDeleteClick}>Delete</div>
        </div>
        <div className="CourseInfoItemsContainer"><div className="CourseInfoItems1">Name :</div><div>{this.props.SelectedCourse.name}</div></div>
        <div className="CourseInfoItemsContainer"><div className="CourseInfoItems1">Course Code:</div><div>{this.props.SelectedCourse.code}</div></div>
        <div className="CourseInfoItemsContainer"><div className="CourseInfoItems1">Timetable Slot:</div><div>{this.props.SelectedCourse.slot}</div></div>
        <div className="CourseInfoItemsContainer"><div className="CourseInfoItems1">Instructor:</div><div>Virat Kohli</div></div>
        <div className="CourseInfoItemsContainer"><div className="CourseInfoItems1">Description:</div><div>This is about scalable algorithms</div></div>
        {(this.props.SelectedCourse.msg.length !== 0) ? this.props.SelectedCourse.msg.map( messg => <div className="CourseRoadMsg">{messg}</div>): null}
      </div>
    )
  }
}

export default CourseInfo