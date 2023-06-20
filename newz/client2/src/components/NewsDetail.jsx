import { Box, Stack, Typography } from "@mui/material"

const NewsDetail = ({ detailNews }) => (
    <>

        <Box  >
            <img src={detailNews.media} alt="image" width='100%' height="350px" style={{ borderRadius: "6px" }} />
        </Box>

        <Box p='1rem'  >
            <Typography variant="h3" fontSize='2.25rem' fontFamily='roboto' textTransform='capitalize' fontWeight='600' my='8px' >{detailNews.title}</Typography>
            <Typography variant="body1" textAlign="justify" my="15px" >{detailNews.summary}......</Typography>
            <Stack direction="row" my="15px" sx={{ justifyContent: "space-between" }} >
                <Typography variant="body2" fontFamily="cursive" fontWeight="600" fontSize="18px" >By {detailNews.author}</Typography>
                <Typography variant="body2" fontFamily="cursive" fontWeight="600" fontSize="18px" >{detailNews.published_date}</Typography>
            </Stack>
            <Stack width="100%" alignItems="center" justifyContent="center" sx={{ backgroundColor: "blue", borderRadius: "1rem" }} >
                <a href={detailNews.link} target="_blank" sx={{ width: "100%", borderRadius: '18px', margin: "15px 0", color: "white" }} >Get the full article</a>
            </Stack>
        </Box>

    </>
)

export default NewsDetail
