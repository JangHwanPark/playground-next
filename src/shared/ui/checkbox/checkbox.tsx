'use client';
import React from 'react';

interface CheckboxProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  label?: React.ReactNode;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

const Checkbox = ({ label, indeterminate = false, className, ref, ...props }: CheckboxProps) => {
  // indeterminate 상태 처리 (DOM 직접 접근 필요)
  // 외부에서 ref를 안 줬을 때 내부 로직을 위해 innerRef 사용
  // 만약 외부 ref와 내부 제어를 동시에 완벽히 하려면
  // mergeRefs 유틸리티가 필요할 수 있음
  const innerRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // 상태 계산
  const isChecked = props.checked ?? false;
  const [checked, setChecked] = React.useState(!!props.defaultChecked);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked);
    props.onChange?.(e); // 외부 onChange도 같이 호출
  };

  return (
    <label>
      <span data-checked={checked ? '' : undefined} aria-hidden="true"></span>
      <input
        type="checkbox"
        className="sr-only"
        checked={props.checked ?? checked}
        onChange={handleChange}
      />
      {label && label}
    </label>
  );
};

export { Checkbox };
export type { CheckboxProps };
