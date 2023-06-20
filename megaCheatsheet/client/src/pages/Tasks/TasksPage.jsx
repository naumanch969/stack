import { task } from "../../assets"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TableRows, GridViewRounded } from '@mui/icons-material'
import { useStateContext } from "../../contexts/ContextProvider"
import Form from "./Form"
import TaskCard from "./Task"
import { getTasks } from "../../actions/task"


import "./tasks.css"

const TasksPage = () => {
    const { currentDate, currentMonth, currentYear, taskState, setTaskState } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const { result, isLoading, isError, error } = useSelector(state => state.task)
    const dispatch = useDispatch()

    // test array
    const span = [
        'span 26',
        'span 45',
        'span 33',
    ]


    const tasksArr = [
        {
            title: "design system 0",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: task },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 1",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 2",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 3",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: task },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 4",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 5",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 6",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 7",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 8",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 0",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: task },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 1",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 2",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 3",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: task },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 4",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 5",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 6",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 7",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
        {
            title: "design system 8",
            task: "lorem ipsum dollar yildk filed jokie loridnesed aghaineidnek goikned lorem ipsum dloar soldu doelane fokdit",
            uploadedImages: { file: {}, url: "url" },
            status: "completed",
            bg: { color: "gray-900", hex: "202124" },
            createdAt: `${currentDate} ${currentMonth}, ${currentYear}`,
            updatedAt: "",
            favourite: true,
        },
    ]


    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getTasks())
    }, [])
    useEffect(() => {
        setTaskState({ ...taskState, tasksArr: result })
    }, [result])

    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const generateRandom = (from, to) => {
        let random = Math.floor(Math.random() * to) + from    // random from 1 to 10
        return random
    }



    /////////////////////////////////////////////////////////////// Actual Component ////////////////////////////////////////////////////////////////////////
    return (
        <div style={{ background: '#202124' }} className="w-full px-[3rem] " >





            <Form />





            {/* task buttons */}
            <div className="flex justify-between items-center border-b-gray-300 border-b-[1px] pb-[10px] " >
                <div style={{ gap: '20px' }} className="flex items-center gap-[20px] " >
                    <button className="font-medium hover:text-gray-100 text-gray-300 " >Active tasks(34)</button>
                    <button className="font-medium hover:text-gray-100 text-gray-300 " >Favourite(13)</button>
                    <button className="font-medium hover:text-gray-100 text-gray-300 " >Completed(8)</button>
                </div>
                <div className="flex justify-between items-center gap-[1rem] " >
                    <p className="font-medium text-gray-300 " >View By</p>
                    <div style={{ padding: '2px', gap: '4px' }} className="flex justify-center items-center bg-gray-400 p-[2px] gap-[4px] rounded-[3px] " >
                        <button className="hover:bg-gray-100 text-gray-900 " ><GridViewRounded className="" /></button>
                        <button className="hover:bg-gray-100 text-gray-900 " ><TableRows className="" /></button>
                    </div>
                </div>
            </div>

            {/* <div xs={12} sm={6} md={4} lg={3} item key={index} > */}
            <div
                className="flex justify-between flex-wrap "
                style={{
                    width: '100%',
                    padding: '20px 10px',
                    // display: 'grid',
                    // gridTemplateColumns: 'repeat(auto-fill, 250px)',
                    // gridColumnGap: '10px',
                    // gridAutoRows: 'auto',
                }}
            >

                {
                    taskState.tasksArr.map((task, index) => (
                        <TaskCard
                            // gridRowEnd={span[generateRandom(0, 3)]}
                            key={index}
                            tasKObj={task}
                            title={task.title}
                            task={task.task}
                            uploadedImages={task.uploadedImages}
                            status={task.status}
                            bg={task.bg}
                            createdAt={task.createdAt}
                            updatedAt={task.updatedAt}
                            favourite={task.favourite}
                        />
                    ))
                }
                <div />

            </div>
        </div >
    )
}

export default TasksPage;




// date: { date: currentDate, month: currentMonth, year: currentYear, hour: currentHour, minute: currentMinute, second: currentSecond }
