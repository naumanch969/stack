import { MoreHoriz } from "@mui/icons-material"
import { Box, Button, ButtonBase, Card, Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"
import image from "../../assets/random.jpg"


const Hero = () => {

    const [result, setResult] = useState([])
    const [params, setParams] = useState({})

    const navigate = useNavigate()

    const { fetchHeadlines, limitText, setLoading } = useStateContext()

    const newsDetailRoute = `/news-detail/${params?.topic},${params?.countries},${params?.lang}`


    useEffect(() => {
        setTimeout(async () => {
            const data = await fetchHeadlines('news', 'pk', 'en')
            setParams({ topic: 'news', countries: 'pk', lang: 'en' })
            data && setResult(data)
        }, 10)
    }, [])





    return (
        <div >

            <div className="flex flex-col gap-[12px] pb-[3rem] border-b-[1px] border-gray-400 " >

                <div className="flex items-center gap-[8px] " >
                    <span className=" w-[1rem] h-[1rem] bg-blue " />
                    <h4 className="capitalize text-text-gray-dark text-[20px] " >the latest</h4>
                </div>

                <div className='flex justify-between gap-[2rem] ' >
                    <div className="w-[50%] max-h-[28rem] " >
                        {console.log(result, 'rea')}
                        <img src={result[0]?.url} alt="" className="w-full h-full rounded-[2px]" />
                    </div>
                    <div className="w-[50%] flex flex-col justify-start gap-[14px] " >
                        <div className="flex flex-col gap-[8px] " >
                            <h2 className="text-[38px] font-bold text-black leading-[44px] " >{result[0]?.title}</h2>
                            <p className="text-[22px] text-text-gray " >{result[0]?.description}</p>
                        </div>
                        <div className="flex items-center justify-start gap-[1rem] " >
                            <p className=" font-semibold text-[20px] " >by <span className="text-text-gray-dark " >{result[0]?.author}</span></p>
                            <p className="">{result[0]?.publishedAt}</p>
                        </div>
                    </div>

                </div>

            </div>





            <div className="flex flex-col gap-[12px] pt-[2rem] pb-[3rem] border-b-[1px] border-gray-400 " >

                <div className="flex items-center gap-[8px] " >
                    <span className=" w-[1rem] h-[1rem] bg-blue " />
                    <h4 className="capitalize text-text-gray-dark text-[20px] " >the uncounted</h4>
                </div>

                <div className='flex justify-between gap-[2rem] ' >
                    {
                        result.slice(1, 3).map((news, index) => (

                            <div key={index} className="w-[50%] " >
                                <div className=" max-h-[28rem] " >
                                    <img src={image} alt="" className="w-full h-full rounded-[2px]" />
                                </div>
                                <div className=" flex flex-col justify-start gap-[8px] " >
                                    <div className="flex flex-col gap-[8px] " >
                                        <h2 className="text-[26px] font-bold text-black " >{news?.title}</h2>
                                        <p className="text-[18px] text-text-gray " >{news?.description}</p>
                                    </div>
                                    <div className="flex items-center justify-start gap-[1rem] " >
                                        <p className=" " >by <span className="text-text-gray-dark font-semibold  text-[20px]" >{news?.author}</span></p>
                                        <p className="">{news?.publishedAt}</p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                </div>

            </div>


















            {/* <Grid item sm={12} lg={6.5} pr="12px" >
                <h1 variant="h1" sx={{ fontSize: "55px", marginTop: '7px', fontWeight: "bold" }} >Most Sensational News  <br /> of The Week</h1>
                <p variant="body1" m="8px 0" >Various events that becomes the main news heading during the week and become the subject of discussion througout the week</p>

                <Card sx={{ height: "365px", width: "100%", position: "relative" }}  >
                    <button style={{ position: "absolute", padding: "0", top: "0.1rem", right: "0.1rem", zIndex: "38" }}   ><MoreHoriz sx={{ color: "white", fontSize: "2rem" }} /></button>
                    <div className="overlay-parent" onClick={() => navigate(`${newsDetailRoute}/${(headlines || newsArr)[0]._id}`)} sx={{ height: "100%", width: "100%" }} >
                        <img src={(headlines || newsArr)[0]?.media} alt="image" style={{ height: "100%", width: "100%", filter: 'brightness(0.8)', borderRadius: "6px" }} />
                        <div height="fit-content" position="absolute" bottom="25px" p="0 20px" boxSizing="border-box" width="100%" gap={1} >
                            <h4 variant="h4" sx={{ textAlign: "initial", fontSize: '25px', fontWeight: "500", color: 'white' }} >{limitText((headlines || newsArr)[0]?.title, 64)}</h4>
                        </div>
                        <p className="absolute left-0 bottom-0 px-[20px] py-[10px] " position="absolute"  >By {(headlines || newsArr)[0]?.author}</p>
                        <p className="absolute left-0 bottom-0 px-[20px] py-[10px] "  >{(headlines || newsArr)[0]?.published_date}</p>
                        <p className="overlay" textAlign="left" fontSize="1.3rem" variant="p" color="#000" >{(headlines || newsArr)[0]?.summary}</p>
                    </div>
                </Card>

            </Grid>
            <Grid item sm={12} lg={5.5} pl="12px" >
                <h2 className="px-[20px] font-semibold text-[50px] mt-[4rem] " >Latest News</h2>
                <Grid container className="latestNewsCard" >

                    {(headlines || newsArr)?.slice(1, 5)?.map((item, index) => (
                        <Grid className='px-[20px] py-[8px] max-h-[16rem] ' key={index} item lg={6} sm={12}  >

                            <Card className='h-full relative ' >
                                <Link to={`${newsDetailRoute}/${item._id}`} className="overlay-parent relative overflow-hidden text-black "  >
                                    <div className="flex w-full h-[60%] relative "  >
                                        <img src={item.media} className='w-full h-full ' alt="image" />
                                        <p className='text-white w-auto text-left absolute left-[6px] top-[6px] ' >{item.published_date}</p>
                                    </div>
                                    <div className="flex flex-col justify-between px-[8px] py-[4px] h-[40%]" >
                                        <h5 className="text-[1rem] font-bold " >{item.title}</h5>
                                        <p className='w-auto text-end '   >By {item.author}</p>
                                    </div>
                                    <p className="hover:opacity-70 absolute top-0 left-0 flex justify-center items-start p-[1rem] w-full h-full overflow-y-scroll
                                    bg-[rgb(164, 169, 157)] transform translate-y-full opacity-0 transition-all duration-[300] text-black "  >{item.summary}</p>
                                </Link>
                            </Card>

                        </Grid>
                    ))}

                </Grid>



                <Button variant="contained" sx={{ width: "100%", borderRadius: '18px' }} >View All</Button>



            </Grid> */}
        </div>
    )
}

export default Hero 