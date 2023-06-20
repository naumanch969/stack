import { useStateContext } from "../../../../../contexts/ContextProvider"
import AutoCompelete from "./AutoComplete";

const Filters = () => {

    const { Months, Days } = useStateContext()
    //////////////////////////// VARIABLES ////////////////////////////////////

    //////////////////////////// STATES ///////////////////////////////////////

    //////////////////////////// USE EFFECTS //////////////////////////////////

    //////////////////////////// FUNCTIONS /////////////////////////////////////






    return (
        <div className="flex flex-col gap-[8px] " >


            <AutoCompelete
                Array={Days}
                attribute='days'
            />


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