import { useStateContext } from "../../../../contexts/ContextProvider"
import { useDispatch } from "react-redux"
import { Switch, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import { GridViewRounded, TableRows } from "@mui/icons-material"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const Buttons = () => {
    const { activityState, setActivityState, Months, Days, currentYear, currentMonth, currentDate } = useStateContext()

    //////////////////////////// VARIABLES ////////////////////////////////////
    const dispatch = useDispatch()
    const colors = ['652826', '0c3b5f', '245a24', '655d1a', '3b3f43', '492e18', '674917', '47265d', '00514c', '16565f', '641e43']

    //////////////////////////// STATES ////////////////////////////////////
    const [dateValue, setDateValue] = useState({ from: '', to: '' })


    //////////////////////////// USE EFFECTS ////////////////////////////////////


    //////////////////////////// FUNCTIONS ////////////////////////////////////

    const timeLapsesChange = () => {
        setActivityState({
            ...activityState,
            filters: { ...activityState.filters, timeLapses: !activityState.filters.timeLapses }
        })
    }
    const mediaChange = () => {
        setActivityState({
            ...activityState,
            filters: { ...activityState.filters, media: !activityState.filters.media }
        })
    }
    const textChange = () => {
        setActivityState({
            ...activityState,
            filters: { ...activityState.filters, text: !activityState.filters.text }
        })
    }
    const lastDaysChange = () => {
        setActivityState({
            ...activityState,
            filters: { ...activityState.filters, lastDays: !activityState.filters.lastDays }
        })
    }
    const lastWeekChange = () => {
        setActivityState({
            ...activityState,
            filters: { ...activityState.filters, lastWeek: !activityState.filters.lastWeek }
        })
    }
    const lastYearChange = () => {
        setActivityState({
            ...activityState,
            filters: { ...activityState.filters, lastMonth: !activityState.filters.lastMonth }
        })
    }
    const customChange = () => {
        setActivityState({
            ...activityState,
            filters: { ...activityState.filters, custom: !activityState.filters.custom }
        })
    }
    const handleFrom = (value) => {
        console.log('value', value)
        // let arr = e.target.value.split('-')
        // let year = arr[1]
        // let date = arr[2]
        // let month = arr[3]
        // setDateValue({ ...dateValue, from: { date, month, year } })
    }
    const handleTo = (e) => {
        let arr = e.target.value.split('-')
        let year = arr[1]
        let date = arr[2]
        let month = arr[3]
        setDateValue({ ...dateValue, to: { date, month, year } })
    }
    const [value, setValue] = useState('2014-08-18');

    const handleChange = (newValue) => {
        setValue(newValue);
    };


    return (
        <div className="w-full flex flex-col justify-between items-end gap-[8px] mb-[4px] " >

            <div className="w-full flex justify-between " >
                <div className="" >
                    <span className="flex justify-between items-center text-white  " >
                        <p>Time Lapses</p>
                        <Switch name="timeLapses" checked={activityState.filters.timeLapses} onChange={timeLapsesChange} />
                    </span>
                    <span className="flex justify-between items-center text-white  " >
                        <p>Media</p>
                        <Switch name="media" checked={activityState.filters.media} onClick={mediaChange} />
                    </span>
                    <span className="flex justify-between items-center text-white  " >
                        <p>Text</p>
                        <Switch name="text" checked={activityState.filters.text} onChange={textChange} />
                    </span>
                </div>

                <div className="" >
                    <span className="flex justify-between items-center text-white  " >
                        <p>Last 3 Days</p>
                        <Switch checked={activityState.filters.lastDays} onChange={lastDaysChange} />
                    </span>
                    <span className="flex justify-between items-center text-white  " >
                        <p>Last Week</p>
                        <Switch checked={activityState.filters.lastWeek} onChange={lastWeekChange} />
                    </span>
                    <span className="flex justify-between items-center text-white  " >
                        <p>Last Month</p>
                        <Switch checked={activityState.filters.month} onChange={lastYearChange} />
                    </span>
                </div>

                <div className="" >
                    <span className="flex justify-between items-center text-white  " >
                        <p>Custom</p>
                        <Switch checked={activityState.filters.custom} onChange={customChange} />
                    </span>
                    {activityState.filters.custom &&
                        <div className="flex flex-col justify-between items-center gap-[10px] text-white  " >
                            <span className="" >
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/DD/YYYY"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </span>
                            <span className="" >

                            </span>
                        </div>
                    }
                </div>
            </div>

            <div className="flex justify-between items-center gap-[1rem] " >
                <p className="font-medium text-purple-300 " >View By</p>
                <div style={{ padding: '2px', gap: '4px' }} className="flex justify-center items-center   p-[2px] gap-[4px]  " >
                    <button onClick={() => setActivityState({ ...activityState, isGridView: true })} className={`hover:bg-purple-600 text-purple-100 rounded-[4px] ${activityState.isGridView && 'bg-purple-600'} `} ><GridViewRounded className="text-[30px]" style={{ fontSize: '30px' }} /></button>
                    <button onClick={() => setActivityState({ ...activityState, isGridView: false })} className={`hover:bg-purple-600 text-purple-100 rounded-[4px] ${!activityState.isGridView && 'bg-purple-600'} `} ><TableRows className="text-[30px]" style={{ fontSize: '30px' }} /></button>
                </div>
            </div>

        </div>
    )
}


export default Buttons