import { createContext, useContext, useState } from "react";
// const NewsAPI = require('newsapi');
import NewsAPI from 'newsapi';
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const newsapi = new NewsAPI('787f416c9da84c758d48f8ee0b0826b7');

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [fetchedData, setFetchedData] = useState([]);
    const [sourcesArray, setSourcesArray] = useState([]);
    const [isSignUpPage, setIsSignUpPage] = useState(true);
    const [editUserPage, setEditUserPage] = useState(false);
    const [techArticles, setTechArticles] = useState(false);
    const [screenSize, setScreenSize] = useState(undefined);
    const [activeMenu, setActiveMenu] = useState(undefined);
    const [searchStatusCode, setSearchStatusCode] = useState(null);
    const [isHeroArtLoaded, setIsHeroArtLoaded] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", location: "", password: "", confirmPassword: "" });
    const [users, setUsers] = useState([])

    const Capitalize = (str) => {
        return str && str.charAt(0).toUpperCase() + str.slice(1);
    }

    const limitText = (str, limit) => {
        if (str) {
            if (str.split("").length > limit) {
                const strArr = str.slice(0, limit).trim().split(" ")
                const string = strArr.slice(0, strArr.length - 1).join(" ")
                return <>{`${Capitalize(string)} ...`}</>
            }
            else {
                return Capitalize(str)
            }
        }
    }


    const options = {
        method: 'GET',
        headers: { 'x-api-key': '787f416c9da84c758d48f8ee0b0826b7' }
    };
    const fetchHeadlines = async (topic, countries, lang) => {
        console.log(topic, countries)
        try {
            setLoading(true)
            const fetchResult = await fetch(`https://api.newscatcherapi.com/v2/latest_headlines
                ?${topic !== "" ? `topic=${topic}` : ''}
                &${countries !== "" ? `countries=${countries}` : ''}
                &${lang !== "" ? `lang=${lang}` : ''}
            `
                , options)
            const { articles } = await fetchResult.json()
            setLoading(false)
            return articles;
        } catch (error) {
            console.log("error in fetchHeadlines - context ", error)
        }
    }
    const fetchBySearch = async (q, countries, lang) => {
        try {
            const url = 'https://newsapi.org/v2/everything?' +
                'q=pakistan&' +
                'apiKey=787f416c9da84c758d48f8ee0b0826b7';

            const response = await fetch(url);
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error);
        }
    }
    const fetchByFilters = async (q, countries, lang, sources) => {

    }
    const fetchSources = async (topic, countries, lang) => {

    }







    return (
        <StateContext.Provider
            value={{
                step, setStep,
                user, setUser,
                users, setUser,
                isSignUpPage, setIsSignUpPage,
                formData, setFormData,
                editUserPage, setEditUserPage,
                screenSize, setScreenSize,
                isHeroArtLoaded, setIsHeroArtLoaded,
                techArticles, setTechArticles,
                activeMenu, setActiveMenu,
                loading, setLoading,

                fetchHeadlines,
                fetchBySearch,
                fetchByFilters,
                fetchSources,
                limitText,
                Capitalize,
                searchStatusCode,
                sourcesArray,
                fetchedData,

            }}
        >
            {children}
        </StateContext.Provider>
    )
}



export const useStateContext = () => useContext(StateContext)












// const fetchHeadlines = async (topic, countries, lang) => {
//     try {
//         setLoading(true)
//         const fetchResult = await fetch(`https://api.newscatcherapi.com/v2/latest_headlines?${topic !== "" ? `topic=${topic}` : ''}&${countries !== "" ? `countries=${countries}` : ''}&${lang !== "" ? `lang=${lang}` : ''}`
//             , options)
//         const { articles } = await fetchResult.json()
//         setLoading(false)
//         return articles;
//     } catch (error) {
//         console.log("error in fetchHeadlines - context ", error)
//     }
// }
// const fetchBySearch = async (q, countries, lang) => {
//     try {
//         setLoading(true)
//         const fetchResult = await fetch(`https://api.newscatcherapi.com/v2/search?${q !== "" ? `q=${q}` : ''}&${countries !== "" ? `countries=${countries}` : ''}&${lang !== "" ? `lang=${lang}` : ''}`
//             , options)
//         const data = await fetchResult.json()
//         setFetchedData(data)
//         setSearchStatusCode(fetchResult.status)

//         let sourcesArr = []
//         data.articles?.map((article) => {
//             sourcesArr.push(article.clean_url)
//         })
//         setSourcesArray(sourcesArr)

//         setLoading(false)
//         return data.articles;
//     } catch (error) {
//         console.log("error in fetchHeadlines - context ", error)
//     }
// }
// const fetchByFilters = async (q, countries, lang, sources) => {
//     try {
//         setLoading(true)
//         const fetchResult = await fetch(`https://api.newscatcherapi.com/v2/search?${q !== "" ? `q=${q}` : ''}&${countries !== "" ? `countries=${countries}` : '' || countries === 'undefined' && `countries="pk"`}&${lang !== "" ? `lang=${lang}` : '' || lang === undefined && `lang="en"`}&${sources !== [] ? `sources=[${sources}]` : '' || sources === undefined && ``}`
//             , options)
//         const { articles } = await fetchResult.json()
//         setLoading(false)
//         return articles;
//     } catch (error) {
//         console.log("error in fetchHeadlines - context ", error)
//     }
// }
// const fetchSources = async (topic, countries, lang) => {
//     try {
//         setLoading(true)
//         const fetchResult = await fetch(`https://api.newscatcherapi.com/v2/sources?${topic !== "" ? `topic=${topic}` : ''}&${countries !== "" ? `countries=${countries}` : ''}&${lang !== "" ? `lang=${lang}` : ''}`
//             , options)
//         const { sources } = await fetchResult.json()
//         setLoading(false)
//         return sources;
//     } catch (error) {
//         console.log("error in fetchHeadlines - context ", error)
//     }
// }
