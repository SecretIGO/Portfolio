import React from 'react';
import './Tag.css';
import { DEBUG_FLAGS } from '../../constants/debug_flags';

type IconType = React.ElementType<{ size?: number | string; className?: string }>;

export type TagVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type TagSize = 'sm' | 'md' | 'lg';
export type TagRadius = 'sm' | 'md' | 'lg' | 'full';

export interface TagProps extends React.HTMLAttributes<HTMLElement> {
    as?: keyof JSX.IntrinsicElements;
    variant?: TagVariant;
    size?: TagSize;
    radius?: TagRadius;
    leftIcon?: IconType;
    rightIcon?: IconType;
    leftIconName?: string; // For DevIcons
    rightIconName?: string; // For DevIcons
    iconSize?: number | string;
    iconColor?: string; // Optional color for the icon
}

const Tag: React.FC<TagProps> = ({
    as = 'span',
    className = '',
    variant = 'soft',
    size = 'md',
    radius = 'full',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    leftIconName,
    rightIconName,
    iconSize = 14,
    iconColor,
    children,
    ...rest
}) => {
    const Component = as as any;

    const debugEnabled = DEBUG_FLAGS.ui.all || DEBUG_FLAGS.ui.tag;
    const classes = [
        'ui-tag',
        `ui-tag--${variant}`,
        `ui-tag--${size}`,
        `ui-tag--radius-${radius}`,
        debugEnabled ? 'is-debug' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const debugAttrs = debugEnabled ? { 'data-debug': 'tag', 'data-debug-label': `Tag(${variant},${size})` } : {};

    // Inline styles for the icon
    const iconStyle = {
        fontSize: typeof iconSize === 'number' ? `${iconSize}px` : iconSize,
        color: iconColor,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const renderIcon = (iconName?: string, IconComponent?: IconType, position: 'left' | 'right' = 'left') => {
        if (iconName) {
            return (
                <span className={`ui-tag__icon ui-tag__icon--${position}`} style={iconStyle} aria-hidden="true">
                    <i className={`devicon-${iconName.toLowerCase()}-plain`}></i>
                </span>
            );
        }

        if (IconComponent) {
            return (
                <span className={`ui-tag__icon ui-tag__icon--${position}`} style={iconStyle} aria-hidden="true">
                    <IconComponent size={iconSize} />
                </span>
            );
        }

        return null;
    };

    return (
        <Component className={classes} {...debugAttrs} {...rest}>
            {renderIcon(leftIconName, LeftIcon, 'left')}
            <span className="ui-tag__label">{children}</span>
            {renderIcon(rightIconName, RightIcon, 'right')}
        </Component>
    );
};

export default Tag;
