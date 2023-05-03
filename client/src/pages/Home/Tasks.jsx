import React, { Component } from 'react'
import './Tasks.css'

export default class Tasks extends Component {
  render() {
    console.log(this.props.all_tasks)
    console.log(this.props.date)
    return (
    <div className='Tasksmain'>
      <div className='titlehome'>Tasks</div>
      <div className='content'>On {this.props.date}</div>
      {this.props.all_tasks[this.props.date] && this.props.all_tasks[this.props.date].map((task, index) => <div className='contentitems'>{task}</div>)}
    </div>
    )
  }
}
