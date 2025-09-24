import { useState, useEffect, useCallback, useMemo, useRef } from "react";

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
  const [state, setState] = useState<PaginatedState<T>>(() => ({
    rows: [],
    pagination: {
      page: Math.max(options?.initialPage ?? 1, 1),
      pageSize: options?.initialPageSize ?? 10,
    },
    totalRowCount: 0,
    loading: false,
  }));

  // Store the latest fetchFn in a ref to avoid it being a dependency
  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  // Store the latest options in a ref
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const { pagination } = state;

  // Create a stable representation of filters
  const filtersString = useMemo(() => {
    if (!options?.filters) return "{}";
    const filteredEntries = Object.entries(options.filters).filter(
      ([, value]) => value !== undefined && value !== ""
    );
    return JSON.stringify(Object.fromEntries(filteredEntries));
  }, [options?.filters]);

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));

    const filters = JSON.parse(filtersString);
    const params = new URLSearchParams({
      page: pagination.page.toString(),
      per_page: pagination.pageSize.toString(),
      ...filters,
    });

    try {
      const res = await fetchFnRef.current(params.toString());

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
      console.error(
        `Paginated fetch failed: ${optionsRef.current?.dataName ?? "data"}`,
        err
      );
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [pagination.page, pagination.pageSize, filtersString]);

  // Track if we should fetch data
  const hasFetched = useRef(false);

  useEffect(() => {
    // Only fetch if we haven't fetched yet or if dependencies changed
    if (
      !hasFetched.current ||
      pagination.page !== 1 ||
      filtersString !== "{}"
    ) {
      hasFetched.current = true;
      fetchData();
    }
  }, [fetchData]);

  return [state, setState, fetchData];
}
