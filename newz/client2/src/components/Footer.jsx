import { Stack, Typography } from "@mui/material"
import logo from "../assets/logo.png"

const Footer = () => {
    return (
        <Stack alignItems="center" position="sticky" width="100%" top="100%" backgroundColor="#1976d2" color="white" p="12px 40px" mt="35px"  >
            {/* <img src={logo} alt="logo" /> */}
            <Typography variant="h4" fontWeight="600" fontFamily="cursive" >Newz</Typography>
            <Typography variant="h5" fontWeight="600" fontFamily="cursive" >Made with Heart </Typography>
        </Stack>
    )
}

export default Footer;

