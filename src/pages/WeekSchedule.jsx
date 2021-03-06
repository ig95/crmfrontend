/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import NavigationBar from '../components/NavBar'
import DivSingleWeek from '../components/DivSingleWeek'
import MakeDriver from './MakeEmployee'

const WeekSchedule = (props) => {
    var CryptoJS = require("crypto-js");
    const [ drivers, setDrivers ] = useState(null)
    const [ schedule, setSchedule ] = useState(null)
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ selectedAmount, setSelectedAmount ] = useState('14')
    const [ selectedSunday, setSelectedSunday ] = useState('14')
    const [ mathSunday, setMathSunday ] = useState('14')
    const [ varForMapping, setVarForMapping ] = useState('DBS2')
    const [ logicalGate, setLogicalGate ] = useState(false)
    const [ reloadGate, setReloadGate ] = useState(false)
    const [ submitPressed, setSubmitPressed ] = useState('Submit')
    const [ deletionScreen, setDeletionScreen ] = useState(false)
    const [ deleteDriverSelection, setDeleteDriverSelection ] = useState(null)

    // eslint-disable-next-line no-extend-native
    Date.prototype.getWeek = function () {
        var firstDate = new Date(this.getFullYear(), 0, 1)
        return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstDate) / 86400000) + firstDate.getDay() + 1) / 7)
    }

    // dev data ... note to self... the following component only accepts format day:date
    // call this location rota, make it color coded by deopt, and trianing different color - 14 days
    useEffect(() => {
        async function getData(url = '') {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/drivers/').then( (response) => {
            setDrivers(response.results)
            getData('https://pythonicbackend.herokuapp.com/schedule/').then( (response) => {
                setSchedule(response.results)
            })
        })

        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setSelectedSunday(`Week: ${myDate.getWeek()} | ${myDate.toDateString()} `)
        setVarForMapping(myDate.toDateString())
        setMathSunday(myDate.toDateString())
    }, [])

    // set city
    const handleSelectSunday = (e, city, pick) => {
        setSelectedSunday(city)
        setVarForMapping(pick)
    }

    // get sundays
    const getSundays = () => {
        let sundays = []
        let currentDate = new Date(mathSunday)
        for (let i = 0; i < 50; i++) {
            let dateInner = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            if (dateInner.getDay() === 0) {
                sundays.push(
                    <li className="menu-item" onClick={(e, city) => handleSelectSunday(e, `${dateInner.toDateString()} | Week: ${dateInner.getWeek()}`, `${dateInner.toDateString()}`)}><a href="#0">{dateInner.toDateString()} | Week: {dateInner.getWeek()}</a></li>
                    )
            }
        }
        return sundays
    }

    // dropdown menu options
    const optionsThree = getSundays()
    
    // set city
    const handleSelectCity = (e, city) => {
        setSelectedCity(city)
    }

    // set Amount
    const handleSelectAmount = (e, city) => {
        setSelectedAmount(city)
    }

    // new driver selection
    const handleMakeDriverPage = () => {
        setLogicalGate(true)
    }

    // get rid of the driver page
    const backToNormal = () => {
        setLogicalGate(false)
    }

    // toggle the delete driver tab
    const handleDeletionToggle = () => {
        setDeletionScreen(true)
    }

    // make driver page
    var makeTheDriver
    makeTheDriver = (
        <>
        <MakeDriver user_name={props.user_name} user_email={props.user_email} user_id={props.user_id}/>
            <div className='absolute_return_button'>
                <button className='compliance_add_driver_button_submit' onClick={backToNormal}>
                    <span className='span_in_complaince_button'>Return</span> 
                </button>
            </div>
        </>
    )

    // handle delete submit
    const handleDeleteSubmit = () => {

    }

    // handle get back from deletion screnn
    const backToNormalDeletion = () => {
        setDeleteDriverSelection(null)
        setDeletionScreen(false)
    }

    // handle making a delete driver screen
    var deleteTheDriver
    if (deleteDriverSelection) {
        deleteTheDriver = (
            <div className='new_driver_form_container'>
                <div className='delete_screen_container'>
                    <h1>Delete {deleteDriverSelection.name}</h1>
                    <form onSubmit={handleDeleteSubmit}>
                        <label className='container_checkbox'>Yes
                            <input type="checkbox" />
                            <span className='checkmark_yes' id='yes'></span>
                        </label>
                        <br/>    
                        <label className='container_checkbox'>No
                            <input type="checkbox" />
                            <span className='checkmark_no' id='no'></span>
                        </label>
                        <div className='deleteDriverButtons'>
                            <button className='compliance_add_driver_button_submit' onClick={backToNormalDeletion}>
                                <span className='span_in_complaince_button'>Submit</span> 
                            </button>
                            <button className='compliance_add_driver_button_submit' onClick={backToNormalDeletion}>
                                <span className='span_in_complaince_button'>Return</span> 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    // grab child selection
    const deleteDriverFunction = (e, driverSelected) => {
        setDeleteDriverSelection(driverSelected)
    }

    var content;
    if (drivers && !logicalGate && !deleteDriverSelection) {
        content = (
            <div className='home_content'>
                <NavigationBar title='Location Rota' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
                <div className='main_content_week_schedule'>
                    <div className='drop_down_bar_container_single_week'>
                        <nav className="menu_smaller">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedCity}</a>
                                    <ol className="sub-menu">
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DBS2')}><a href="#0">DBS2</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0">DSN1</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DEX2')}><a href="#0">DEX2</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DXP1')}><a href="#0">DXP1</a></li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                        <nav className="menu_smaller">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedAmount}</a>
                                    <ol className="sub-menu">
                                        <li className="menu-item" onClick={(e, city) => handleSelectAmount(e, '7')}><a href="#0">7</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectAmount(e, '14')}><a href="#0">14</a></li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                        <nav className="menu">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedSunday}</a>
                                    <ol className="sub-menu">
                                        {optionsThree}
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                        <div className='rota_top_spacer'>
                            <button className='compliance_add_driver_button_submit' onClick={handleMakeDriverPage}>
                                <span className='span_in_complaince_button'>View Drivers</span> 
                            </button>
                        </div>
                        <div className='rota_top_spacer_two'>
                            <button className='compliance_add_driver_button_submit' onClick={handleDeletionToggle}>
                                <span className='span_in_complaince_button'>Delete Drivers</span> 
                            </button> 
                        </div>
                    </div>
                    <div className='scheduling_single_week_overlay'>
                        <DivSingleWeek 
                            drivers={drivers} 
                            schedule={schedule}
                            selectedDate={varForMapping}
                            divAmount={selectedAmount}
                            selectedCity={selectedCity ? selectedCity : 'DBS2'}
                            deletionDriver={deleteDriverFunction}
                            deleteDriverScreen={deletionScreen}
                        />
                    </div>
                </div>
            </div>
        )
    } else if (logicalGate && !deleteDriverSelection) {
        content = (
            makeTheDriver
        )
    } else if (deleteDriverSelection) {
        content = (
            deleteTheDriver
        )
    } else {
        content = ''
    }

    return (
        <>
            {content}
        </>
    )
}

export default WeekSchedule