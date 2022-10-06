import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import canteenLogoImg from "../../assets/The-Canteen-logo.png";
export function Header() {
    return (
        <Grid container direction="row"
            justifyContent="center"
            alignItems="center"
            p={"2rem"}
            borderBottom={"1px solid black"}
            height={"7.1rem"}
        >

            <Grid item xs={6} sm={6} md={6} sx={{height:"5rem"}}>
                <Link to="/"><img src={canteenLogoImg} alt="Canteen Logo" style={{height:"5rem"}}/></Link>
            </Grid>

            <Grid item xs={6} sm={6} md={6}>
                <Typography variant="h5" align="right">Canteen menager</Typography>
            </Grid>

        </Grid>
    );
}
