// import { Autocomplete } from "@react-google-maps/api"
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material"
import { Search } from "@mui/icons-material"
import * as styled from "./styles"

const Header = () => {
    return (
        <AppBar position="static"  >
            <Toolbar sx={styled.toolbar} >
                <styled.title variant="h5"  >
                    Travel Advisor
                </styled.title>
                <Box display="flex" >
                    <Typography variant="h6">
                        Explore New Places
                    </Typography>
                    {/* <Autocomplete> */}
                    <styled.search  >
                        <styled.searchIcon>
                            <Search />
                        </styled.searchIcon>
                        <InputBase placeholder="Search ..." sx={{ padding: '0 36px' }} classes={{ root: styled.inputRoot, input: styled.inputInput }} />
                    </styled.search>
                    {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header