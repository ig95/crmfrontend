import React, { useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import NavBar from '../components/NavBar'
import DivWeek from '../components/DivWeek'
import Dropdown from 'react-dropdown';
import 'react-calendar/dist/Calendar.css';
import 'react-dropdown/style.css';

var myInterval
const Home = (props) => {
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ currentDate, setCurrentDate ] = useState(new Date())
    const [ selectedCity, setSelectedCity ] = useState('')
    const [ schedule, setSchedule ] = useState(null)

    // grab the data
    useEffect(() => {
        async function getData(url = '') {
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
            setSchedule(response.results)
            console.log(response.results)
        })
    }, [])
    
    // handling the clock
    useEffect( () => {
        clearInterval(myInterval)
        const timeFunction = () => {
            let setTime = () => {
                setCurrentDate(new Date())
            }
            myInterval = setInterval( setTime, 1000)
        }
        timeFunction()
    }, [])

    // changes the selected date with the calendar selections
    const handleCalendarChange = (e) => {
        setSelectedDate(e)
    }

    // dropdown menu options
    const options = [
        'DBS2',
        'DSN1',
        'DEX2'
    ]

    // dropdown menu selection function
    const onSelect = (e) => {
        setSelectedCity(e.value)
    }

    return (
        <div className='home_content'>
            <NavBar title='Home'/>
            <div className='main_content'>
                <div className='calandar_container'>
                    <div className='drop_down_bar_container'>
                        <Dropdown 
                            options={options} 
                            onChange={onSelect} 
                            value={selectedCity} 
                            placeholder="Select an option" 
                            className='drop_down_bar'
                        />
                    </div>
                    <Calendar 
                        onChange={handleCalendarChange}
                        value={selectedDate}
                        className='calander'
                    />
                </div>
                <div className='scheduling_four_week_overlay'>
                    <DivWeek 
                        currentDate={selectedDate}
                        scheduleDates={schedule}
                        selectedLocation={selectedCity ? selectedCity : 'DBS2'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home