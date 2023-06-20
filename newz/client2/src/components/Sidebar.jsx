import { Link } from "react-router-dom"
import { Box } from "@mui/material"
import { useStateContext } from "../contexts/ContextProvider"


const Sidebar = () => {

    const { screenSize, activeMenu, setActiveMenu } = useStateContext()

    const handleCloseSidebar = () => {      // this functin is for whenever we click certain navLink of sidebar - we have to close the sidebar
        if (activeMenu && screenSize <= 900) {      // screenSize<=900 - mobile screen
            setActiveMenu(false)
        }
    }

    const lang = "en"
    const country = "pk"
    const sources = []

    return (
        <div style={{ marginLeft: ".75rem" }} >
            {/* Logo and title */}
            <Link to="/" onClick={handleCloseSidebar}>   {/* tracking-tight - letter-spacing:-.25rem */}
                <span style={{ fontSize: "1.7rem", color: "white", marginTop: ".5rem" }} >Categories</span>
            </Link>

            {/* all sidebar items */}
            <Box pl=".6rem" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} >
                {
                    topics.map((topic, index) => (
                        <Link to={`/news/${topic}&${country}&${lang}&${sources}`} key={index} style={{ textDecoration: "none", color: "white", fontSize: '20px', fontFamily: 'cursive', height: "25px", margin: '.3rem' }} >{topic}</Link>
                    ))
                }
            </Box>
        </div >
    )
}

export default Sidebar

// <Link to={`/news`} key={index} style={{ textDecoration: "none", color: "white", fontSize: '20px', fontFamily: 'cursive', height: "25px", padding: '5px 7px' }} >{topic}</Link>
{/* sidebar close icon */ }
// <IconButton type="button" sx={{ borderRadius: "50%" }} >
//     <Close />
// </IconButton>





const topics = [
    "news",
    "sport",
    "tech",
    "world",
    "finance",
    "politics",
    "business",
    "economics",
    "entertainment",
    "beauty",
    "travel",
    "music",
    "food",
    "science"
]
