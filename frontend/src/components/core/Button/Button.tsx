import { FC, HTMLProps } from "react";
import styled from "@emotion/styled";

export interface Props extends HTMLProps<HTMLButtonElement> {
    variant?: 'primary' | 'secondary',
    loading?: boolean,
    ariaLabel?: string;
};

const StyledButton = styled.button`
    border: 0;
    outline: 0;
    background: #fff;
    cursor: pointer;
    padding: 8px 16px;
    background: var(--primary);
    border-radius: 4px;
    font-weight: bold;
    color: #fff;

    &:hover {
        background: linear-gradient(0deg, rgba(42, 89, 254, 0.8), rgba(42, 89, 254, 0.8)), #FFFFFF;
    }

    &:active {
        background: linear-gradient(0deg, rgba(42, 89, 254, 0.6), rgba(42, 89, 254, 0.6)), #FFFFFF;
    }

    &:disabled {
        background: linear-gradient(0deg, rgba(42, 89, 254, 0.3), rgba(42, 89, 254, 0.3)), #FFFFFF;
    }
`;

const Button:FC<Props> = ({children, ref, ariaLabel, disabled, loading, onClick}) => <StyledButton
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      ref={ref}>{children}</StyledButton>;

export default Button;
