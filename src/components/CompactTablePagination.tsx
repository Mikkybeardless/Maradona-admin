import { Pagination } from "@table-library/react-table-library/pagination"
import { Data, TableNode } from "@table-library/react-table-library/types/table"

type TableType = {
    tableData: Data<TableNode>
    pagination: Pagination<TableNode>
}

export default function CompactTablePagination({
    tableData,
    pagination,
}: TableType) {
    return (
        <div className="flex gap-x-1.5 items-center text-xs">
            {[...pagination.state.getPages(tableData)].map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={`${
                        pagination.state.page === index
                            ? "font-bold  bg-gray-200"
                            : "font-light hover:underline"
                    } p-1 px-2`}
                    onClick={() => pagination.fns.onSetPage(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}
