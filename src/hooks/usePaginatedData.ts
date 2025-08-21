import { useState, useEffect, useCallback } from "react";

interface Pagination {
  page: number;
  pageSize: number;
}

interface PaginatedState<T> {
  rows: T[];
  pagination: Pagination;
  totalRowCount: number;
  loading: boolean;
}

interface UsePaginatedDataOptions {
  initialPage?: number;
  initialPageSize?: number;
  filters?: Record<string, string | number | boolean | undefined>;
  dataName?: string;
}

export function usePaginatedData<T>(
  fetchFn: (query?: string) => Promise<any>,
  options?: UsePaginatedDataOptions
): [
  PaginatedState<T>,
  (updater: (prev: PaginatedState<T>) => PaginatedState<T>) => void,
  () => void
] {
  const [state, setState] = useState<PaginatedState<T>>({
    rows: [],
    pagination: {
      page: options?.initialPage ?? 1,
      pageSize: options?.initialPageSize ?? 10,
    },
    totalRowCount: 0,
    loading: false,
  });

  const { pagination } = state;

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));

    const params = new URLSearchParams({
      page: pagination.page.toString(),
      per_page: pagination.pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(options?.filters ?? {}).filter(
          ([, value]) => value !== undefined && value !== ""
        )
      ),
    });

    try {
      const res = await fetchFn(params.toString());
      console.log(
        `${
          options?.dataName ? options?.dataName : "paginated"
        } fetch response:`,
        res.data
      );
      setState((prev) => ({
        ...prev,
        rows: res.data.data,
        pagination: {
          page: res.data.current_page,
          pageSize: res.data.per_page,
        },
        totalRowCount: res.data.total,
        loading: false,
      }));
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      // toast.error(() => {
      //   switch (err.status) {
      //     case 500:
      //       return `Failed to fetch ${
      //         options?.dataName ? options?.dataName : "data"
      //       }. \n check your internet connection`;
      //     default:
      //       return "An error occurred. Please try again.";
      //   }
      // });
      console.error(
        `Paginated fetch failed: ${
          options?.dataName ? options?.dataName : "data"
        }`,
        err
      );
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [
    fetchFn,
    pagination.page,
    pagination.pageSize,
    JSON.stringify(options?.filters),
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state, setState, fetchData];
}
