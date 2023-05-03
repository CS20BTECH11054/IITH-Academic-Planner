import React, { Component } from 'react'
import Select from 'react-select'

export class DeptSelectWindow extends Component {
    handleChange= (e) =>{
        //console.log(e)
        this.props.handleDeptSelChange(e)
    }
  render() {
    const options = [{
        "name": "CSE", "label":"CSE"
      }]
    return (
        <div className="DeptSelectWindow">
        <div className="DeptSelectQs">Department:</div>
        <Select options={options} onChange={this.handleChange} placeholder="Select"/>
        <div className="DeptSelectOkbtn" onClick={this.props.handleDeptClick}>Ok</div>
      </div>
    )
  }
}

export default DeptSelectWindow