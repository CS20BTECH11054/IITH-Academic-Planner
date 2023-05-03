import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
//import data from "./newdata.json"; // assuming data is in the same directory as this file
import './Timetable.css'
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import { faCirclePlus} from "@fortawesome/free-solid-svg-icons"
//import TimetableOpts from '../../components/Timetable/TimetableOpts';
import Select from 'react-select';
import axios from 'axios'

function handleClick(slotname, slottime, data1, data2)
{
  if(data1[slottime] || data2[slottime])
  {
    alert("There is already a course/activity present at that slot")
    return
  }

  const handleSlotAdd = async () => {
    try {
      const headers = {
        'Authorization': `${sessionStorage.getItem('token')}`
      };
      const res = await axios.post(`http://localhost:5000/api/user/addSlot`,{"slotname": slotname, "slot":slottime},{headers});
      console.log(res)
      alert("Added successfully")
    } catch (error) {
      console.log(error)
      }
    }
    handleSlotAdd()
}

function handleUpdate(data1, data2, setdata1, setdata2, setSlotsData)
{
  const handlegetAllSlots = async () => {
    try {
      const headers = {
        'Authorization': `${sessionStorage.getItem('token')}`
      };
      const res = await axios.get(`http://localhost:5000/api/user/getAllSlots`,{headers});
      setdata1(res.data)
      var data = data1
      if (data) {
        for (const slot in data) {
          const subject = data[slot];
          const Tslot = SlotsTime[slot];
          for (let i = 0; i < Tslot.length; i++) {
            const day = Tslot[i].day;
            const time = Tslot[i].time;

            setSlotsData(prevSlotsData => ({
              ...prevSlotsData,
              [day]: {
                ...prevSlotsData[day],
                [time]: subject
              }
            }));
          }
        }
      }
    } catch (error) {
      console.log(error)
      }
    }
    
    const SlotsTime= {
      "A": [
        { day: "Monday", time: "9.00-9.55" },
        { day: "Wednesday", time: "11.00-11.55" },
        { day: "Thursday", time: "10.00-10.55" }
      ],
      "B": [
        { day: "Monday", time: "10.00-10.55" },
        { day: "Wednesday", time: "9.00-9.55" },
        { day: "Thursday", time: "11.00-11.55" }
      ],
      "C": [
        { day: "Monday", time: "11.00-11.55" },
        { day: "Wednesday", time: "10.00-10.55" },
        { day: "Thursday", time: "9.00-9.55" }
      ],
      "D": [
        { day: "Monday", time: "12.00-12.55" },
        { day: "Tuesday", time: "9.00-9.55" },
        { day: "Friday", time: "11.00-11.55" }
      ],
      "E": [
        { day: "Tuesday", time: "10.00-10.55" },
        { day: "Friday", time: "9.00-9.55" },
        { day: "Thursday", time: "12.00-12.55" }
      ],
      "F": [
        { day: "Tuesday", time: "11.00-11.55" },
        { day: "Friday", time: "10.00-10.55" }
      ],
      "G": [
        { day: "Tuesday", time: "12.00-12.55" },
        { day: "Wednesday", time: "12.00-12.55" },
        { day: "Friday", time: "12.00-12.55" }
      ],
      "P": [
        { day: "Monday", time: "14.30-15.55" },
        { day: "Thursday", time: "16.00-17.25"}
      ],
      "Q": [
        { day: "Monday", time: "16.00-17.25"},
        { day: "Thursday", time: "14.30-15.55"}
      ],
      "R": [
        { day: "Tuesday", time: "14.30-15.55" },
        { day: "Friday", time: "16.00-17.25"}
      ],
      "S": [
        { day: "Tuesday", time: "16.00-17.25"},
        { day: "Friday", time: "14.30-15.55"}
      ],
      "W": [
        { day: "Monday", time: "18.00-19.25" },
        { day: "Thursday", time: "18.00-19.25"}
      ],
      "X": [
        { day: "Monday", time: "19.30-21.00" },
        { day: "Thursday", time: "19.30-21.00"}
      ],
      "Y": [
        { day: "Tuesday", time: "18.00-19.25"},
        { day: "Friday", time: "18.00-19.25"}
      ],
      "Z": [
        { day: "Tuesday", time:"19.30-21.00"},
        { day: "Friday", time:"19.30-21.00"}
      ],
    };

    const handlegetAllCourseSlots = async() =>{
      try {
        const headers = {
          'Authorization': `${sessionStorage.getItem('token')}`
        };
        const res = await axios.get(`http://localhost:5000/api/user/getAllCourses`,{headers});
        setdata2(res.data)
        var data = data2
        if (data) {
          for (const slot in data) {
            const subject = data[slot];
            const Tslot = SlotsTime[slot];
            for (let i = 0; i < Tslot.length; i++) {
              const day = Tslot[i].day;
              const time = Tslot[i].time;
  
              setSlotsData(prevSlotsData => ({
                ...prevSlotsData,
                [day]: {
                  ...prevSlotsData[day],
                  [time]: subject
                }
              }));
            }
          }
        }
        handlegetAllSlots()
      } catch (error) {
        console.log(error)
        }
    }
    handlegetAllCourseSlots()
}

export default function Timetable() {

    const [slotname,setslotname] = useState("")
    const [slottime,setslottime] = useState("")
    const [data1, setdata1] = useState(null)
    const [data2, setdata2] = useState(null)

    const timeSlots = [
        "00.00-8.55",
        "9.00-9.55",
        "10.00-10.55",
        "11.00-11.55",
        "12.00-12.55",
        "12.55-14.30",
        "14.30-15.55",
        "16.00-17.25",
        "17.30-17.55",
        "18.00-19.25",
        "19.30-21.00",
        "21.05-23.59"
      ];
    
      const [slotsData, setSlotsData] = useState({
          Monday: {
            "00.00-8.55":"Asish",
            "9.00-9.55":"",
            "10.00-10.55":"",
            "11.00-11.55":"",
            "12.00-12.55":"",
            "12.55-14.30":"Lunch",
            "14.30-15.55":"",
            "16.00-17.25":"",
            "17.30-17.55":"Snacks",
            "18.00-19.25":"",
            "19.30-21.00":"",
            "21.05-23.59":""
          },
          Tuesday: {
            "00.00-8.55":"",
            "9.00-9.55":"",
            "10.00-10.55":"",
            "11.00-11.55":"",
            "12.00-12.55":"",
            "12.55-14.30":"Lunch",
            "14.30-15.55":"",
            "16.00-17.25":"",
            "17.30-17.55":"Snacks",
            "18.00-19.25":"",
            "19.30-21.00":"",
            "21.05-23.59":""
          },
          Wednesday: {
            "00.00-8.55":"",
            "9.00-9.55":"",
            "10.00-10.55":"",
            "11.00-11.55":"",
            "12.00-12.55":"",
            "12.55-14.30":"Lunch",
            "14.30-15.55":"",
            "16.00-17.25":"",
            "17.30-17.55":"Snacks",
            "18.00-19.25":"",
            "19.30-21.00":"",
            "21.05-23.59":""
          },
          Thursday: {
            "00.00-8.55":"",
            "9.00-9.55":"",
            "10.00-10.55":"",
            "11.00-11.55":"",
            "12.00-12.55":"",
            "12.55-14.30":"Lunch",
            "14.30-15.55":"",
            "16.00-17.25":"",
            "17.30-17.55":"Snacks",
            "18.00-19.25":"",
            "19.30-21.00":"",
            "21.05-23.59":""
          },
          Friday: {
            "00.00-8.55":"",
            "9.00-9.55":"",
            "10.00-10.55":"",
            "11.00-11.55":"",
            "12.00-12.55":"",
            "12.55-14.30":"Lunch",
            "14.30-15.55":"",
            "16.00-17.25":"",
            "17.30-17.55":"Snacks",
            "18.00-19.25":"",
            "19.30-21.00":"",
            "21.05-23.59":""
          },
          Saturday: {
            "00.00-8.55":"",
            "9.00-9.55":"",
            "10.00-10.55":"",
            "11.00-11.55":"",
            "12.00-12.55":"",
            "12.55-14.30":"Lunch",
            "14.30-15.55":"",
            "16.00-17.25":"",
            "17.30-17.55":"Snacks",
            "18.00-19.25":"",
            "19.30-21.00":"",
            "21.05-23.59":""
          },
        });
      
    const slotOptions = [
        { "name" : "A", "label": "A"},
        { "name" : "B", "label": "B"},
        { "name" : "C", "label": "C"},
        { "name" : "D", "label": "D"},
        { "name" : "E", "label": "E"},
        { "name" : "F", "label": "F"},
        { "name" : "G", "label": "G"},
        { "name" : "P", "label": "P"},
        { "name" : "Q", "label": "Q"},
        { "name" : "R", "label": "R"},
        { "name" : "S", "label": "S"},
        { "name" : "W", "label": "W"},
        { "name" : "X", "label": "X"},
        { "name" : "Y", "label": "Y"},
        { "name" : "Z", "label": "Z"},
    ]
    
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className='Updatebtn' onClick={()=>handleUpdate(data1, data2, setdata1, setdata2, setSlotsData)}>Update</div>
        <div className='TimetableWindow'>
        <table className='Timetab'>
        <thead>
          <tr>
            <th className="TabHead">Day</th>
            {timeSlots.map(slot=> <th className="TabHead">{slot}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.entries(slotsData).map(([day, slots], id) => (
            <tr key={day}>
              <td className="TabDataDay">{day}</td>
              {Object.entries(slots).map(([time, name], index) => (
                <td className={`TabData ${(name === "Lunch" || name === "Snacks")?"Break":((index %2 !== 0) ? "active" : null)}`} key={`${day}-${time}`}>{name}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='TimetableOptsContainer'>
        <div className='TimetableOptsTitleContainer'>
            <div className='AddSlotItems'>Add Slots</div>
        </div>
        <div>
            <input placeholder='Enter Slotname' className='AddSlotItems' value={slotname} onChange={(e)=>setslotname(e.target.value)} />
            <Select className='AddSlotItems' options={slotOptions} onChange={(e)=>setslottime(e["name"])}/>
            <div className='AddSlotOkbtn' onClick={()=>handleClick(slotname, slottime, data1, data2)}>Ok</div>
        </div>
      </div>
      </div>
    </div>
  )
}
