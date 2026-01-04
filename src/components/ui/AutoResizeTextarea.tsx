import { cn } from '@/utils/cn'
import { useEffect, useRef } from 'react'

interface AutoResizeTextareaParams extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  minRows?: number
  maxRows?: number
}

const AutoResizeTextarea = ({
  value,
  onChange,
  minRows = 3,
  maxRows,
  className,
  ...props
}: AutoResizeTextareaParams) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  const resize = () => {
    const el = ref.current
    if (!el) return

    const computed = window.getComputedStyle(el)
    const lineHeight = parseFloat(computed.lineHeight)

    const minHeight = lineHeight * minRows + 16
    const maxHeight = maxRows ? lineHeight * maxRows + 16 : Infinity

    el.style.height = 'auto'

    const newHeight = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight)

    el.style.height = `${newHeight}px`
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }

  useEffect(() => {
    resize()
  }, [value])

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      rows={1}
      className={cn(
        'w-full rounded-md border px-3 py-2 text-sm resize-none overflow-hidden max-h-60',
        className
      )}
      {...props}
    />
  )
}

export default AutoResizeTextarea
