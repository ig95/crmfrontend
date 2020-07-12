/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react'
import NavigationBar from '../components/NavBar'
var myDriver = null
var myCheckerFuckReactArray = []
const RentalVanTracker = (props) => {
    var CryptoJS = require("crypto-js");
    const [ data, setData ] = useState(null)
    const [ vanData, setVanData ] = useState([])
    const [ mathSunday, setMathSunday ] = useState('14')
    const [ sunday, setSunday ] = useState(new Date())
    const [ driverData, setDriverData ] = useState([])
    const [ vehicleData, setVehicleData ] = useState([])
    const [ registrationSearch, setRegistrationSearch ] = useState([])
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ dataGate, setDataGate ] = useState(0)
    const [ topPart, setTopPart ] = useState([])
    const [ arrayChecked, setArrayChecked ] = useState([])
    const [ dateCheckArray, setDateCheckArray ] = useState([])
    const [awesomeArrayArray, setAwesomeArrayArray ] = useState([])

    // eslint-disable-next-line no-extend-native
    Date.prototype.getWeek = function () {
        var firstDate = new Date(this.getFullYear(), 0, 1)
        return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstDate) / 86400000) + firstDate.getDay() + 1) / 7)
    }

    // sets the variable outside for use in posting
    useEffect( () => {
        myDriver = selectedDriver
    }, [selectedDriver])

    // sets the variable outside for use in posting
    useEffect( () => {
        myCheckerFuckReactArray = awesomeArrayArray
    }, [awesomeArrayArray])

    useEffect(() => {
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setSunday(myDate)
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

        getData('https://pythonicbackend.herokuapp.com/vandata/').then( (response) => {
            setData(response.data)
            console.log(response.data)
            getData('https://pythonicbackend.herokuapp.com/vehicles/').then( response => {
                setVehicleData(response.results)
            })
        })  
    }, [dataGate])

    const mapRegistrations = (letters) => {
        var registrationList = []
        if (vehicleData.length > 0) {
            vehicleData.forEach( (ele, eleId) => {
                if (ele.registration.includes(letters)) {
                    registrationList.push(
                        <div key={eleId} className='rentalVanChildName'>{ele.registration}</div>
                    )
                }
            })
        }
        return registrationList
    }

    // send form to backend
    const handleSubmit = (registrationName) => {
        console.log(myDriver)
        let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'PUT', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${originalText}`
                },
                body: JSON.stringify(data)
                });

            return response ? response.json() : console.log('no reponse')

        };

        postData(`https://pythonicbackend.herokuapp.com/drivers/${myDriver.driver_id}/`, {
            vehicle_name: registrationName
        }).then( (response) => {
            let myGate = dataGate
            let theGate = myGate += 1
            setDataGate(theGate)
        })
    }

    const handleSubmitVan = (e, inputOption) => {
        handleSubmit(inputOption.props.children)
    }

    const mapTheOption = (theList) => {
        let localArray = []
        theList.forEach( (option, optionID) => {
            localArray.push(
                <p className='registrationSearchList' onClick={(e, theOption) => handleSubmitVan(e, option)}>
                    {option}
                </p>
            )
        })
        return localArray
    }

    const handleChange= (e) => {
        setRegistrationSearch(mapTheOption(mapRegistrations(e.target.value)))
    }

    // select the driver for submitting the assignment to driver class
    const handleSelectDriver = (e, selectedDriver) => {
        setSelectedDriver(selectedDriver)
    }

    useEffect( () => {
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        let localSunday = myDate
        let localArray = []
        localArray.push(
            <div className='van_Horizontal'>
                <div className='van_vertical'>
                    DA Name
                </div>
                <div className='van_vertical_weekday'>
                    Van Reg
                </div>
                <div className='van_vertical_weekday'>
                    {new Date(sunday.setDate(sunday.getDate())).toDateString()}
                </div>
                <div className='van_vertical_weekday'>
                    {new Date(sunday.setDate(sunday.getDate() + 1)).toDateString()}
                </div>
                <div className='van_vertical_weekday'>
                    {new Date(sunday.setDate(sunday.getDate() + 1)).toDateString()}
                </div>
                <div className='van_vertical_weekday'>
                    {new Date(sunday.setDate(sunday.getDate() + 1)).toDateString()}
                </div>
                <div className='van_vertical_weekday'>
                    {new Date(sunday.setDate(sunday.getDate() + 1)).toDateString()}
                </div>
                <div className='van_vertical_weekday'>
                    {new Date(sunday.setDate(sunday.getDate() + 1)).toDateString()}
                </div>
                <div className='van_vertical_weekday'>
                    {new Date(sunday.setDate(sunday.getDate() + 1)).toDateString()}
                </div>
                <div className='van_vertical_weekday'>
                    Total Rental
                </div>
            </div>
        )
        let myDateArray = [
            new Date(localSunday.setDate(localSunday.getDate())).toDateString(),
            new Date(localSunday.setDate(localSunday.getDate() + 1)).toDateString(),
            new Date(localSunday.setDate(localSunday.getDate() + 1)).toDateString(),
            new Date(localSunday.setDate(localSunday.getDate() + 1)).toDateString(),
            new Date(localSunday.setDate(localSunday.getDate() + 1)).toDateString(),
            new Date(localSunday.setDate(localSunday.getDate() + 1)).toDateString(),
            new Date(localSunday.setDate(localSunday.getDate() + 1)).toDateString()
        ]
        setDateCheckArray(myDateArray)
        setTopPart(localArray)
    }, [sunday])

    // hand esubmitting the main form
    const handleSubmitMainForm = (e, driverSelectedSubmit, theVanId) => {
        e.preventDefault()
        console.log(myCheckerFuckReactArray)
        let vehicleId = -1
        vehicleData.forEach ( element => {
            if (element.registration === driverSelectedSubmit.vehicle_name) {
                vehicleId = element.vehicle_id
            }
        })
        // submit the selected dates to backend
        const handleSubmit = (driver, theDate) => {
            console.log(myDriver)
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            async function postData(url = '', data = {}) {
                const response = await fetch(url, {
                    method: 'POST', 
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${originalText}`
                    },
                    body: JSON.stringify(data)
                    });

                return response ? response.json() : console.log('no reponse')

            };

            postData(`https://pythonicbackend.herokuapp.com/vanDates/`, {
                vehicle_id: `https://pythonicbackend.herokuapp.com/vehicles/${vehicleId}/`, 
                driver_id: `https://pythonicbackend.herokuapp.com/drivers/${driver.driver_id}/`,
                date: theDate,
            }).then( (response) => {
                console.log(response)
                let myGate = dataGate
                let theGate = myGate += 1
                setDataGate(theGate)
            })
        }
        let arrayOfDates = []
        myCheckerFuckReactArray[theVanId].forEach( (ele, eleId) => {
            if (ele !== 0) {
                arrayOfDates.push(dateCheckArray[eleId])
            }
        })
        arrayOfDates.forEach( (ele, eleId) => {
            handleSubmit(driverSelectedSubmit, ele)
        })
    }

    // add the date to the array to send to back end
    const handleSelectDate = (e, vanId, theNumber) => {
        let myArray = myCheckerFuckReactArray
        myArray[vanId][theNumber] = 1
        setAwesomeArrayArray(myArray)
    }

    // delete van rental day
    const handleDeleteDay = (e, targetDate) => {
            // send form to backend
        const handleSubmit = (theDate) => {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            async function DeleteData(url = '') {
                const response = await fetch(url, {
                    method: 'DELETE', 
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${originalText}`
                    },
                    });

                return response ? response : console.log('no reponse')

            };

            DeleteData(`https://pythonicbackend.herokuapp.com/vanDates/${theDate.vehicleDate_id}/`).then( (response) => {
                console.log(response)
                let myGate = dataGate
                let theGate = myGate += 1
                setDataGate(theGate)
            })
        }
        handleSubmit(targetDate)

    }

    useEffect( () => {
        let localArray = []
        let arrayOfBoxes = []
        let awesomeArrayMaker = []
        if (data && vehicleData) {
            data.drivers.forEach( (driver, vanID) => {
                awesomeArrayMaker.push([0,0,0,0,0,0,0])
                if (driver.vanDatesArray.length > 0) {
                    let checkerArray = [0,0,0,0,0,0,0]
                    let localSum = 0
                    let myLocalArray = []
                    for (let i=0; i < 7; i++) {
                        myLocalArray.push(
                            <div key={vanID} className='van_vertical_weekday_two'>
                                <label className='container_checkbox_two'>
                                    <input type="checkbox" onClick={(e, element, elementTwo) => handleSelectDate(e, vanID, i)}/>
                                    <span className='checkmark_yes_two' id='yes'></span>
                                </label>
                            </div>
                        )
                    }
                    driver.vanDatesArray.forEach( element => {
                        if (dateCheckArray.includes(element.date)) {
                            localSum++
                            myLocalArray[dateCheckArray.indexOf(element.date)] = (
                                <div key={vanID} className='van_vertical_weekday_three' onClick={(e, theDate) => handleDeleteDay(e, element)}>
                                    <h3>1</h3>
                                </div>
                            )
                            checkerArray[dateCheckArray.indexOf(element.date)] = 1
                        }
                    })
                    localArray.push(
                        <form key={vanID} onSubmit={(e, driverG, vanIDG) => handleSubmitMainForm(e, driver, vanID)}>
                            <div className='van_Horizontal' >
                            <div className='overallNameInputDivRental'>
                                <input type='submit' value={driver.name} className='van_vertical_name' />
                                <p className='pTagRentalVehicle'>Submit</p>
                            </div>    
                                <div className='van_vertical_weekday_registration'>
                                    <input type="text" className='inputRentalVanTracker' defaultValue={driver.vehicle_name} onChange={handleChange} onClick={(e, driverteo) => handleSelectDriver(e, driver)}/>
                                    <ol className='listRentalVanCheck'>
                                        {registrationSearch}
                                    </ol>
                                </div>
                                {myLocalArray}
                                <div className='van_vertical_weekday'>
                                    {localSum}
                                </div>
                            </div>
                        </form>
                    )
                    arrayOfBoxes.push(checkerArray)
                } else {
                    arrayOfBoxes.push([0,0,0,0,0,0,0])
                    localArray.push (
                        <form key={vanID} onSubmit={(e, driverG, vanIDG) => handleSubmitMainForm(e, driver, vanID)}>
                            <div className='van_Horizontal' >
                                <div className='overallNameInputDivRental'>
                                    <input type='submit' value={driver.name} className='van_vertical_name' />  
                                    <p className='pTagRentalVehicle'>Submit</p> 
                                </div>
    
                                <div className='van_vertical_weekday_registration'>
                                    <input type="text" className='inputRentalVanTracker' defaultValue={driver.vehicle_name} onChange={handleChange} onClick={(e, driverteo) => handleSelectDriver(e, driver)}/>
                                    <ol className='listRentalVanCheck'>
                                        {registrationSearch}
                                    </ol>
                                </div>
                                <div key={vanID} className='van_vertical_weekday_two'>
                                    <label className='container_checkbox_two'>
                                        <input type="checkbox" onClick={(e, element, elementTwo) => handleSelectDate(e, vanID, 0)}/>
                                        <span className='checkmark_yes_two' id='yes'></span>
                                    </label>
                                </div>
                                <div key={vanID} className='van_vertical_weekday_two'>
                                    <label className='container_checkbox_two'>
                                        <input type="checkbox" onClick={(e, element, elementTwo) => handleSelectDate(e, vanID, 1)}/>
                                        <span className='checkmark_yes_two' id='yes'></span>
                                    </label>
                                </div>
                                <div key={vanID} className='van_vertical_weekday_two'>
                                    <label className='container_checkbox_two'>
                                        <input type="checkbox" onClick={(e, element, elementTwo) => handleSelectDate(e, vanID, 2)}/>
                                        <span className='checkmark_yes_two' id='yes'></span>
                                    </label>
                                </div>
                                <div key={vanID} className='van_vertical_weekday_two'>
                                    <label className='container_checkbox_two'>
                                        <input type="checkbox" onClick={(e, element, elementTwo) => handleSelectDate(e, vanID, 3)}/>
                                        <span className='checkmark_yes_two' id='yes'></span>
                                    </label>
                                </div>
                                <div key={vanID} className='van_vertical_weekday_two'>
                                    <label className='container_checkbox_two'>
                                        <input type="checkbox" onClick={(e, element, elementTwo) => handleSelectDate(e, vanID, 4)}/>
                                        <span className='checkmark_yes_two' id='yes'></span>
                                    </label>
                                </div>
                                <div key={vanID} className='van_vertical_weekday_two'>
                                    <label className='container_checkbox_two'>
                                        <input type="checkbox" onClick={(e, element, elementTwo) => handleSelectDate(e, vanID, 5)}/>
                                        <span className='checkmark_yes_two' id='yes'></span>
                                    </label>
                                </div>
                                <div key={vanID} className='van_vertical_weekday_two'>
                                    <label className='container_checkbox_two'>
                                        <input type="checkbox" onClick={(e, element, elementTwo) => handleSelectDate(e, vanID, 6)}/>
                                        <span className='checkmark_yes_two' id='yes'></span>
                                    </label>
                                </div>
                                <div className='van_vertical_weekday'>
                                    0
                                </div>
                            </div>
                        </form>
                    )
                }
            })
        }
        setVanData(localArray)
        setArrayChecked(arrayOfBoxes)
        setAwesomeArrayArray(awesomeArrayMaker)
    }, [data, vehicleData, registrationSearch])

    return (
        <div className='home_content' >
            <NavigationBar title='Rental Van Tracker' superUser={props.user_email === process.env.REACT_APP_EMAIL_VERIFICATION ? true : false}/>
            <div className='van_rental_tracker_overall'>
                {topPart}
                {vanData}
            </div>
        </div >
    )
}

export default RentalVanTracker