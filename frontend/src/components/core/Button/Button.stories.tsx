import Button from "./Button";
import { action } from '@storybook/addon-actions';

export default {
    component: Button,
    title: 'Core UI / Button',
    argTypes: {
        variant: {
          options: ['primary', 'secondary'],
          control: { type: 'radio' },
          default: 'primary',
        },
        loading: {
          control: { type: 'boolean' },
        },
        ariaLabel: {
          control: { type: 'text' },
        }
      }
};

export const normal = () => <Button onClick={action('on click')}>Primary</Button>;