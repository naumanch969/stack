import { Cancel, ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useState, } from 'react'

import { limitText } from "../../../../../utils/functions/function";

const AutoCompelete = ({ Array, attribute }) => {

    //////////////////////////// VARIABLES ////////////////////////////////////

    //////////////////////////// STATES ///////////////////////////////////////
    const [show, setShow] = useState({ months: false, days: false, dates: false })
    const [selectedTags, setSelectedTags] = useState({ months: [], days: [], dates: [] })

    //////////////////////////// USE EFFECTS //////////////////////////////////



    //////////////////////////// FUNCTIONS /////////////////////////////////////
    const toggleAutoComplete = () => {
        setShow({ ...show, [attribute]: !show[attribute] })
    }
    const filterTag = (tagToDelete) => {
        selectedTags[attribute] = selectedTags[attribute].filter(tag => tag !== tagToDelete)
        setSelectedTags({ ...selectedTags })
    }
    const addTag = (value) => {
        if (!value.trim()) return
        const isAlreadyAdded = selectedTags[attribute].find(element => element == value)
        if (!isAlreadyAdded) {
            selectedTags[attribute] = [...selectedTags[attribute], value]
            setSelectedTags({ ...selectedTags })
        }
    }


    const Tag = ({ title, filterFunction }) => (
        <div className="w-fit flex gap-2 items-center justify-between rounded-[15px] py-[3px] px-[7px] bg-purple-900 " >
            <span className="text-purple-100 capitalize text-[12px] " >{limitText(title, 3)}</span>
            <Cancel onClick={() => filterFunction(title)} style={{ fontSize: '12px' }} className={`cursor-pointer text-purple-100 text-[12px] bg-purple-900 rounded-full `} />
        </div>
    )

    return (
        <div className="relative w-[15rem] min-h-[30px] bg-gray rounded-[4px] border-[1px] border-purple-500 " >
            {/* select */}
            <div className="flex w-full p-[4px] " >
                {
                    selectedTags[attribute].length
                        ?   // when there is atleast one month/date/day is selected
                        <div className="w-full flex justify-between items-center " >
                            <div className="flex flex-wrap gap-[4px] " >
                                {selectedTags[attribute].map((tag, index) => (
                                    <div className="" >
                                        <Tag title={tag} filterFunction={filterTag} key={index} />
                                    </div>
                                ))}
                            </div>
                            <button onClick={toggleAutoComplete} className="h-[30px] w-[30px] flex justify-center items-center rounded-[2px] border-[1px] border-purple-500 text-purple-500 " >{show[attribute] ? <ArrowUpward /> : <ArrowDownward />}</button>
                        </div>
                        :   // when there is no month/date/day is selected
                        <div className="w-full flex justify-between items-center " >
                            <span className="h-full flex items-center text-purple-300 capitalize " >{attribute}</span>
                            <button onClick={toggleAutoComplete} className="h-[30px] w-[30px] flex justify-center items-center rounded-[2px] border-[1px] border-purple-500 text-purple-500 " >{show[attribute] ? <ArrowUpward /> : <ArrowDownward />}</button>
                        </div>
                }
            </div>
            {/* options */}
            <div className="absolute w-full bg-gray z-50 " >
                {
                    show[attribute] &&
                    <div className="w-full border-[1px] border-purple-500 rounded-[4px] " >
                        {
                            Array(12).fill('').map((_nothing, index) => (
                                <span
                                    onClick={() => { selectedTags[attribute].findIndex(m => m == Array[index]) != -1 ? filterTag(Array[index]) : addTag(Array[index]) }}
                                    className={`${selectedTags[attribute].findIndex(m => m == Array[index]) != -1 && 'bg-purple-900 '} bg-gray hover:bg-purple-900 text-purple-300 py-[3px] px-[5px] ml-[4px] rounded-[2px] flex items-center cursor-pointer `} >
                                    {Array[index]}
                                </span>
                            ))
                        }
                    </div>
                }
            </div>


        </div >
    );
}

export default AutoCompelete








