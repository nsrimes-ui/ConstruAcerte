import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = FormProvider

const FormField = ({
  name,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormFieldPrimitive.Root {...props}>
          <FormFieldPrimitive.Label>{props.label}</FormFieldPrimitive.Label>
          <FormFieldPrimitive.Control asChild>
            {React.cloneElement(props.children, { ...field, ...props.children.props })}
          </FormFieldPrimitive.Control>
          {error && (
            <FormFieldPrimitive.Message>
              {error.message}
            </FormFieldPrimitive.Message>
          )}
        </FormFieldPrimitive.Root>
      )}
    />
  )
}

const FormFieldPrimitive = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "space-y-2",
      className
    )}
    {...props}
  />
))
FormFieldPrimitive.displayName = "FormFieldPrimitive"

const FormLabel = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({
  ...props
}, ref) => (
  <Slot ref={ref} {...props} />
))
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  const { formState: { errors } } = useFormContext()
  const body = errors[props.name]?.message || children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      className={cn(
        "text-sm font-medium text-destructive",
        className
      )}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  Form,
  FormField,
  FormItem: FormFieldPrimitive,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
