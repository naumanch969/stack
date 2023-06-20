import { BsCurrencyDollar } from "react-icons/bs"
import { GoPrimitiveDot } from "react-icons/go"
import { Stacked, Pie, Button, SparkLine } from "../components"
import { earningData, SparklineAreaData, ecomPieChartDat } from "../data/dummy"
import { useStateContext } from "../contexts/ContextProvider"

const Ecommerce = () => {

    const { activeMenu, currentColor } = useStateContext()

    return (
        <div className="mt-12" >

            {/* first section */}
            <div className="flex flex-wrap lg:flex-nowrap justify-cetner  " >

                {/* first block having background image */}
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center  " >
                    {/* text */}
                    <div className="flex justify-between items-cetner" >
                        <div>
                            <p className="font-bold text-gray-400" >Earnings</p>
                            <p className="text-2xl" >$63,435.44</p>
                        </div>
                    </div>
                    {/* download button */}
                    <div className="mt-6 " >
                        <Button
                            size="md"
                            color="white"
                            bgColor={currentColor}
                            text="Download"
                            borderRadius="10px" >
                        </Button>
                    </div>
                </div>


                {/* four buttons */}
                <div className="flex m-3 flex-wrap justify-center gap-1 w-full items-center" >
                    {
                        earningData.map((item) => (
                            <div key={item.title} className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-6 rounded-2xl"  >
                                <button
                                    type="button"
                                    style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                                    className="text-2xl opacity-0.9 rounded-full p-3 hover:drop-shadow-xl "
                                >
                                    {item.icon}
                                </button>
                                <p className="mt-1" >
                                    <span className="text-lg font-semibold" >{item.amount}</span>
                                    <span className={`text-sm text-${item.pcColor} ml-1 `} >{item.percentage}</span>
                                </p>
                                <p className="text-sm text-gray-400 mt-1 " >{item.title}</p>
                            </div>
                        ))
                    }
                </div>

            </div>



            {/* graphs */}
            <div className="flex gap-10 flex-wrap justify-center " >
                {/* headings and heading bar */}
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780 " >

                    {/* heading line of graph */}
                    <div className="flex justify-between " >
                        <p className="font-semibold text-xl" > Revenue Updates</p>
                        <div className="flex items-center gap-4  " >
                            <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl" >
                                <span><GoPrimitiveDot /></span>
                                <span>Expense</span>
                            </p>
                            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl" >
                                <span><GoPrimitiveDot /></span>
                                <span>Budget</span>
                            </p>
                        </div>
                    </div>

                    {/* charts */}
                    <div className="mt-10 flex gap-10 flex-wrap justify-center" >

                        <div className="border-r-1 border-color m-4 pr-10 " >
                            {/* budget - small block */}
                            <div>
                                <p>
                                    <span className="text-3xl font-semibold " >$93,483</span>
                                    <span className="p-1.5 hover:drop-shadow-xl rounded-full cursor-pointer text-white bg-green-400 ml-3 " >23%</span>
                                </p>
                                <p className="text-gray-500 mt-1">Budget</p>
                            </div>
                            {/* expense - small block */}
                            <div className="mt-5" >
                                <p>
                                    <span className="text-3xl font-semibold " >$48,83</span>
                                </p>
                                <p className="text-gray-500 mt-1">Expense</p>
                            </div>
                            {/* sparkline chart */}
                            <div className="mt-5 " >
                                <SparkLine
                                    currentColor={currentColor}
                                    id="line-sparkline"
                                    type="Line"
                                    height="80px"
                                    width="250px"
                                    data={SparklineAreaData}
                                    color={currentColor}
                                />
                            </div>
                            {/* download report button */}
                            <div className="mt-10" >
                                <Button
                                    color="white"
                                    bgColor={currentColor}
                                    text="Download Report"
                                    borderRadius="10px"
                                />
                            </div>
                        </div>

                        {/* stacked chart */}
                        <div>
                            <Stacked
                                width="320px"
                                height="360px"
                            />
                        </div>

                    </div>

                </div>


            </div>



        </div>
    )
}

export default Ecommerce
