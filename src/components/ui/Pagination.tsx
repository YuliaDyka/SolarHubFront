import { useEffect } from 'react'
import { Button } from './Button'

interface PaginationParams {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const Pagination = ({ page, totalPages, onChange }: PaginationParams) => {

  useEffect(() => {
    if (page > totalPages) {
      console.log("FUCK")
      onChange(1)
    }
  }, [totalPages])

  return (
    <div className="flex gap-2 items-center mt-4">
      <Button disabled={page === 1} onClick={() => onChange(page - 1)} variant="ghost" size="sm">
        Prev
      </Button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        variant="ghost"
        size="sm"
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination
