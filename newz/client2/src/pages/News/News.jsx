import { Grid } from "@mui/material"
import Footer from "../../components/Footer"
import NewsComp from "../../components/News"
import Sidebar from "../../components/Sidebar"



const News = () => {
    return (
        <Grid container direction="row" justifyContent="space-between" width="100%" >
            <Grid item lg={2.2} position="sticky" justifyContent='space-evenly' height='591px' left="0vh" top="10vh" sx={{ background: "black", color: "white", width: "204px" }} >
                <Sidebar />
            </Grid>
            <Grid item lg={9.8} p="1rem"  >
                <NewsComp />
                <Footer />
            </Grid>
        </Grid>
    )
}

export default News