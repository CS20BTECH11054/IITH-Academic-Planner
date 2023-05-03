import React, { Component } from 'react'
import './Weekly.css'
import moment from 'moment'

export default class Weekly extends Component {
  constructor(){
    super()
    this.state={
      week: []
    }
  }
  componentDidMount()
  {
    var newweek = ["","","","","","","",""]
    for(var i=0; i<7;i++)
    {
      var day = moment().startOf('week').add(i, 'days').format("MM/DD/YYYY")
      console.log("Day is : ",day)
      newweek[i] = day
    }
    console.log(newweek)
    this.setState({
      week: newweek
    })
  }
  render() {
    return (
      <div className='Weeklycontainer'>
        {this.state.week && this.state.week.map((day, index) => (
          this.props.all_tasks[day] && this.props.all_tasks[day].map((course, id) => <div className='Weeklyitems'>{course} - {day}</div>)
        ))}
      </div>
    )
  }
}
