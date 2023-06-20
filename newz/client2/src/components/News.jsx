import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import Filters from "./Filters"
import Loading from "./Loading"
import NewsItem from "./NewsItem"

const News = () => {

    const [searchData, setSearchData] = useState([])
    const location = useLocation()

    const { fetchBySearch, searchStatusCode, loading, fetchedData } = useStateContext()   // fetchedData contain all info. including articles array

    const { params } = useParams()    // params is identified in app.js while setting route
    const param = params.split("&")
    let query = param[0]
    let country = param[1]
    let language = param[2]
    let sources = params.split("&").slice(3, params.length)

    if (country === 'undefined' || country === "") {
        country = "en"
    }
    if (language === 'undefined' || language === "") {
        language = "pk"
    }


    useEffect(() => {
        const callApi = async () => {
            const data = await fetchBySearch(query, country, language, sources)
            setSearchData(data)
        }
        callApi()
    }, [location])


    return (
        <Box p="0px 20px" >
            <Box p='12px 2px'  >
                <Typography variant="h4" fontFamily="cursive" fontWeight="600" >Search Results for  <span style={{ textTransform: 'uppercase' }} >{query}</span> </Typography>
            </Box>

            <Filters query={query} />   {/* query is passed for navigation to the same topic  */}
            {loading ?
                <Loading width="100%" height="100%" />
                :
                <Grid container sx={{ justifyContent: "space-between" }}   >
                    <>
                        {
                            searchData?.map((item, index) => (
                                <NewsItem key={index} itemId={index} item={item} marginNone />
                            ))
                        }
                    </>
                    {
                        searchStatusCode === 200 && fetchedData.total_hits === 0 ? <h1>No Article matches your search. Please search for another keyword.</h1> : ""   // if no news article match to search
                    }
                </Grid>
            }
        </Box>
    )
}

export default News

