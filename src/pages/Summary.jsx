import React, { useEffect, useState} from 'react'
import NavigationBar from '../components/NavBar'

const Summary = () => {
    const [ invoiceData, setInvoiceData ] = useState(null)
    const [ allDates, setAllDates ] = useState(null)
    const [ summaryArray, setSummaryArray ] = useState([])
    const [ mathSunday, setMathSunday ] = useState('14')
    const [ sunday, setSunday ] = useState(new Date())

    // eslint-disable-next-line no-extend-native
    Date.prototype.getWeek = function () {
        var firstDate = new Date(this.getFullYear(), 0, 1)
        return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - firstDate) / 86400000) + firstDate.getDay() + 1) / 7)
    }

    // get sundays
    const getSundays = () => {
        let sundays = []
        let currentDate = new Date(mathSunday)
        for (let i = 0; i < 7; i++) {
            let dateInner = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            if (dateInner.getDay() === 0) {
                setSunday(dateInner)
            }
        }
    }

    useEffect( () => {
        if (mathSunday) {
            getSundays()
        }
    }, [mathSunday])

    useEffect( () => {
        let myDate = new Date()
        while (myDate.getDay() > 0) {
            myDate.setDate(myDate.getDate() - 1)
        }
        setMathSunday(myDate.toDateString())
        async function getData(url = '') {
            const response = await fetch(url, {
                method: 'GET', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            return response ? response.json() : console.log('no reponse')

        };

        getData('https://pythonicbackend.herokuapp.com/invoices/').then( (response) => {
            setInvoiceData(response.data.myOneWeekArray)
            setAllDates(response.data.datesList)
        }) 
    }, [])

    useEffect( () => {
        let myObj = {
            '0': 0.0,
            'Full Standard Van Route': 121.8,
            'Full Large Van Route': 141.8,
            'Transportation Route': 100,
            'MFN Route': 70,
            'Missort Route': 121.8,
            'Classroom Training': 75,
            'Ride Along': 75,
            'Sweeper': 121.8
        }
        let localArray = []
        let dateArray = [
            new Date(sunday.setDate(sunday.getDate())).toLocaleDateString(),
            new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString(),
            new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString(),
            new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString(),
            new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString(),
            new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString(),
            new Date(sunday.setDate(sunday.getDate() + 1)).toLocaleDateString(),
        ]
        if (invoiceData && allDates) {
            console.log(invoiceData, allDates)
            localArray.push(
                <div className='top_labels_summary'>
                    <div className='label_boxes_summary_name_top'>
                        <h3>Name</h3>
                    </div>
                    <div className='label_boxes_summary_top'>
                        {dateArray[0]}
                    </div>
                    <div className='label_boxes_summary_top'>
                        {dateArray[1]}
                    </div>
                    <div className='label_boxes_summary_top'>
                        {dateArray[2]}
                    </div>
                    <div className='label_boxes_summary_top'>
                        {dateArray[3]}
                    </div>
                    <div className='label_boxes_summary_top'>
                        {dateArray[4]}
                    </div>
                    <div className='label_boxes_summary_top'>
                        {dateArray[5]}
                    </div>
                    <div className='label_boxes_summary_top'>
                        {dateArray[6]}
                    </div>
                    <div className='label_boxes_summary_top_end'>
                        Total
                    </div>
                    <div className='label_boxes_summary_top_end'>
                        Mileage (GB£0.17/mile)
                    </div>
                    <div className='label_boxes_summary_top_end'>
                        Deductions
                    </div>
                    <div className='label_boxes_summary_top_end'>
                        Support
                    </div>
                    <div className='label_boxes_summary_top_end'>
                        Overall
                    </div>
                </div>
            )
            for (const key in invoiceData) {
                let countArray = [
                    0,0,0,0,0,0,0,0
                ]
                let myHoverArray = [
                    <div className='summary_hover_div'><h3>none</h3></div>,
                    <div className='summary_hover_div'><h3>none</h3></div>,
                    <div className='summary_hover_div'><h3>none</h3></div>,
                    <div className='summary_hover_div'><h3>none</h3></div>,
                    <div className='summary_hover_div'><h3>none</h3></div>,
                    <div className='summary_hover_div'><h3>none</h3></div>,
                    <div className='summary_hover_div'><h3>none</h3></div>,
                    <div className='summary_hover_div'><h3>none</h3></div>,
                ]
                allDates.forEach( (date, DateID) => {
                    if (date.driver_id === key) {
                        countArray[dateArray.indexOf(new Date(date.date).toLocaleDateString())]++
                        myHoverArray[dateArray.indexOf(new Date(date.date).toLocaleDateString())] = (
                            <div className='summary_hover_div_full'>
                                <h3>{myObj[date.route]}</h3>
                            </div>
                        )
                    } 
                })
                console.log(invoiceData[key]['deduction'].substr(3, invoiceData[key]['deduction'].length))
                localArray.push(
                    <div className='top_labels_summary'>
                        <div className='label_boxes_summary_name'>
                            <h3>{key}</h3>
                        </div>
                        <div className='label_boxes_summary'>
                            <h3>{countArray[0]}</h3>
                            {myHoverArray[0]}
                        </div>
                        <div className='label_boxes_summary'>
                            <h3>{countArray[1]}</h3>
                            {myHoverArray[1]}
                        </div>
                        <div className='label_boxes_summary'>
                            <h3>{countArray[2]}</h3>
                            {myHoverArray[2]}
                        </div>
                        <div className='label_boxes_summary'>
                            <h3>{countArray[3]}</h3>
                            {myHoverArray[3]}
                        </div>
                        <div className='label_boxes_summary'>
                            <h3>{countArray[4]}</h3>
                            {myHoverArray[4]}
                        </div>
                        <div className='label_boxes_summary'>
                            <h3>{countArray[5]}</h3>
                            {myHoverArray[5]}
                        </div>
                        <div className='label_boxes_summary'>
                            <h3>{countArray[6]}</h3>
                            {myHoverArray[6]}
                        </div>
                        <div className='label_boxes_summary_end'>
                            {`GB£${parseInt(invoiceData[key]['route'])}`}
                        </div>
                        <div className='label_boxes_summary_end'>
                            {`GB£${parseInt(invoiceData[key]['mileage'])}`}
                        </div>
                        <div className='label_boxes_summary_end'>
                            {invoiceData[key]['deduction']}
                        </div>
                        <div className='label_boxes_summary_end'>
                            {invoiceData[key]['support']}
                        </div>
                        <div className='label_boxes_summary_end'>
                            {`GB£${
                            parseInt(invoiceData[key]['route']) - 
                            parseInt(invoiceData[key]['deduction'].substr(3, invoiceData[key]['deduction'].length)) + 
                            parseInt(invoiceData[key]['support'].substr(3, invoiceData[key]['support'].length)) +
                            parseInt(invoiceData[key]['mileage'].substr(3, invoiceData[key]['mileage'].length))
                            }`}
                        </div>
                    </div>
                )
            }
        }
        setSummaryArray(localArray)
    }, [invoiceData, allDates])

    return (
        <div className='home_content'>
            <NavigationBar title='Summary'/>
            <div className='main_content_driver_documents'>
                <div className='summary_data'>
                    {summaryArray}
                </div>
            </div>
        </div>
    )
}

export default Summary