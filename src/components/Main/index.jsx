import { Container } from "@mui/material";
import { Dashboard } from "../../Pages/Dashboard";

export function Main() {
    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
        }}>
            <Dashboard />
        </Container>
    )
}