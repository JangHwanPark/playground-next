import React from 'react';

const mergeRefs =
  <T,>(...refs: (React.Ref<T> | undefined)[]) =>
  (node: T | null) =>
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as { current: T | null }).current = node;
    });

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  // children: React.ReactElement;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

const Slot = ({ children, ref, ...slotProps }: SlotProps) => {
  // 태그 유효성 검사
  if (!React.isValidElement(children)) {
    return null;
  }
  
  const childProps = children.props as any;

  // ref 합치기(원래ref + 외부에서 받은 ref)
  const childRef = (children as any).ref;
  const mergedRef = mergeRefs(ref, childRef);

  // className 병합(slot + child)
  const mergedClassName =
    [slotProps.className, childProps.className].filter(Boolean).join(' ') || undefined;

  // 스타일 병합
  const mergedStyle = {
    ...(slotProps.style || {}),
    ...(childProps.style || {}),
  };

  return React.cloneElement(children, {
    ...childProps,
    ...slotProps,
    className: mergedClassName,
    style: mergedStyle,
    ref: mergedRef,
  });
};

export { Slot };
export type { SlotProps };