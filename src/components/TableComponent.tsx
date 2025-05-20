import { Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";

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
  onRowClick?: (params: GridRowParams) => void;
};

export default function MuiTableComponent({
  columns,
  rows,
  paginationActive,
  pageSize,
  rowHeight,
  showCheckbox,
  headerStyle,
  onRowClick,
}: TableComponentProps) {
  const paginationModel = { page: 0, pageSize };
  // Handle row click
  const handleRowClick = (params: GridRowParams) => {
    if (onRowClick) {
      onRowClick(params);
    }
  };

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
        onRowClick={handleRowClick}
        sx={{
          border: 0,
          paddingLeft: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: headerStyle?.backgroundColor ?? "transparent",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: headerStyle?.fontWeight ?? "normal",
          },
          "& .MuiDataGrid-row": {
            cursor: `${onRowClick && "pointer"}`, // Always show pointer cursor on rows
          },
        }}
      />
    </Paper>
  );
}
