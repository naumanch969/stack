import { Box, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from 'react'
import { useStateContext } from "../../contexts/ContextProvider"
import image from "../../assets/random.jpg"
import { NewsScroll } from "../../components"


const SearchNews = () => {
    const { fetchHeadlines } = useStateContext()

    const [techArticles, setTechArticles] = useState([])
    const [sportArticles, setSportArticles] = useState([])
    const [worldArticles, setWorldArticles] = useState([])
    const [politicsArticles, setPoliticsArticles] = useState([])
    const [entertainArticles, setEntertainArticles] = useState([])

    const [techParams, setTechParams] = useState({})
    const [sportParams, setSportParams] = useState({})
    const [worldParams, setWorldParams] = useState({})
    const [politicsParams, setPoliticsParams] = useState({})
    const [entertainParams, setEntertainParams] = useState({})


    useEffect(() => {
        // setTimeout(async () => {
        //     setTechArticles(await fetchHeadlines('politics', 'pk', 'en'))
        //     setTechParams({ topic: 'politics', countries: 'pk', lang: 'en' })
        // }, 1000)
        // setTimeout(async () => {
        //     setSportArticles(await fetchHeadlines('finance', 'pk', 'en'))
        //     setSportParams({ topic: 'finance', countries: 'pk', lang: 'en' })
        // }, 2000)
        // setTimeout(async () => {
        //     setWorldArticles(await fetchHeadlines('world', 'pk', 'en'))
        //     setWorldParams({ topic: 'world', countries: 'pk', lang: 'en' })
        // }, 3000)
        // setTimeout(async () => {
        //     setPoliticsArticles(await fetchHeadlines('sport', 'pk', 'en'))
        //     setPoliticsParams({ topic: 'sport', countries: 'pk', lang: 'en' })
        // }, 4000)
        // setTimeout(async () => {
        //     setEntertainArticles(await fetchHeadlines('entertainment', 'pk', 'en'))
        //     setEntertainParams({ topic: 'entertainment', countries: 'pk', lang: 'en' })
        // }, 5000)
    }, [])
    const newsArr = [
        { _id: "news1j3ja3g54sdywt434d35", title: "title1", summary: "summary1", published_date: "published_date1", link: "link1", clean_url: "clean_url1", topic: "topic1", countries: "countries1", language: "lang1", authors: "author1", media: image, twitter_account: "twitter_account1" },
        { _id: "news2j3ja3454sey435fdd63", title: "title2", summary: "summary2", published_date: "published_date2", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news3j3ja3954s8yw3543dk3", title: "title3", summary: "summary3", published_date: "published_date3", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news4j3ja3454sky64hredwd", title: "title4", summary: "summary4", published_date: "published_date4", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news5j3ja3454s9y35445d34", title: "title5", summary: "summary5", published_date: "published_date5", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news6j3ja3354s5yikwd6d73", title: "title6", summary: "summary6", published_date: "published_date6", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news7j3ja3f54sryskfsdd63", title: "title7", summary: "summary7", published_date: "published_date7", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news8j3ja3454s3yk4763d45", title: "title8", summary: "summary8", published_date: "published_date8", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news9j3ja3k54swyksd32d54", title: "title9", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1er3j3t54sryee43gdfd", title: "title10", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1fj3j3a54skywsoe5d32", title: "title11", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1ak3j3w54skyedojsdd4", title: "title12", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1ak3j3w54skyed4vrde3", title: "title13", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1wk3j3e54ssydt354d54", title: "title14", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1fj3j3a54skywedfodsd", title: "title15", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1fj3j3a54skyerrewd45", title: "title16", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1fj3j3a54skyweddsdr4", title: "title17", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1fj3j3a54skywegfddt4", title: "title18", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news1ej3j3a54skywrr54d32", title: "title19", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
        { _id: "news243j63354sty4cf24d3s", title: "title20", summary: "summary9", published_date: "published_date9", link: "link", clean_url: "clean_url", topic: "topic", countries: "countries", language: "lang", authors: "author", media: image, twitter_account: "twitter_account" },
    ]


    return (
        <Box style={{ width: "100%" }}>
            <Stack marginTop="35px" width="100%" >
                <Typography marginBottom="12px" variant="h2"  >News of the Day</Typography>

                {(techArticles || newsArr) ? <NewsScroll params={techParams} articles={techArticles || newsArr} title="tech" /> : <></>}
                {/* {(sportArticles || newsArr) ? <NewsScroll params={sportParams} articles={sportArticles || newsArr} title="sports" /> : <></>}
                {(worldArticles || newsArr) ? <NewsScroll params={worldParams} articles={worldArticles || newsArr} title="world" /> : <></>}
                {(politicsArticles || newsArr) ? <NewsScroll params={politicsParams} articles={politicsArticles || newsArr} title="politics" /> : <></>}
                {(entertainArticles || newsArr) ? <NewsScroll params={entertainParams} articles={entertainArticles || newsArr} title="entertainment" /> : <></>} */}

            </Stack>
        </Box>
    )
}

export default SearchNews

{/*
search bar
<Box position="relative" display="flex" width="55vw" p='4px 2px' borderRadius='7px' gap='5px' alignItems="center" border='1px solid black' >
    <Box d />
    </Box
</Box> */}
