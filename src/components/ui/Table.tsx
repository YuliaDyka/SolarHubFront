import { cn } from '@/utils/cn'
import { type HTMLAttributes } from 'react'
import SortableHeader from './SortableHeader'

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('bg-gray-50 text-gray-600', className)} {...props} />
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('border-t border-gray-200 hover:bg-gray-50', className)} {...props} />
}

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn('px-4 py-3 text-left font-medium select-none', className)} {...props} />
}

export function TableSortableHead({
  className,
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
  
  ...props
}: {
  label: string
  field: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onSort: (field: string) => void
} & HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <SortableHeader
      label={label}
      field={field}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSort={onSort}
      className={cn('bg-gray-50 text-gray-600', className)}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-4 py-3 text-gray-900', className)} {...props} />
}
