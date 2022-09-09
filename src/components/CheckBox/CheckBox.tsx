import { useState } from 'react';

type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (value: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  disabled,
  onChange,
  ...rest
}) => {
  const [check, setCheck] = useState(checked);
  return !disabled ? (
    <input
      type="checkbox"
      checked={check}
      onChange={() => {
        setCheck((prev) => !prev);
        onChange(!check);
      }}
      {...rest}
    />
  ) : (
    <input type="checkbox" {...rest} checked={checked} disabled />
  );
};

export default CheckBox;
