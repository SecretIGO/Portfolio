import React from 'react';

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    target?: string;
    rel?: string;
    loading?: boolean;
    sharedAttrs?: Record<string, string>;
    children: React.ReactNode;
}

const ButtonBase = ({
    href,
    target,
    rel,
    className,
    loading = false,
    disabled,
    type = 'button',
    sharedAttrs = {},
    children,
    ...rest
}: ButtonBaseProps): React.ReactElement => {
    if (href) {
        const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <a href={href} target={target} rel={rel} className={className} {...sharedAttrs} {...anchorProps}>
                {children}
            </a>
        );
    }

    return (
        <button
            className={className}
            disabled={disabled || loading}
            {...(loading ? { 'aria-busy': true } : {})}
            {...sharedAttrs}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
};

export default ButtonBase;
