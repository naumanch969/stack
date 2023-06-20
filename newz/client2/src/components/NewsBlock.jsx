import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import image from '../assets/random.jpg'
import { Link } from 'react-router-dom'

const NewsBlock = ({ data, title }) => {

    const { limitText } = useStateContext()

    return (
        <div className="flex flex-col gap-[12px] pt-[2rem] pb-[3rem] border-b-[1px] border-gray-400 " >

            <div className="flex items-center gap-[8px] " >
                <span className=" w-[1rem] h-[1rem] bg-blue " />
                <h4 className="capitalize text-blue font-semibold text-[20px] " >the {title}</h4>
            </div>

            <div className='flex justify-between gap-[2rem] ' >
                <div className="w-[65%] pr-[2rem] border-r-[1px] border-gray-400 " >
                    <div className=" max-h-[30rem] " >
                        <img src={data[0]?.url} alt="" className="w-full h-full rounded-[2px] " />
                    </div>
                    <div className=" flex flex-col justify-start gap-[8px] " >
                        <div className="flex flex-col gap-[8px] " >
                            <h2 className="text-[26px] font-bold text-black " >{data[0]?.title}</h2>
                            <p className="text-[18px] text-text-gray " >{data[0]?.content}</p>
                        </div>
                        <div className="flex items-center justify-start gap-[1rem] " >
                            <p className=" " >by <span className="text-text-gray-dark font-semibold text-[16px]" >{data[0]?.author}</span></p>
                            <p className="">{data[0]?.publishedAt}</p>
                        </div>
                    </div>
                </div>


                <div className="w-[35%] flex flex-col justify-start gap-[2rem] " >
                    {
                        data?.slice(1, 4).map((news, index) => (
                            <div key={index} className={`flex pb-[1rem] gap-[8px] ${data?.length - 2 != index && 'border-b-[1px] border-gray-400'}  `} >
                                <div className="flex flex-col w-[50%] " >
                                    {console.log('news', news)}
                                    <Link to='' className="text-[18px] font-semibold " >{limitText(news?.title, 120)}</Link>
                                    <div className="flex items-center justify-start gap-[1rem] " >
                                        <p className=" " >by <span className="text-text-gray-dark font-medium text-[16px]" >{news?.author}</span></p>
                                    </div>
                                </div>
                                <div className=" h-full w-[50%]  " >
                                    <img src={news?.url} alt="" className="w-full h-full rounded-[2px] " />
                                </div>
                            </div>
                        ))
                    }

                    <button className="w-full rounded-[4px] border-[2px] border-blue text-blue py-[6px] text-[18px] transition-all hover:bg-blue hover:text-white " >Show All</button>

                </div>

            </div>

        </div>

    )
}

export default NewsBlock