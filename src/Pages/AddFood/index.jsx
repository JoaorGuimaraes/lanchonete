import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material";

export function AddFood() {
    return (
        <Card>
            <CardActions><h1>Add Food</h1></CardActions>
            <CardContent>
                <Grid container>
                    <Grid item>
                        <form style={{display:"flex", justifyContent:"center" ,alignItems: "center"}}>
                            <TextField id="filled-basic" label="Name" variant="filled" sx={{ margin: "15px" }} />
                            <TextField id="filled-basic" label="Category" variant="filled" sx={{ margin: "15px" }} />
                            <TextField id="filled-basic" label="Value" variant="filled" sx={{ margin: "15px" }} />
                            <Button type="submit">Submit form</Button>
                        </form>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}