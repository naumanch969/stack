import { Card, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import Loading from "../../components/Loading"
import NewsDetailComp from "../../components/NewsDetail"
import NewsScroll from "../../components/NewsScroll"
import Sidebar from "../../components/Sidebar"
import { useStateContext } from "../../contexts/ContextProvider"


const NewsDetail = () => {

    const location = useLocation()

    const [detailNews, setDetailNews] = useState({})
    const [recommendedNews, setRecommendedNews] = useState([])
    const [paramsForRecommended, setParamsForRecommended] = useState({})
    const { fetchHeadlines, loading } = useStateContext()

    const { id, params } = useParams()
    const param = params.split(",")   // it returns an array ['topic','country','language']
    let topic = param[0]
    let countries = param[1]
    let lang = param[2]


    useEffect(() => {
        const callApi = async () => {
            const data = await fetchHeadlines(topic, countries, lang)
            const singleNews = data.filter((item) => (item._id === id))
            const remainingNews = data.filter((item) => (item._id !== id))
            setRecommendedNews(remainingNews)
            setParamsForRecommended({ topic, countries, lang })
            setDetailNews(singleNews[0])
        }
        callApi()
    }, [location])


    return (
        <Grid container direction="row" justifyContent="space-between" width="100%" >

            <Grid item lg={2.2} position="sticky" justifyContent='space-evenly' height='591px' left="0vh" top="10vh" sx={{ background: "black", color: "white", width: "204px" }} >
                <Sidebar />
            </Grid>

            {
                loading
                    ?
                    <Grid item lg={9.8} sx={{ minHeight: "17rem" }} p="1rem"  >
                        <Loading heigh="100%" width="100%" />
                    </Grid>
                    :
                    <Grid item lg={9.8} p="1rem"  >
                        <Card elevation={6} >
                            {detailNews
                                ?
                                <NewsDetailComp detailNews={detailNews} />
                                :
                                <h1>Sorry, some error occured.</h1>
                            }
                        </Card >
                        <Card elevation={6} sx={{ padding: "1rem", marginTop: "2rem" }}  >
                            {recommendedNews
                                ?
                                <NewsScroll articles={recommendedNews} title="You might Also Like" params={paramsForRecommended} />
                                :
                                <h1>Sorry, some error occured.</h1>
                            }
                        </Card>
                    </Grid>
            }

        </Grid>
    )
}

export default NewsDetail
