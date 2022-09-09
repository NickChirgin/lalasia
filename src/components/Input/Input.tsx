import React from 'react';

import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  value: string;
  onChange?: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  className,
  onChange,
  disabled,
  ...rest
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputClassName = cn(className, disabled && 'input_disabled');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, search: e.target.value });
  };
  return (
    <input
      type="text"
      placeholder={value}
      className={inputClassName}
      onChange={handleChange}
      value={searchParams.get('search') as string}
      disabled={disabled}
      {...rest}
    />
  );
};

export default Input;
