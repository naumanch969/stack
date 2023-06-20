import GoogleMapReact from "google-map-react"
import { Paper, Typography, Rating, useMediaQuery } from "@mui/material"
import { LocationOnOutlinedIcon } from '@mui/icons-material';
import * as styled from "./styles"

const Map = () => {

    const isMobile = useMediaQuery('(min-width:600px)');
    const coordinates = { lat: 0, lng: 0 }

    return (
        <div className="classes.mapContainer" >

            <GoogleMapReact>
                bootstrapURLKeys={{ key: "AIzaSyBUq4yuqui7ypb3xV7f4_3GXScV5SKIPHE" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                {/* options={''}
                onChange={''}
                onChildClick={''} */}
            </GoogleMapReact>


        </div>
    )
}

export default Map