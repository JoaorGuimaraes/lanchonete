import { Button, Card, CardActions, CardContent, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { api } from '../../Services/api';

export function AddFood() {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);

    function postForm(name, category, price) {
        api.post("/Produto", { name: name, category: category, price: price })
            .then(response => alert("Sucess"))
    }

    return (
        <Card>
            <CardActions><h1>Add Food</h1></CardActions>
            <CardContent>
                <Grid container>
                    <Grid item>
                        <form onSubmit={postForm(name, category, price)} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField id="filled-basic" label="Name" variant="filled" sx={{ margin: "15px" }} onChange={event => setName(event)} />
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                onChange={event => setCategory(event)}
                            >
                                <MenuItem value={"fried"}>fried</MenuItem>
                                <MenuItem value={"roast"}>roast</MenuItem>
                                <MenuItem value={"refreshment"}>refreshment</MenuItem>
                            </Select>
                            <TextField id="filled-basic" label="Value" variant="filled" sx={{ margin: "15px" }} onChange={event => setPrice(event)} />
                            <Button type="submit">Submit form</Button>
                        </form>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}