import { Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useState } from "react";

type TableComponentProps = {
  columns: GridColDef[];
  rows: any[];
  onSelect?: (selectedRows: any[]) => void;
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
  onSelect,
  onRowClick,
}: TableComponentProps) {
  const paginationModel = { page: 0, pageSize };
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>(
    []
  );

  // Handle row click
  const handleRowClick = (params: GridRowParams) => {
    if (onRowClick) {
      onRowClick(params);
    }
  };

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectedRowIds(newSelection);
    // Get full selected rows (optional)
    const selectedRowsData = rows.filter((row) =>
      newSelection.includes(row.id)
    );
    // console.log("Selected Rows Data:", selectedRowsData);
    onSelect?.(selectedRowsData);
  };

  return (
    <Paper className="w-full h-full min-h-[400px]">
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
        onRowSelectionModelChange={handleSelectionChange}
        rowHeight={rowHeight}
        onRowClick={handleRowClick}
        sx={{
          border: 0,
          minWidth: "900px",
          height: 500,
          paddingLeft: 2,
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#e65800 !important", // Replace with your desired color
          },
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
