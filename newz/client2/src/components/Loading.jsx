import { Card, CircularProgress } from "@mui/material";

const Loading = (width, height) => {
    return (
        <Card className="loadingContainer" sx={{ height: height, width: width, marginTop: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <CircularProgress style={{ width: "90px", height: "90px" }} />
        </Card>
    )
}

export default Loading;