import { Box, Stack, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useStateContext } from "../../contexts/ContextProvider"

const Sources = () => {

    const [sources, setSources] = useState([])
    const { fetchSources, step, setStep } = useStateContext()
    const slide_item_width = 20;
    const animation_speed = sources?.length * 3;

    useEffect(() => {
        step == 5 && setTimeout(async () => {
            const data = await fetchSources('news', 'pk', 'en')
            setSources(data)
            setStep(0)
        }, 6000)
    }, [])


    const SliderTrack = styled(Box)({
        display: "flex",
        height: "100%",
        width: `${slide_item_width * sources?.length * 2}rem`,
        animation: `scroll ${animation_speed}s linear infinite`,
        '@keyframes scroll': {
            '0%': {
                transform: 'translateX(0rem)'
            },
            '50%': {
                transform: `translateX(${-slide_item_width * sources?.length / 2}rem)`
            },
            '100%': {
                transform: `translateX(${-slide_item_width * sources?.length}rem)`
            }
        }
    })


    const sourcesArr = ["title1", "title2", "title3", "title4", "title5", "title6", "title7", "title8", "title9", "title10", "title11", "title12", "title13", "title14"]

    return (
        <Box marginTop="35px" justifyContent="space-between" >
            <Typography marginBottom="12px" variant="h2"  >Sources of News</Typography>

            <Stack className="slider" direction="row" overflow="hidden"  >
                <SliderTrack className="slider-track" >
                    {
                        (sources)?.slice(0, 20)?.map((item, index) => (
                            <Box key={index} className="slide-item" mx="1rem" width="auto" >
                                <a href={`https://${item}`} target="_blank" >{item}</a>
                            </Box>
                        ))
                    }
                    {
                        (sources)?.slice(0, 20)?.map((item, index) => (
                            <Box key={index} className="slide-item" mx="1rem" width="auto" >
                                <a href={`https://${item}`} target="_blank" >{item}</a>
                            </Box>
                        ))
                    }
                </SliderTrack>
            </Stack>

        </Box>
    )
}

export default Sources