import { MoreHoriz } from "@mui/icons-material"
import { Box, Button, ButtonBase, Card, Stack, Typography, Chip } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import { useEffect, useState } from "react"

const NewsItem = ({ item, params, marginNone }) => {

    const navigate = useNavigate()
    const { limitText, setLoading, user } = useStateContext()
    const newsDetailRoute = `/news-detail/${params?.topic}&${params?.countries}&${params?.lang}`





    return (
        <Card elevation={4} sx={{ position: "relative", width: '16rem', height: "20rem", marginLeft: "0px", display: "inline-grid", margin: `${marginNone ? "12px 0" : "12px"}` }} >

            <ButtonBase onClick={() => navigate(`${newsDetailRoute}/${item._id}`)} className="overlay-parent" style={{ textDecoration: "none", color: "black", display: "flex", flexDirection: "column" }} >

                <Box width="100%" height="60%" sx={{ position: "relative" }} >
                    <img src={item.media} width="100%" height="100%" alt="image" />
                    <Typography variant="body2" color="#fff" width="auto" textAlign="left" sx={{ position: "absolute", left: "5px", top: "5px" }} >{item.published_date}</Typography>
                </Box>

                <Stack sx={{ direction: "column", justifyContent: "space-between", alignItems: "flex-start" }} width="100%" p="4px 8px" height="40%" >
                    <Typography variant="h5" fontSize="1rem" fontWeight="bold" >{limitText(item.title, 110)}</Typography>
                    <Typography variant="body2" width="auto" sx={{ textAlign: "end", width: "100%" }} >By {item.author}{item.clean_url}</Typography>
                    <Typography variant="body1" >{item._id}</Typography>
                </Stack>

                <Typography className="overlay" variant="p" color="#000" >{item.summary}</Typography>

            </ButtonBase>




        </Card>
    )
}

export default NewsItem;



