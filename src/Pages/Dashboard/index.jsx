import { Button, Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { api } from "../../Services/api";

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
        <Tooltip title="edit" arrow>
          <GridActionsCellItem
            icon={<FiTrash2 />}
            label="Delete"
            onClick={() => {
              api.delete(`/product/${params.id}`);
              setRefresh(true);
            }}
          />
        </Tooltip>,
        <Tooltip title="edit" arrow>
          <GridActionsCellItem
            icon={<FiEdit />}
            label="Edit"
            onClick={() => history.push(`/add-food?id=${params.id}`)}
          />
        </Tooltip>,
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
            onClick={() => history.push("/add-food")}
          >
            add
          </Button>
        }
      />
      <CardContent>
        <DataGrid autoHeight rows={rows} columns={columns} />
      </CardContent>
    </Card>
  );
}
