import { MdOutlineCancel } from "react-icons/md"
import { BsCheck } from "react-icons/bs"
import { TooltipComponent } from "@syncfusion/ej2-react-popups"

import { themeColors } from "../data/dummy"
import { useStateContext } from "../contexts/ContextProvider"


const ThemeSettings = () => {


    const { setColor, setMode, currentMode, currentColor, setThemeSettings } = useStateContext()

    return (
        <div style={{ display: 'flex', justifyConent: 'flex-end', width: '100%', background: 'rgba(0,0,0,0.5)' }} className=" fixed right-0  ">

            <div className="float-right h-screen z-55 dark:text-gray-200 bg-white dark:bg-[#484852] w-360 " > {/* ****** */}

                <div className="flex justify-between items-center p-4 ml-4" >
                    <p className="font-semibold text-xl" >Settings</p>
                    <button
                        type="button"
                        onClick={() => setThemeSettings(false)}
                        style={{ color: `rgb(153,171,180)`, borderRadius: '50%' }}
                    >
                        <MdOutlineCancel className="text-[3rem] p-2 hover:drop-shadow-xl hover:bg-light-gray " />
                    </button>
                </div>



                <div className="flex-col border-t-1 border-color p-4 ml-4 " >
                    <p className="font-semibold text-lg" >Theme Options</p>
                    <div className="mt-4" >
                        <input
                            type="radio"
                            id="light"
                            name="theme"
                            value="Light"
                            className="cursor-pointer"
                            onChange={setMode}
                            checked={currentMode === 'Light'}
                        />
                        <label htmlFor="light" className="ml-2 text-md cursor-pointer" >
                            Light
                        </label>
                    </div>
                    <div className="mt-4" >
                        <input
                            type="radio"
                            id="dark"
                            name="theme"
                            value="Dark"
                            className="cursor-pointer"
                            onChange={setMode}
                            checked={currentMode === 'Dark'}
                        />
                        <label htmlFor="dark" className="ml-2 text-md cursor-pointer" >
                            Dark
                        </label>
                    </div>
                </div>


                <div className="flex-col border-t-1 border-color p-4 ml-4 " >
                    <p className="font-semibold text-lg" >Theme Colors</p>
                    <div className='flex gap-3 ' >
                        {
                            themeColors.map((item, index) => (
                                <TooltipComponent key={index} position="TopCenter" content={item.name} >
                                    <div className="relative flex mt-2 cursor-pointer gap-5 items-center " >
                                        <button
                                            type='button'
                                            style={{ backgroundColor: item.color }}
                                            onClick={() => setColor(item.color)}
                                            className="h-10 w-10 rounded-full cursor-pointer flex justify-center items-center "
                                        >
                                            {console.log("item current", item.color == currentColor)}
                                            <BsCheck style={{ display: item.color == currentColor ? 'block' : 'hidden' }} className={`ml-2 text-2xl text-white `} />
                                        </button>
                                    </div>
                                </TooltipComponent>
                            ))
                        }
                    </div>
                </div>


            </div>


        </div>
    )
}

export default ThemeSettings
