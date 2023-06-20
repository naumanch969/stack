import { Box } from "@mui/material"
import { Footer, NewsBlock } from "../../components"
import Categories from "./Categories"
import Hero from "./Hero"
import SearchNews from "./SearchNews"
import Sources from "./Sources"
import image from '../../assets/random.jpg'
import { useStateContext } from '../../contexts/ContextProvider'
import { useState, useEffect } from 'react'

const Home = () => {

    const { fetchHeadlines } = useStateContext()
    const [result, setResult] = useState([])

    // useEffect(() => {
    //     const call = async () => {
    //         const data = await fetchHeadlines()
    //         console.log(data)
    //         setResult(data.articles)
    //     }
    //     call()
    // }, [])

    useEffect(() => {
        console.log('result', result)
    }, [result])

    return (
        <div className="px-[5rem] " >
            <Hero />
            <NewsBlock data={result} title='Education' />
            <NewsBlock data={result} title='Health' />
            <NewsBlock data={result} title='Environment' />
            {/* <Categories /> */}
            {/* <SearchNews /> */}
            {/* <Sources /> */}
        </div>
    )
}

export default Home


const subNews = [
    {
        title: 'Overrepresentation of Black, Hispanic students among those suspended for missing school could violate civil rights law',
        author: 'Tara García Mathewson ',
        url: image
    },
    {
        title: 'In wake of pandemic, some districts take less-punitive approach to absenteeism',
        author: 'Tara García Mathewson ',
        url: image
    },
    {
        title: 'Inside our analysis of Arizona’s attendance-related suspensions',
        author: 'Maria Polletta ',
        url: image
    },
    {
        title: 'Suspending students for absences, tardies compounds learning loss',
        detail: 'Suspending students for missing class, whether it’s because they showed up late, cut midday or were absent from school entirely, is a controversial tactic. At least 17 states forbid schools from suspending students for attendance problems at some level—if kids aren’t in class, they aren’t learning. Yet the practice is pervasive in Arizona, a first-of-its-kind AZCIR/Hechinger analysis has found, with students missing tens of thousands of additional school days as a result.',
        author: 'Tara García Mathewson ',
        url: image
    },
]