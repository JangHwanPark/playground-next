import React from 'react';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement;
}

const Slot = ({ children, ...slotProps }: SlotProps) => {
  const childProps = children.props as any;

  // className 병합(slot + child)
  const mergedClassName =
    [slotProps.className, childProps.className].filter(Boolean).join(' ') || undefined;

  const mergedStyle = {
    ...(slotProps.style || {}),
    ...(childProps.style || {}),
  };

  return React.cloneElement(children, {
    ...childProps,
    ...slotProps,
    className: mergedClassName,
    style: mergedStyle,
  });
};

export { Slot };
export type { SlotProps };