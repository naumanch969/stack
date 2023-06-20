import { Box, Typography } from "@mui/material"
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import { Link } from "react-router-dom"
import NewsItem from "./NewsItem"

const NewsScroll = ({ articles, title, params }) => {



    return (
        <Box marginBottom="20px" >
            <Link to="/news" style={{ textDecoration: "none", color: "black" }} >
                <Typography variant="h3" sx={{ fontFamily: "roboto", fontWeight: "600", textTransform: "capitalize" }} >{title}</Typography>
            </Link>
            <ScrollMenu style={{ height: "22rem", backgroundColor: "pink" }} >
                {
                    articles?.slice(0, 12)?.map((item, index) => (
                        <NewsItem key={index} itemId={index} item={item} params={params} />
                    ))
                }
            </ScrollMenu>
        </Box>
    )
}

export default NewsScroll;