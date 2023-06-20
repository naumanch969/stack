import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import categories from "./Categories.json"
import Loading from "./Loading"

const AllCategories = () => {

    const navigate = useNavigate()
    const { loading } = useStateContext()

    const country = "pk";
    const lang = "en";
    const sources = [];

    return (
        <Box>
            <Stack justifyContent="center" alignItems="center" mb="35px" height="180px" backgroundColor="black" color="white" >
                <Typography variant="h2" >All News Categories</Typography>
            </Stack>
            <Grid container justifyContent="center"  >
                {
                    loading ?
                        <Loading />
                        :
                        categories.map((item) => (
                            <Grid item lg={2.1} sm={6} display="flex" width="210px" jusitfyContent="center" position="relative" m="10px" >
                                <Button variant="contained" onClick={() => navigate(`/news/${item.topic}&${country}&${lang}`)} sx={{ width: "100%", height: "120px", fontWeight: "600", fontSize: "22px", fontFamily: "cursive" }} >{item.topic}</Button>     {/* &${sources} */}
                            </Grid>
                        ))
                }
            </Grid>
        </Box>
    )
}

export default AllCategories