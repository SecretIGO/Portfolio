import React from 'react';
import './NavLink.css';
import { DEBUG_FLAGS } from '../../constants/debug_flags';

type IconType = React.ElementType<{ size?: number | string; className?: string }>;

export type NavLinkSize = 'sm' | 'md';

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    size?: NavLinkSize;
    rightIcon?: IconType;
    iconSize?: number | string;
}

const NavLink = ({
    children,
    href,
    size = 'sm',
    rightIcon: RightIcon,
    iconSize = 16,
    className = '',
    ...rest
}: NavLinkProps): React.ReactElement => {
    const debugEnabled = DEBUG_FLAGS.ui.all || DEBUG_FLAGS.ui.navLink;
    const classes = [
        'ui-nav-link',
        `ui-nav-link--${size}`,
        RightIcon ? 'ui-nav-link--has-icon' : '',
        debugEnabled ? 'is-debug' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <a href={href} className={classes} {...rest}>
            {children}
            {RightIcon && (
                <span className="ui-nav-link__icon" aria-hidden="true">
                    <RightIcon size={iconSize} />
                </span>
            )}
        </a>
    );
};

export default NavLink;
