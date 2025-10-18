import React from 'react';
import './IconButton.css';
import { DEBUG_FLAGS } from '../../_constants/debug_flags';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconButtonRadius = 'sm' | 'md' | 'lg' | 'full';
export type IconButtonAnimation = 'none' | 'hover-lift' | 'hover-scale' | 'pulse';

type IconType = React.ElementType<{ size?: number | string; className?: string }>;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconType;
    ariaLabel?: string;
    href?: string;
    target?: string;
    rel?: string;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    radius?: IconButtonRadius;
    animation?: IconButtonAnimation;
    iconSize?: number | string;
    loading?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
    icon: Icon,
    ariaLabel,
    href,
    target,
    rel,
    className = '',
    variant = 'secondary',
    size = 'md',
    radius = 'md',
    animation = 'none',
    iconSize = 18,
    loading = false,
    disabled,
    type = 'button',
    ...rest
}) => {
    const debugEnabled = DEBUG_FLAGS.ui.all || DEBUG_FLAGS.ui.iconButton;
    const classes = [
        'ui-icon-btn',
        `ui-icon-btn--${variant}`,
        `ui-icon-btn--${size}`,
        `ui-icon-btn--radius-${radius}`,
        animation !== 'none' ? `ui-icon-btn--anim-${animation}` : '',
        loading ? 'is-loading' : '',
        debugEnabled ? 'is-debug' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const ariaBusy = loading ? { 'aria-busy': true } : {};
    const ariaProps = ariaLabel ? { 'aria-label': ariaLabel } : {};
    const debugAttrs = debugEnabled ? { 'data-debug': 'iconButton', 'data-debug-label': `IconButton(${variant},${size})` } : {};

    return (
        <a href={href} target={target} rel={rel}
        >
            <button
                className={classes}
                disabled={disabled || loading}
                {...ariaBusy}
                {...ariaProps}
                {...debugAttrs}
                type={type}
                {...rest}
            >
                <Icon size={iconSize} />
                {loading ? <span className="ui-icon-btn__spinner" aria-hidden="true" /> : null}
            </button>
        </a>
    );
};

export default IconButton;

