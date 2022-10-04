import { Button, Card, CardActions, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
export function Dashboard() {
    const rows = [
        { id: 1, food: "bread", category: "natural", price: 5 }
    ];

    const columns = [
        { field: 'food', headerName: 'Food', width: 150},
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
    ];
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