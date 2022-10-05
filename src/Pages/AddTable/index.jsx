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

export function AddTable() {
  const { register, handleSubmit, setValue, getValues} = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const id = useParseParams().get("id");

  useEffect(() => {
    if(id){
      api.get(`/table/${id}`)
      .then((response) => {
        setValue("table", response.data.table);
        setValue("client", response.data.client);
        setValue("peoples", response.data.peoples);
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
        .put(`/table/${id}`, data)
        .then((response) => {
          alert("Sucess");
          history.push("/");
        })
        .catch((error) => alert(error.message));
    } else {
      api
        .post("/table", data)
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
        <h1>Table management panel</h1>
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
            {...register("table")}
            id="outlined-textarea"
            InputLabelProps={id && { shrink: true }}
            label="table"
            placeholder="table"
            multiline
            required
          />
          <TextField
            {...register("client")}
            id="outlined-textarea"
            InputLabelProps={id && { shrink: true }}
            label="client"
            placeholder="client"
            multiline
            required
          />
          <TextField
            {...register("peoples")}
            id="outlined-textarea"
            InputLabelProps={id && { shrink: true }}
            label="peoples"
            placeholder="peoples"
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
