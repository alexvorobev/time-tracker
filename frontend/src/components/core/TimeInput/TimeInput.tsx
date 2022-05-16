import { ChangeEvent, FC } from 'react';
import { Input, InputProps } from '@chakra-ui/react';

const TIME_REGEXP = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const TimeInput: FC<InputProps> = (props) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    console.log(TIME_REGEXP.test(value));

    if (value && TIME_REGEXP.test(value)) {
      props?.onChange?.(event);
    }
  };

  return <Input {...props} onChange={onChange} />;
};

export default TimeInput;
