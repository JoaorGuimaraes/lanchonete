import { Typography } from "@mui/material";
import canteenLogoImg from "../../assets/The-Canteen-logo.png";
import "./style.css";
export function Header() {
    return (
        <div className="container">
            <img src={canteenLogoImg} alt="Canteen Logo" />
            <Typography variant="h5" align="right">Canteen menager</Typography>
        </div>
    );
}