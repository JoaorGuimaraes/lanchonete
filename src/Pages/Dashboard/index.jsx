import { Button, Card, CardActions, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../Services/api'
export function Dashboard() {

    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'food', headerName: 'Food', width: 150},
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
    ];

    useEffect(() => {
        api.get("/Produto")
        .then(response => setRows(response.data))
    }, []);

    return (
        <Card sx={{width:"100%"}}>
            <CardActions>
                <Link to="/add-food"><Button color="primary" variant="contained" sx={{ mr: 1 }}>Add</Button></Link>
            </CardActions>
            <CardContent sx={{height:"400px", width:"100%"}}>
                <DataGrid rows={rows} columns={columns} />
            </CardContent>
                
            
        </Card>
    );
}