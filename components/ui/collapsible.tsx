"use client"

import * as React from "react"

// Basit bir collapsible bileşeni oluşturalım
interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ children, className, open, defaultOpen, onOpenChange, disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen || false)
    
    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open)
      }
    }, [open])

    const handleOpenChange = (value: boolean) => {
      if (disabled) return
      setIsOpen(value)
      onOpenChange?.(value)
    }

    return (
      <div ref={ref} data-state={isOpen ? "open" : "closed"} className={className} {...props}>
        {children}
      </div>
    )
  }
)
Collapsible.displayName = "Collapsible"

// Basit trigger bileşeni
const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

// Basit content bileşeni
const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
})
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
