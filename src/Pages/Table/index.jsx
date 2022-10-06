import { Button, Card, CardContent, CardHeader, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FiClipboard, FiEdit, FiTrash2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { api } from "../../Services/api";

export function Table() {
  const [refresh, setRefresh] = useState(true);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "table", headerName: "table", width: 150 },
    { field: "peoples", headerName: "peoples", width: 150 },
    { field: "client", headerName: "client", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <Tooltip title="delete" arrow>
          <GridActionsCellItem
            icon={<FiTrash2 />}
            label="Delete"
            onClick={() => {
              api.delete(`/table/${params.id}`);
              setRefresh(true);
            }}
          />
        </Tooltip>,

        <Tooltip title="edit" arrow>
          <GridActionsCellItem
            icon={<FiEdit />}
            label="Edit"
            onClick={() => history.push(`/table?id=${params.id}`)}
          />
        </Tooltip>,

        <Tooltip title="check" arrow>
          <GridActionsCellItem
            icon={<FiClipboard />}
            label="Edit"
            onClick={() => history.push(`/check?id=${params.id}`)}
          />
        </Tooltip>,
      ],
    },
  ];
  const history = useHistory();

  useEffect(() => {
    if (refresh) {
      api
        .get("/table")
        .then((response) => setRows(response.data))
        .catch(() => alert("A requisição falhou"))
        .finally(() => setRefresh(false));
    }
  }, [refresh]);

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title="Clients"
        subheader={
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push("/table")}
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
