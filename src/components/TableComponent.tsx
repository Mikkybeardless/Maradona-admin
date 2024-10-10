import { Paper } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

type TableComponentProps = {
    columns: GridColDef[]
    rows: any[]
    paginationActive: boolean
    pageSize: number
    rowHeight?: number
    showCheckbox?: boolean
}

export default function MuiTableComponent({
    columns,
    rows,
    paginationActive,
    pageSize,
    rowHeight,
    showCheckbox,
}: TableComponentProps) {
    const paginationModel = { page: 0, pageSize }

    return (
        <Paper className="flex-1 custom-scrollbar overflow-hidden">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: paginationActive
                        ? { paginationModel }
                        : undefined,
                }}
                pageSizeOptions={[5, 10, 15, 20]}
                checkboxSelection={
                    typeof showCheckbox === "undefined" ? true : showCheckbox
                }
                disableColumnFilter={true}
                disableColumnMenu={true}
                disableRowSelectionOnClick={true}
                rowHeight={rowHeight}
                sx={{ border: 0 }}
            />
        </Paper>
    )
}
