import Form from "./Form"
import Activities from "./Activities"
import { useStateContext } from "../../contexts/ContextProvider"
import moment from 'moment-timezone'
import { Modal } from '@mui/material'
import { useState, useEffect } from "react"
import Buttons from "./Buttons"
import Filters from "./Filters"
import Confirm from "./Confirm"
import UpdateForm from "./UpdateForm"
import Navigation from "./Navigation"
import { useDispatch, useSelector } from "react-redux"
import { getUserActivities, createActivity, updateLink, deleteLink, updateHeading } from "../../actions/activity"

const ActivityPage = () => {
    const { activityState, setActivityState, resetedActivityData, showActivityForm,
        userState,
        headingRef, linkRef,
        TLHeadingValue,
        TLLinkValue,
        currentYear, currentMonth
    } = useStateContext()

    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const { result } = useSelector(state => state.activity)
    const dispatch = useDispatch()
    const isLeapYear = currentYear % 4 == 0 ? true : false
    const monthLength = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const user = userState.user.result

    const newProperties = { height: `auto`, showTextAreaOptions: false, showLinkInput: false, clickedLink: { link: ``, _id: `` }, showHeadingInput: false, clickedHeading: ``, showTextArea: false, TLTextValue: `` }

    // signUp Time
    let { result: { signUpDate, loginDate } } = userState.user
    let signUpTimeObj = { year: (loginDate || signUpDate)?.year, month: (loginDate || signUpDate)?.month, day: (loginDate || signUpDate)?.date, hour: (loginDate || signUpDate)?.hour, minute: (loginDate || signUpDate)?.minute, second: (loginDate || signUpDate)?.second }
    let signUpTime = moment.tz(signUpTimeObj, moment.tz.guess())        // (obj, timezone)
    let signUpActualDate = signUpTime.date()                            // Number
    // last time - last time the user visit the website
    let lastDate = (activityState.activityArr[activityState.activitiesLength - 1]?.date)            // 12
    let lastTimeObj = { year: lastDate?.year, month: lastDate?.month, day: lastDate?.date, hour: lastDate?.hour, minute: lastDate?.minute, second: lastDate?.second }
    let lastTime = moment.tz(lastTimeObj, moment.tz.guess())
    let lastActualDate = lastTime.date()                                // Number
    // current time
    let currentTime = moment.tz(moment.tz.guess())
    let currentActualDate = currentTime.date()                          // Number

    let daysPassed = currentActualDate - (signUpActualDate || lastActualDate)

    if (daysPassed < 0) {
        monthLength[currentMonth] - (signUpActualDate || lastActualDate) + currentActualDate
    }

    console.log()



    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
    const [diff, setDiff] = useState(daysPassed + 1 - activityState.activitiesLength)



    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

    useEffect(() => {
        dispatch(getUserActivities())
    }, [user])
    useEffect(() => {
        setDiff(daysPassed + 1 - result.length)
        let updatedArr = result.map((act) => {
            return {
                ...act,
                activity: act.activity.map((timeLapse) => { return { ...timeLapse, ...newProperties } })
            }
        })
        setActivityState({
            ...activityState,
            activitiesLength: result.length,
            activityData: updatedArr[0],
            activityArr: updatedArr
        })
    }, [result, user])
    useEffect(() => {
        const initialArray = activityState.activityArr
        const uniqueActivities = initialArray.filter((item, index, self) =>          // here self = initialArray
            index === self.findIndex((t) => (
                t.date?.date === item.date?.date
            ))
        );
        setActivityState({
            ...activityState,
            activityArr: uniqueActivities.map((act) => {
                return {
                    ...act,
                    activity: act.activity.map((timeLapse) => {
                        return { ...timeLapse, ...newProperties }
                    })
                }
            })
        })



        if (diff > 0) {
            Array(diff).fill("").map((_nothing, index) => {
                let thisDate = moment(lastTime).add(index, `days`)
                var obj = {
                    ...resetedActivityData,
                    date: {
                        ...resetedActivityData.date,
                        date: thisDate?.date(),
                        month: thisDate?.month(),
                        year: thisDate?.year(),
                        day: thisDate?.day(),
                        hour: thisDate?.hour(),
                        minute: thisDate?.minute(),
                        second: thisDate?.second(),
                    }
                }
                dispatch(createActivity(obj))

            })
            alert(`
            ${lastActualDate > signUpActualDate ? `lastDate=${lastActualDate}` : `signUpActualDate${signUpActualDate}`} 
            daysPassed=${daysPassed} 
            activitiesLength=${activityState.activitiesLength}
            diff=${diff} 
            `)
        }
        else if (diff == 0) {
            // do nothing. 
            // alert(`
            // ${lastActualDate > signUpActualDate ? `lastDate=${lastActualDate}` : `signUpActualDate${signUpActualDate}`} 
            // daysPassed=${daysPassed} 
            // activitiesLength=${activityState.activitiesLength}
            // diff=${diff} 
            // `)
        }
        else {
            // filhal do nothing
            // alert(`
            // ${lastActualDate > signUpActualDate ? `lastDate=${lastActualDate}` : `signUpActualDate${signUpActualDate}`} 
            // daysPassed=${daysPassed} 
            // activitiesLength=${activityState.activitiesLength}
            // diff=${diff} 
            // `)
        }
    }, [user])


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////

    const handleClick = (event) => {
        if (headingRef.current && !headingRef.current.contains(event.target)) {
            changeHeading(TLHeadingValue)
        }
        if (linkRef.current && !linkRef.current.contains(event.target)) {
            changeLink(TLLinkValue)
        }

    }
    // heading of each time lapse
    const changeHeading = (editedHeading) => {

        activityState.activityData.activity.map((timeLapse) => {
            if (activityState.focusedTimeLapse == timeLapse.time) {
                // deleting previously exist heading
                if (timeLapse.clickedHeading._id) {
                    const findedTimeLapse = activityState.activityData.activity.find((time) => time.time == timeLapse.time)     // 
                    findedTimeLapse.heading = editedHeading
                    findedTimeLapse.clickedHeading = ''
                    dispatch(updateHeading(activityState.activityData._id, { timeLapseId: timeLapse._id, heading: editedHeading }))                   // (activityId, {timeLapseId, headng})
                }
                // heading was not exist previously.
                else {
                    timeLapse.showHeadingInput = false
                }
            }
        })
        setActivityState({
            ...activityState,
            activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
        })

    }
    // link of each time lapse
    const changeLink = (editedLink) => {
        // deleting link
        if (editedLink.length == 0) {
            activityState.activityData.activity.map((timeLapse) => {
                if (activityState.focusedTimeLapse == timeLapse.time) {
                    // deleting previously exist link
                    if (timeLapse.clickedLink._id) {
                        const findedTimeLapse = activityState.activityData.activity.find((time) => time.time == timeLapse.time)     // 
                        findedTimeLapse.links = findedTimeLapse.links.filter((li) => li.link !== timeLapse.clickedLink.link)
                        let activityId = activityState.activityData._id
                        dispatch(deleteLink(activityId, { timeLapseId: findedTimeLapse._id, linkId: timeLapse.clickedLink._id }))                  // (activityId, {timeLapseId, linkId})
                        findedTimeLapse.clickedLink = { link: ``, _id: `` }
                    }
                    // link was not exist previously.
                    else {
                        timeLapse.showLinkInput = false
                    }
                }
            })
            setActivityState({
                ...activityState,
                activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
            })
        }
        // adding || updating link
        else {
            activityState.activityData.activity.map((timeLapse) => {
                if (activityState.focusedTimeLapse == timeLapse.time) {
                    const findedTimeLapse = activityState.activityData.activity.find((time) => time.time == timeLapse.time)     // 
                    let index = findedTimeLapse.links.findIndex((li) => li.link == timeLapse.clickedLink.link)
                    findedTimeLapse.links[index].link = editedLink

                    let obj = { timeLapseId: findedTimeLapse._id, link: editedLink, linkId: timeLapse.clickedLink._id }
                    let activityId = activityState.activityData._id
                    dispatch(updateLink(activityId, obj))                  // (activityId, {timeLapseId, headng})

                    findedTimeLapse.clickedLink = false
                }
            })
            setActivityState({
                ...activityState,
                activityData: { ...activityState.activityData, activity: [...activityState.activityData.activity] }
            })
        }
    }

    const handleModalClose = () => {
        setActivityState({
            ...activityState,
            openActivityModal: false,
            openActAccordForUpdate: false
        })
    }





    return (
        <div onClick={handleClick} className="w-full h-full flex flex-col items-center justify-center  " >


            <div style={{ width: '88%' }} className={`w-[88%] mt-[2rem] pb-[2rem] flex flex-col items-center  `} >

                <div style={{ marginBottom: '2rem' }} className={`w-full mb-[3rem] `} >
                    <Filters />
                </div>


                <div style={{ marginBottom: '2rem' }} className={`w-full mb-[3rem] `} >
                    <Navigation />
                </div>
                {
                    showActivityForm &&
                    <div className={`w-full `} >
                        <Confirm />
                    </div>
                }
                <div className={`w-full `} >
                    {
                        showActivityForm
                            ?
                            <Form />
                            :
                            <>
                                <Buttons />
                                <Activities />
                            </>
                    }
                </div>





                {/* modal */}
                <Modal open={activityState.openActivityModal} onClose={handleModalClose} >

                    <UpdateForm />

                </Modal>


            </div>


        </div>
    )
}

export default ActivityPage;