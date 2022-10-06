import {
  Box,
  Button,
  Card,
  CardActions,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { api } from "../../Services/api";
import { useParseParams } from "../../Utils/useParseParams";

export function AddFood() {
  const { register, handleSubmit, setValue, getValues} = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const id = useParseParams().get("id");

  const options = [
    { value: "roast", label: "roast" },
    { value: "fried", label: "fried" },
    { value: "refreshment", label: "refreshment" },
  ];

  useEffect(() => {
    if(id){
      api.get(`/product/${id}`)
      .then((response) => {
        setValue("food", response.data.food);
        setValue("price", response.data.price);
        setValue("category", response.data.category);
      })
      .catch(() => alert("A requisição falhou"))
      .finally(() => setIsLoading(false));
    }else{
      setIsLoading(false)
    }
    
  }, []);

  function postForm(data) {
    if (id) {
      api
        .put(`/product/${id}`, data)
        .then((response) => {
          alert("Sucess");
          history.push("/");
        })
        .catch((error) => alert(error.message));
    } else {
      data.price = Number(data.price);
      api
        .post("/product", data)
        .then((response) => {
          alert("Sucess");
          history.push("/");
        })
        .catch((error) => alert(error.message));
    }
  }

  if(isLoading) {
    return <></>;
  }

  return (
    <Card>
      <CardActions>
        <h1>Menu management panel</h1>
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            {...register("food")}
            id="outlined-textarea"
            InputLabelProps={id && { shrink: true }}
            label="Name"
            placeholder="Name"
            multiline
            required
          />
          <TextField
            select
            id="category"
            InputLabelProps={id && { shrink: true }}
            label="Category"
            placeholder="Category"
            required
           {...register("category")}
            defaultValue={getValues("category")}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            {...register("price")}
            id="outlined-textarea"
            InputLabelProps={id && { shrink: true }}
            label="Value"
            placeholder="Value"
            multiline
            required
          />
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 1 }}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Box>
    </Card>
  );
}
