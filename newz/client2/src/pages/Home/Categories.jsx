import { Button, Grid, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"
import categories from "../../components/Categories.json"
import { Loading } from "../../components"

const Categories = () => {

    const navigate = useNavigate()
    const { loading } = useStateContext()
    const country = "pk";
    const lang = "en";
    const sources = [];

    return (
        <Stack marginTop="35px" sx={{ justifyContent: "space-between" }} >
            <Typography marginBottom="12px" variant="h2"  >Categories</Typography>

            <Grid container justifyContent="center"  >
                {
                    loading ?
                        <Loading />
                        :
                        categories.slice(0, 4).map((item, index) => (
                            <Grid key={index} item lg={2.1} sm={6} display="flex" width="210px" justifyContent="center" position="relative" m="10px" >
                                <Button variant="contained" onClick={() => navigate(`/news/${item.topic}&${country}&${lang}`)} sx={{ width: "100%", height: "120px", fontWeight: "600", fontSize: "22px", fontFamily: "cursive" }} >{item.topic}</Button>
                            </Grid>
                        ))
                }
            </Grid>

            <Button variant="contained" onClick={() => navigate("/all-categories")} sx={{ width: "100%", borderRadius: '18px' }} >View All</Button>
        </Stack>
    )
}

export default Categories



