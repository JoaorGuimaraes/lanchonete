import { Grid } from "@mui/material";
import { Dashboard } from "../../Pages/Dashboard";
import { Table } from "../../Pages/Table";

export function Main() {
  return (
    <Grid
      container
      spacing={2}
      padding={2}
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
