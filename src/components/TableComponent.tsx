import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type TableComponentProps = {
  columns: GridColDef[];
  rows: any[];
  paginationActive: boolean;
  pageSize: number;
  rowHeight?: number;
  showCheckbox?: boolean;
  headerStyle?: {
    backgroundColor?: string;
    fontWeight?: string | number;
  };
};

export default function MuiTableComponent({
  columns,
  rows,
  paginationActive,
  pageSize,
  rowHeight,
  showCheckbox,
  headerStyle,
}: TableComponentProps) {
  const paginationModel = { page: 0, pageSize };

  return (
    <Paper className="flex-1 custom-scrollbar overflow-hidden">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: paginationActive ? { paginationModel } : undefined,
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection={showCheckbox}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableRowSelectionOnClick={true}
        rowHeight={rowHeight}
        sx={{
          border: 0,
          paddingLeft: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: headerStyle?.backgroundColor ?? "transparent",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: headerStyle?.fontWeight ?? "normal",
          },
        }}
      />
    </Paper>
  );
}
