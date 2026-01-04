import { cn } from "@/utils/cn";

interface SortableHeaderParams {
  label: string;
  field: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  className: string;
}

const SortableHeader = ({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
  className
}: SortableHeaderParams) => {
  const isActive = sortBy === field;

  const onRightClick = (e: React.MouseEvent) => {
    e.preventDefault()

    onSort("createdAt")
  }

  return (
    <th
      onClick={() => onSort(field)}
      onContextMenu={onRightClick}
      className={cn("cursor-pointer select-none px-4 py-3 text-left font-medium", className)}
    >
      <div className="flex items-center gap-1">
        {label}{"  "}
        {isActive && (sortOrder === 'asc' ? '▲' : '▼')}
      </div>
    </th>
  );
};

export default SortableHeader