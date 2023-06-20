import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import * as styled from "./styles"
import { useState } from "react"

const List = () => {
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')

    return (
        <div style={styled.container} >
            <Typography variant="Restaurants, Hotels & Attractions around you" ></Typography>
            <FormControl sx={styled.formControl} >
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={e => setType(e.target.value)} >
                    <MenuItem value="restaurants" >Restaurants</MenuItem>
                    <MenuItem value="hotels" >Hotels</MenuItem>
                    <MenuItem value="attractions" >Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={styled.formControl} >
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={e => setRating(e.target.value)} >
                    <MenuItem value={0} >All</MenuItem>
                    <MenuItem value={3} >Above 3.0</MenuItem>
                    <MenuItem value={4} >Above 4.0</MenuItem>
                    <MenuItem value={4.5} >Above 4.5</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default List