import { useStateContext } from "../../contexts/ContextProvider"
import { Swiper, SwiperSlide } from "swiper/react";
import './Filter.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { limitText } from "../../utilityFunctions/function";

const Filters = () => {

    const { currentMonth, currentYear, Months, Days } = useStateContext()
    /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
    const isLeapYear = currentYear % 4 == 0 ? true : false
    const monthLength = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const slideWidth = 80
    const slidesNumber = 12

    /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////


    return (
        <div className="flex flex-col gap-[8px] " >
            <div style={{ paddingBottom: '3px' }} className="thin_horizontal_scrollbar overflow-x-scroll flex gap-[10px] md:justify-start lg:justify-center items-center pb-[3px] " >
                {
                    Array(12).fill('').map((_nothing, index) => (
                        <>
                            <p className={` bg-gray text-gray-300 rounded-[5px] py-[1px] px-[5px] flex justify-center items-center  `} >{limitText(Months[index], 3)}</p>
                        </>
                    ))
                }
            </div>
            <div style={{ paddingBottom: '3px' }} className="thin_horizontal_scrollbar overflow-x-scroll flex gap-[10px] justify-start items-center pb-[3px] " >
                {
                    Array(30).fill('').map((_nothing, index) => (
                        <>
                            <p className={` bg-gray text-gray-300 rounded-[5px] py-[1px] px-[5px] flex justify-center items-center  `} >{index + 1}</p>
                        </>
                    ))
                }
            </div>
            <div style={{ paddingBottom: '3px' }} className="thin_horizontal_scrollbar overflow-x-scroll flex gap-[10px] justify-start items-center pb-[3px] " >
                {
                    Array(52).fill('').map((_nothing, index) => (
                        <>
                            <p className={` bg-gray text-gray-300 rounded-[5px] py-[1px] px-[5px] flex justify-center items-center  `} >{index + 1}</p>
                        </>
                    ))
                }
            </div>
            <div style={{ paddingBottom: '3px' }} className="thin_horizontal_scrollbar overflow-x-scroll flex gap-[10px] md:justify-start lg:justify-center items-center pb-[3px] " >
                {
                    Array(7).fill('').map((_nothing, index) => (
                        <>
                            <p className={` bg-gray text-gray-300 rounded-[5px] py-[1px] px-[5px] flex justify-center items-center  `} >{limitText(Days[index], 3)}</p>
                        </>
                    ))
                }
            </div>
        </div >
    );
}

export default Filters
















            // <Swiper
            //     slidesPerView={"auto"}
            //     centeredSlides={true}
            //     spaceBetween={30}
            //     pagination={{
            //         clickable: true,
            //     }}
            //     modules={[Pagination]}
            //     className="mySwiper"
            // >
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 1
            //         </div>
            //     </SwiperSlide>
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 2
            //         </div>
            //     </SwiperSlide>
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 3
            //         </div>
            //     </SwiperSlide>
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 4
            //         </div>
            //     </SwiperSlide>
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 5
            //         </div>
            //     </SwiperSlide>
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 6
            //         </div>
            //     </SwiperSlide>
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 7
            //         </div>
            //     </SwiperSlide>
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 8
            //         </div>
            //     </SwiperSlide>
            //     <SwiperSlide>
            //         <div className={`flexd  `} >
            //             Slide 9
            //         </div>
            //     </SwiperSlide>
            // </Swiper>