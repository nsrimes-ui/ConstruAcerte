import * as React from "react"
import { OTPInput as OTPInputPrimitive } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const OTPInput = React.forwardRef(({
  className,
  containerClassName,
  ...props
}, ref) => (
  <OTPInputPrimitive
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-ring",
      className
    )}
    {...props}
  />
))
OTPInput.displayName = "OTPInput"

const OTPInputSeparator = React.forwardRef(({
  ...props
}, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
OTPInputSeparator.displayName = "OTPInputSeparator"

export { OTPInput, OTPInputSeparator }
