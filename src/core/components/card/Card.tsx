import React from 'react';
import './Card.css';
import { DEBUG_FLAGS } from '../../constants/debug_flags';

export type CardVariant = 'elevated' | 'outline' | 'soft' | 'ghost';
export type CardRadius = 'sm' | 'md' | 'lg' | 'xl';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardAnimation = 'none' | 'hover-lift' | 'hover-scale' | 'pulse';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
    as?: keyof JSX.IntrinsicElements;
    variant?: CardVariant;
    radius?: CardRadius;
    padding?: CardPadding;
    animation?: CardAnimation;
}

const Card = ({
    as = 'div',
    className = '',
    variant = 'outline',
    radius = 'md',
    padding = 'md',
    animation = 'none',
    children,
    ...rest
}: CardProps): React.ReactElement => {
    const Component = as as React.ElementType;

    const debugEnabled = DEBUG_FLAGS.ui.all || DEBUG_FLAGS.ui.card;
    const classes = [
        'ui-card',
        `ui-card--${variant}`,
        `ui-card--radius-${radius}`,
        `ui-card--p-${padding}`,
        animation !== 'none' ? `ui-card--anim-${animation}` : '',
        debugEnabled ? 'is-debug' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const debugAttrs: Record<string, string> = debugEnabled
        ? { 'data-debug': 'card', 'data-debug-label': `Card(${variant},${padding})` }
        : {};

    return (
        <Component className={classes} {...debugAttrs} {...rest}>
            {children}
        </Component>
    );
};

export default Card;
