import React from 'react';
import Loader from '@components/Loader';
import cn from 'classnames';

import buttonStyles from './Button.module.scss';

export enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  loading = false,
  color = ButtonColor.primary,
  children,
  className,
  disabled,
  ...props
}) => {
  const colour = `button_color-${color}`;
  const buttonClass = cn(
    className,
    buttonStyles.button,
    loading || disabled ? buttonStyles.button_disabled : '',
    buttonStyles[colour]
  );
  return !loading ? (
    <button className={buttonClass} {...props} disabled={disabled}>
      {children}
    </button>
  ) : (
    <button className={buttonClass} disabled={disabled} {...props}>
      <Loader />
      {children}
    </button>
  );
};

export default Button;
