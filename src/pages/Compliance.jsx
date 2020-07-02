/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import NavigationBar from '../components/NavBar'
import { Link } from 'react-router-dom';

const Compliance = () => {
    var CryptoJS = require("crypto-js");
    const [ selectedCity, setSelectedCity ] = useState('DBS2')
    const [ logicalGate, setLogicalGate ] = useState(false)
    const [ submitPressed, setSubmitPressed ] = useState('Create Driver')
    const [ reloadGate, setReloadGate ] = useState(false)
    const [ data, setData ] = useState(null)
    const [ nonActiveDrivers, setNonActiveDrivers ] = useState([])
    const [ nonVerifiedImages, setNonVerifiedImages ] = useState([])
    const [ nonDriverVans, setNonDriverVans ] = useState([])
    const [ vanList, setVanList ] = useState([])
    const [ selectedVan, setSelectedVan ] = useState(null)
    const [ selectedDriver, setSelectedDriver ] = useState(null)
    const [ reload, setReload ] = useState(0)
    const [ idVans, setIdVans ] = useState([])
    const [ editGate, setEditGate ] = useState(false)

    var editTheDriver;

    // grab the main data
    useEffect( () => {
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
        getData('https://pythonicbackend.herokuapp.com/data/').then( response => {
            setData(response.data)
            getData('https://pythonicbackend.herokuapp.com/vehicles/').then( reponse => {
                setVanList(reponse.results)
            })
        })
    }, [reload])
    
    // make a vehicle belong to a driver
    // if (selectedDriver && selectedVan) {
    //     async function putData(url = '', data = {}) {
    //         let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
    //         let originalText = bytes.toString(CryptoJS.enc.Utf8);
    //         const response = await fetch(url, {
    //             method: 'PUT', 
    //             mode: 'cors',
    //             cache: 'no-cache',
    //             credentials: 'same-origin',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Token ${originalText}`
    //             },
    //             body: JSON.stringify(data)
    //         });

    //         return response ? response.json() : console.log('no reponse')

    //     };
    //     putData(`https://pythonicbackend.herokuapp.com/vehicles/${selectedVan.vehicle_id}/`, {
    //         driver_id: `https://pythonicbackend.herokuapp.com/drivers/${selectedDriver.driver_id}/`
    //     }).then( response => {
    //         setSelectedDriver(null)
    //         setSelectedVan(null)
    //         let x = reload
    //         let y = x + 1
    //         setReload(y)
    //     })
    // }

    if (selectedDriver) {

    }

    // function for changing the city from dropdown
    const handleSelectCity = (e, selectCity) => {
        setSelectedCity(selectCity)
    }
    
    // send form to backend
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitPressed('Created')
        async function postData(url = '', data = {}) {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
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

        postData('https://pythonicbackend.herokuapp.com/drivers/', {
            name: e.target.name.value ? e.target.name.value : 'null',
            location: e.target.location.value ? e.target.location.value : 'null',
            phone: e.target.mobile.value ? e.target.mobile.value : 'null',
            email: e.target.email.value ? e.target.email.value : 'null',
            UTRNumber: e.target.UTRNumber.value ? e.target.UTRNumber.valuee : 'null',
        }).then( (response) => {
            backToNormal()
            let x = reload
            let y = x + 1
            setReload(y)
        })
    }

    // send form to backend editing
    const handleSubmitEdit = (e) => {
        e.preventDefault();
        setSubmitPressed('Edited')
        async function postData(url = '', data = {}) {
            let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), process.env.REACT_APP_ENCRYPTION_TYPE);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
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

        postData(`https://pythonicbackend.herokuapp.com/drivers/${selectedDriver.driver_id}/`, {
            name: e.target.name.value ? e.target.name.value : 'null',
            location: e.target.location.value ? e.target.location.value : 'null',
            phone: e.target.mobile.value ? e.target.mobile.value : 'null',
            email: e.target.email.value ? e.target.email.value : 'null',
            UTRNumber: e.target.UTRNumber.value ? e.target.UTRNumber.valuee : 'null',
        }).then( (response) => {
            console.log(response)
            backToNormal()
            let x = reload
            let y = x + 1
            setReload(y)
        })
    }

    // reset the page
    const backToNormal = () => {
        setLogicalGate(false)
        setEditGate(false)
        setSelectedDriver(null)
    }

    // make the driver page
    var makeTheDriver
    if (logicalGate) {
        makeTheDriver = (
            <div className='new_driver_form_container'>
                <h1>Add Driver</h1>
                <form onSubmit={handleSubmit} className='new_employee_form'>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Name</label>
                            <input className='inputs' type="text" name='name'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Depot</label>
                            <input className='inputs' type="text" name='location' defaultValue={selectedCity}/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Address</label>
                            <input className='inputs' type="text" name='address'/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Mobile</label>
                            <input className='inputs' type="tel" name='mobile' placeholder='required format: 425-314-9311' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Email</label>
                            <input className='inputs' type="email" name='email' required/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>UTR Number</label>
                            <input className='inputs' type="text" name='UTRNumber'/>
                    </div>
                    <div className='buttons_new_driverPage'>
                        <input type="submit" value={submitPressed} className='compliance_add_driver_button_submit' />
                        <button className='compliance_add_driver_button_submit' onClick={backToNormal}>
                            <span className='span_in_complaince_button'>Return</span> 
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    // edit Gate
    if (editGate) {
        console.log(selectedDriver)
        editTheDriver = (
            <div className='new_driver_form_container'>
                <h1>Edit Driver</h1>
                <form onSubmit={handleSubmitEdit} className='new_employee_form'>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Name</label>
                            <input className='inputs' type="text" name='name' defaultValue={selectedDriver.name}/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Depot</label>
                            <input className='inputs' type="text" name='location' defaultValue={selectedDriver.location}/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Address</label>
                            <input className='inputs' type="text" name='address' defaultValue={selectedDriver.address}/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Mobile</label>
                            <input className='inputs' type="tel" name='mobile' placeholder='required format: 425-314-9311' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={selectedDriver.phone}/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>Email</label>
                            <input className='inputs' type="email" name='email' defaultValue={selectedDriver.email} required/>
                    </div>
                    <div className='dashboard_form_divs_name'>
                        <label className='labels'>UTR Number</label>
                            <input className='inputs' type="text" name='UTRNumber' defaultValue={selectedDriver.DriverUniqueId}/>
                    </div>
                    <div className='buttons_new_driverPage'>
                        <input type="submit" value='Submit' className='compliance_add_driver_button_submit' />
                        <button className='compliance_add_driver_button_submit' onClick={backToNormal}>
                            <span className='span_in_complaince_button'>Return</span> 
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    // set the gate for make driver page
    const handleMakeDriverPage = () => {
        setLogicalGate(true)
    }

    // set the gate for edit driver page
    const handleEditClick = () => {
        setEditGate(true)
    }

    // map the non active drivers to list
    useEffect( () => {
        let localArray = []
        let localVerifiedArray = []
        if (data) {
            data.drivers.forEach( (driver, driverID) => {
                if (driver.status) {
                    if (driver.status !== 'Active') {
                        localArray.push(
                            <div key={driver.driver_id}>
                                <h3 key={driverID} className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                    {driver.name}
                                </h3>
                                <br />
                            </div>
                        )
                    } else if (driver.status === 'Active') {
                        localVerifiedArray.push(
                            <div key={driver.driver_id}>
                                <h3 key={driverID} className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                    {driver.name}
                                </h3>
                                <br />
                            </div>
                        )
                    }
                }
                if (!driver.status) {
                    localArray.push(
                        <div key={driver.driver_id}>
                            <h3 key={driverID} className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                {driver.name}
                            </h3>
                            <br />
                        </div>
                    )
                }
            })
        }
        setNonVerifiedImages(localVerifiedArray)
        setNonActiveDrivers(localArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        driverLocalList = localArray
    }, [data])

    // select a Driver for editing
    const handleSelectDriver = (e, driverMain) => {
        let localArray = []
        let localVerifiedArray = []
        setSelectedDriver(driverMain)
        console.log(driverMain)
        data.drivers.forEach( (driver, driverID) => {
            if (driver.name === driverMain.name) {
                if (driver.status === 'Active') {
                    localVerifiedArray.push(
                        <div key={driver.driver_id}>
                            <h3 className='h3_for_compliance_Page_colored' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                {driver.name}
                            </h3>
                            {'    '}
                            <button onClick={(e, driver) => handleEditClick(e, driver)}>edit</button>
                            <br />
                        </div>
                    )
                } else {
                    localArray.push(
                        <div key={driver.driver_id}>
                            <h3 className='h3_for_compliance_Page_colored' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                {driver.name}
                            </h3>
                            {'    '}
                            <button onClick={(e, driver) => handleEditClick(e, driver)}>edit</button>
                            <br />
                        </div>
                    )
                }
            } else {
                if (driver.status) {
                    if (driver.status !== 'Active') {
                        localArray.push(
                            <div key={driver.driver_id}>
                                <h3 className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                    {driver.name}
                                </h3>
                                <br />
                            </div>
                        )
                    } else if (driver.status === 'Active') {
                        localVerifiedArray.push(
                            <div key={driver.driver_id}>
                                <h3 className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                    {driver.name}
                                </h3>
                                <br />
                            </div>
                        )
                    }
                }
                if (!driver.status) {
                    localArray.push(
                        <div key={driver.driver_id}>
                            <h3 className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
                                {driver.name}
                            </h3>
                            <br />
                        </div>
                    )
                }
            }
        })
        setNonVerifiedImages([localVerifiedArray])
        setNonActiveDrivers([localArray])
    }

    var driverLocalList
    return (
        <div className='home_content'>
            <NavigationBar title='Compliance'/>
            {makeTheDriver}
            {editTheDriver}
            <div className='main_content_compliance'>
                <div className='top_container_compliance_page'>
                    <div className='drop_down_bar_container'>
                        <nav class="menu">
                            <ol>
                                <li className="menu-item"><a href="#0">{selectedCity}</a>
                                    <ol className="sub-menu">
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DBS2')}><a href="#0">DBS2</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DSN1')}><a href="#0">DSN1</a></li>
                                        <li className="menu-item" onClick={(e, city) => handleSelectCity(e, 'DEX2')}><a href="#0">DEX2</a></li>
                                    </ol>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div>
                        <button className='compliance_add_driver_button' onClick={handleMakeDriverPage}>
                            <span className='span_in_complaince_button'>ADD DRIVER</span> 
                        </button>
                    </div>
                </div>
                <div className='bottom_container_compliance_page'>
                    <div className='bottom_buttons_compliance_page'>
                        <Link to='/documentsforverification' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Waiting for Verification</span> 
                            </button>
                        </Link>
                        <h2 className='h2Label'>Non-Verified</h2>
                        {nonActiveDrivers}
                    </div>
                    <div className='bottom_buttons_compliance_page'>
                        <Link to='/driverdocuments' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Driver Documents</span> 
                            </button>
                        </Link>
                        <h2 className='h2Label'>Verified</h2>
                        {nonVerifiedImages}
                    </div>
                    <div className='bottom_buttons_compliance_page'>
                        <Link to='drivercompliancecheck' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Driver Compliance Check</span> 
                            </button>
                        </Link>
                    </div>
                    <div className='bottom_buttons_compliance_page' id='last_div_compliance_page'>
                        <Link to='/companyvans' className='links'>
                            <button className='compliance_add_driver_button' >
                                <span className='span_in_complaince_button'>Company Vans</span> 
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compliance


    // // select a van to assign to a driver
    // const handleSelectDriverVerified = (e, driverMain) => {
    //     setSelectedDriver(null)
    //     let localArray = []
    //     setSelectedDriver(driverMain)
    //     data.drivers.forEach( (driver, driverID) => {
    //         if (driver.name === driverMain.name) {
    //             localArray.push(
    //                 <div key={driver.driver_id}>
    //                     <h3 className='h3_for_compliance_Page_colored' onClick={(e, theDriver) => handleSelectDriver(e, driver)}>
    //                         {driver.name}
    //                     </h3>
    //                     {'    '}
    //                     <button onClick={(e, driver) => handleEditClick(e, driver)}>edit</button>
    //                     <br />
    //                 </div>
    //             )
    //         } else {
    //             if (driver.status) {
    //                 if (driver.status === 'Active') {
    //                     localArray.push(
    //                         <div key={driver.driver_id}>
    //                             <h3 className='h3_for_compliance_Page' onClick={(e, theDriver) => handleSelectDriverVerified(e, driver)}>
    //                                 {driver.name}
    //                             </h3>
    //                             <br />
    //                         </div>
    //                     )
    //                 }
    //             }
    //         }
    //     })
    //     setNonVerifiedImages([localArray])
    // }

    // react you can actually suck a fat dick and then i hope you choke
    
    // eslint-disable-next-line no-unused-vars
    var driverLocalListVerified

    // react you fucking suck
    var stupidAssList

    // // select a van to assign to a driver
    // const handleVanNameClick = (e, van) => {
    //     let localArray = stupidAssList
    //     setSelectedVan(van)
    //     localArray.forEach( (vanEle, vanEleId) => {
    //         if (vanEle.key === van.registration) {
    //             localArray[vanEleId] = (
    //                 <div key={van.registration}>
    //                     <h3 className='h3_for_compliance_Page_colored' onClick={(e, theVan) => handleVanNameClick(e, van)}>
    //                         {van.registration} {van.model} {van.make}
    //                     </h3>
    //                     <br />
    //                 </div>
    //             )
    //         }
    //     })
    //     setNonDriverVans([localArray])
    // }

    // useEffect( () => {
    //     let localArray = []
    //     let localArrayIDeD = []
    //     if (vanList) {
    //         vanList.forEach( (van, vanID) => {
    //             if (van.driver_id === null) {
    //                 localArray.push(
    //                     <div key={van.registration}>
    //                         <h3 className='h3_for_compliance_Page' onClick={(e, theVan) => handleVanNameClick(e, van)}>
    //                             {van.registration} {van.model} {van.make}
    //                         </h3>
    //                         <br />
    //                     </div>
    //                 )
    //             } else {
    //                 let myDriverName = ''
    //                 let myVanNum = parseInt(van.driver_id.match(/\d/))
    //                 data.drivers.forEach( driver => {
    //                     if (parseInt(driver.driver_id) === myVanNum) {
    //                         myDriverName = driver.name
    //                     }
    //                 })
    //                 localArrayIDeD.push(
    //                     <div key={van.registration}>
    //                         <h3 className='h3_for_compliance_Page' onClick={(e, theVan) => handleVanNameClick(e, van)}>
    //                             {van.registration} {van.model} {van.make} - {myDriverName}
    //                         </h3>
    //                         <br />
    //                     </div>
    //                 )
    //             }
    //         })
    //     }
    //     setIdVans(localArrayIDeD)
    //     setNonDriverVans(localArray)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     stupidAssList = localArray
    // }, [vanList])