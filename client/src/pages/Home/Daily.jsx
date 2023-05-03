import React, { Component } from 'react'
import './Daily.css'

export default class Daily extends Component {
  render() {
    return (
      <div className='Dailycontainer'>
        {this.props.tasks && this.props.tasks.map((task, index) => <div className='Dailyitems'>{task}</div>)}
      </div>
    )
  }
}
