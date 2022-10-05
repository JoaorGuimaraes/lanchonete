import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../Services/api";
import { FiTrash2, FiEdit } from "react-icons/fi";

export function Dashboard() {
    
  const [refresh, setRefresh] = useState(true);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "food", headerName: "Food", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FiTrash2 />}
          showInMenu
          label="Delete"
          onClick={() => {
            api.delete(`/product/${params.id}`);
            setRefresh(true);
          }}
        />,
        <GridActionsCellItem icon={<FiEdit />} label="Edit" onClick={() => history.push(`/add-food?id=${params.id}`)}/>,
      ],
    },
  ];
  const history = useHistory();

  useEffect(() => {
    if (refresh) {
        api
          .get("/product")
          .then((response) => setRows(response.data))
          .catch(() => alert("A requisição falhou"))
          .finally(() => setRefresh(false));
      }
    }, [refresh]);

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title="Menu"
        subheader={
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => history.push("/add-food")}
          >
            add food
          </Button>
        }
      />
      <CardContent sx={{ height: "400px", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </CardContent>
    </Card>
  );
}
