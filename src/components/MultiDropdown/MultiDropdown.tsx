import React from 'react';
import { useState } from 'react';

import cn from 'classnames';

import mdStyles from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: string[];
  value: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  text: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  text,
  ...rest
}) => {
  const [isShown, setIsShown] = useState(false);
  const cnButton = cn(
    mdStyles.button,
    disabled && mdStyles.button__disabled,
    isShown && mdStyles.button_focus
  );
  const clickHandler = () => setIsShown((prev) => !prev);
  return (
    <div>
      <div {...rest} className={cnButton} onClick={clickHandler}>
        {text}
      </div>
      <div className={mdStyles.menu} >
      {!disabled &&
        isShown &&
        options.map((option) => (
          <div
            key={option}
            className={`${mdStyles.dropdown__option} ${
              text.includes(option) && mdStyles['dropdown__option-current']
            }`}
            onClick={() => onChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiDropdown;
