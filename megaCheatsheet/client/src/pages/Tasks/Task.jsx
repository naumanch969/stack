import { task } from "../../assets"
import { TableRows, GridViewRounded, Add, Circle } from '@mui/icons-material'
import { useStateContext } from "../../contexts/ContextProvider"

const Task = ({ taskObj, title, task, uploadedImages, status, createdAt, updatedAt, favourite, bg, gridRowEnd }) => {

    // const { currentHour, currentMinute, currentSecond, currentDate, currentDay, currentMonth, currentYear } = createdAt

    const handleUpdateButtonClick = () => {
        // setTaskState({ ...taskState, openTaskModal: true , taskData:{title, task,  uploadedImages, status, } })
    }

    return (
        <div style={{ fontFamily: "monospace ", background: `#${bg.hex}`, width: '17rem' }} className="flex flex-col my-1 gap-[6px] border-[1px] border-gray-500 text-gray-100 p-[10px] rounded-[6px] text-black " >

            <div className="rounded-inherit " >
                <img src={uploadedImages[0]?.url} className="rounded-inherit " />
            </div>

            <div className="w-full flex justify-between items-center  my-[3px] " >
                <h6 className="flex jstify-center items-center gap-[4px] capitalize text-[12px] " >
                    <Circle style={{ fontSize: '9px' }} className="text-[9px] " />
                    <span className="text-[18px] " >{status}</span>
                </h6>
                <button onClick={handleUpdateButtonClick} className="" > <Add style={{ fontSize: "16px" }} className="text-[16px] " /></button>
            </div>

            <h4 className="capitalize text-[20px] font-bold " >{title}</h4>

            <p style={{ marginBottom: '2px' }} className="capitalize text-[12px] mb-[2px] " >{task}</p>

            {/* <p className="text-[10px] border-[1px] w-fit px-[6px] py-[2px] text-center rounded-[3px] " >{currentDate} {currentMinute}, {currentYear} ,{currentHour}:{currentMinute}</p> */}

        </div>
    )
}

export default Task;
