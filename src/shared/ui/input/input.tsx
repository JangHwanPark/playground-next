"use client";
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = ({
  invalid,
  disabled,
  className,
  onFocus,
  onBlur,
  ref,
  ...rest
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  const [focused, setFocused] = React.useState(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      className={className}
      data-disabled={disabled ? '' : undefined}
      data-invalid={invalid ? '' : undefined}
      data-focused={focused ? '' : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  );
};

export { Input };
export type { InputProps };