import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  searchPlaceholder: string;
  pageSize?: number;
}

type SortDirection = 'asc' | 'desc';

function DataTable<T extends object>({
  columns,
  rows,
  getRowId,
  onRowClick,
  searchPlaceholder,
  pageSize = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const term = search.trim().toLowerCase();
    return rows.filter((row) =>
      columns.some((column) =>
        String((row as Record<string, unknown>)[column.key] ?? '')
          .toLowerCase()
          .includes(term),
      ),
    );
  }, [rows, search, columns]);

  const sortedRows = useMemo(() => {
    if (!sortKey) return filteredRows;
    const sorted = [...filteredRows].sort((a, b) => {
      const aVal = String((a as Record<string, unknown>)[sortKey] ?? '');
      const bVal = String((b as Record<string, unknown>)[sortKey] ?? '');
      return aVal.localeCompare(bVal, undefined, { numeric: true });
    });
    return sortDirection === 'asc' ? sorted : sorted.reverse();
  }, [filteredRows, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (column: DataTableColumn<T>) => {
    if (column.sortable === false) return;
    if (sortKey === column.key) {
      setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(column.key);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        placeholder={searchPlaceholder}
        className="mb-3 w-full max-w-xs rounded-md border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      />

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column)}
                className={`px-4 py-2 font-medium text-slate-500 dark:text-slate-400 ${
                  column.sortable === false ? '' : 'cursor-pointer select-none'
                }`}
              >
                {column.header}
                {sortKey === column.key ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row) => (
            <tr
              key={getRowId(row)}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-slate-100 dark:border-slate-800 ${
                onRowClick
                  ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800'
                  : ''
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2 text-slate-700 dark:text-slate-200">
                  {column.render
                    ? column.render(row)
                    : String((row as Record<string, unknown>)[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-end gap-2 text-sm">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-slate-300 px-2 py-1 disabled:opacity-40 dark:border-slate-700"
          >
            ‹
          </button>
          <span className="text-slate-500 dark:text-slate-400">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border border-slate-300 px-2 py-1 disabled:opacity-40 dark:border-slate-700"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
