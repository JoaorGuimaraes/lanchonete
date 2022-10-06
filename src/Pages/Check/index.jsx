import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { api } from "../../Services/api";
import { useParseParams } from "../../Utils/useParseParams";
export function Check() {
  const { register, handleSubmit, getValues } = useForm();
  const [rows, setRows] = useState([{id: 0}]);
  const [options, setOptions] = useState([]);
  const id = useParseParams().get("id");
  const history = useHistory();

  const columns = [
    {
      field: "id",
      headerName: "Food",
      width: 150,
      renderCell: (params) =>
        options.find((product) => product.id == params.value)?.food
    },
    { field: "quantity", headerName: "Quantity", width: 150 },
    {
      field: "total",
      headerName: "total Value",
      width: 150,
      renderCell: (params) =>
        options.find((product) => product.id == params.row.id)?.price *
        params.row.quantity
    }
  ];

  useEffect(() => {
    if (id) {
      api.get(`/table/${id}`).then((response) => setRows(response.data.check))
      .catch(() => alert("error"));
    }
    api
      .get("/product")
      .then((response) => setOptions(response.data))
      .catch(() => alert("Ocorreu um erro de rede"));
  }, []);

  function postForm(data) {
    if (id) {
      
      api.get(`/table/${id}`).then((response) => {
        const lastCheck = response.data.check;
        data.quantity = Number(data.quantity);
        lastCheck.push(data);
        api
          .patch(`/table/${id}`, { check: lastCheck })
          .then((response) => {
            alert("Sucess");
            history.push("/");
          })
          .catch((error) => alert(error.message));
      });
    }
  }
  return (
    <Card>
      <CardActions>
        <h1>Check management panel</h1>
      </CardActions>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        onSubmit={handleSubmit(postForm)}
        autoComplete="off"
      >
        <TextField
          id="outlined-select-currency"
          select
          label="food"
          required
          {...register("id")}
          defaultValue={getValues("food")}
          helperText="Please select your currency"
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.food}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-number"
          label="quantity"
          type="number"
          inputProps={{ min: 0 }}
          {...register("quantity")}
        />

        <Button
          color="primary"
          variant="contained"
          sx={{ mr: 1 }}
          type="submit"
        >
          add
        </Button>
      </Box>

      <Card sx={{ width: "100%" }}>
        <CardContent>
          <DataGrid autoHeight rows={rows} columns={columns} />
        </CardContent>
      </Card>
    </Card>
  );
}
