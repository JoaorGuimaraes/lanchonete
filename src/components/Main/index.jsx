import { Container, Grid } from "@mui/material";
import { Dashboard } from "../../Pages/Dashboard";
import { Table } from "../../Pages/Table";

export function Main() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      borderBottom={"1px solid black"}
      height={"7.1rem"}
    >
      <Grid item xs={6} sm={6} md={6}>
        <Dashboard />
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Table />
      </Grid>
    </Grid>
  );
}
