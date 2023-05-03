import React, { Component } from 'react'
import './SemCredInfo.css'

export class SemCredInfo extends Component {
    getTotalCred()
    {
        var cred = 0
        const Stringtonum = {
        "First" : 1,"Second" : 2,"Third" : 3,"Fourth" : 4,"Fifth" : 5,"Sixth" : 6,"Seventh" : 7,"Eighth" : 8
        }
        const currSem = Stringtonum[this.props.SelectedSem]-1
        for(var i=0; i<this.props.Courses[currSem].length; i++)
        {
        cred = cred + this.props.Courses[currSem][i].credits
        }
        return cred
    }
  render() {
    return (
        <div className="SemCredInfoContainer">
        <div className="SemCredInfoItems">{this.props.SelectedSem} Semester</div>
        <div className="SemCredInfoItems">Total Cred: {this.getTotalCred()}</div>
        <div className="SemCredInfoItems">Rem Dept Elec: </div>
        <div className="SemCredInfoItems">Rem Free Elec: </div>
        <div className="SemCredInfoItems">Rem LA/CA: </div>
      </div>
    )
  }
}

export default SemCredInfo