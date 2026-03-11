import React from 'react';
import './Button.css';
import { DEBUG_FLAGS } from '../../../constants/debug_flags';
import ButtonBase from '../ButtonBase';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRadius = 'sm' | 'md' | 'lg' | 'full';
export type ButtonAnimation = 'none' | 'hover-lift' | 'hover-scale' | 'pulse';

type IconType = React.ElementType<{ size?: number | string; className?: string }>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    radius?: ButtonRadius;
    iconSize?: number | string;
    fullWidth?: boolean;
    animation?: ButtonAnimation;
    leftIcon?: IconType;
    rightIcon?: IconType;
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    disabled?: boolean;
}

const Button = ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    radius = 'md',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    iconSize = 18,
    animation = 'none',
    fullWidth = false,
    loading = false,
    disabled,
    type = 'button',
    href,
    ...rest
}: ButtonProps): React.ReactElement => {
    const debugEnabled = DEBUG_FLAGS.ui.all || DEBUG_FLAGS.ui.button;
    const classes = [
        'ui-btn',
        `ui-btn--${variant}`,
        `ui-btn--${size}`,
        `ui-btn--radius-${radius}`,
        animation !== 'none' ? `ui-btn--anim-${animation}` : '',
        fullWidth ? 'ui-btn--block' : '',
        loading ? 'is-loading' : '',
        debugEnabled ? 'is-debug' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const sharedAttrs: Record<string, string> = debugEnabled
        ? { 'data-debug': 'button', 'data-debug-label': `Button(${variant},${size})` }
        : {};

    return (
        <ButtonBase href={href} className={classes} loading={loading} disabled={disabled} type={type} sharedAttrs={sharedAttrs} {...rest}>
            {LeftIcon && (
                <span className="ui-btn__icon ui-btn__icon--left" aria-hidden="true">
                    <LeftIcon size={iconSize} />
                </span>
            )}
            <span className="ui-btn__label">{children}</span>
            {RightIcon && (
                <span className="ui-btn__icon ui-btn__icon--right" aria-hidden="true">
                    <RightIcon size={iconSize} />
                </span>
            )}
            {loading && <span className="ui-btn__spinner" aria-hidden="true" />}
        </ButtonBase>
    );
};

export default Button;
