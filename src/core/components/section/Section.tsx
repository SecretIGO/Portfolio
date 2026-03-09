import React from 'react';
import './Section.css';
import { DEBUG_FLAGS } from '../../constants/debug_flags';

export type SectionBg = 'default' | 'muted' | 'soft' | 'transparent';
export type SectionPy = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    as?: keyof JSX.IntrinsicElements;
    bg?: SectionBg;
    py?: SectionPy;
}

const Section: React.FC<SectionProps> = ({
    as = 'section',
    className = '',
    bg = 'default',
    py = 'lg',
    children,
    ...rest
}) => {
    const Component = as as any;

    const debugEnabled = DEBUG_FLAGS.ui.all || DEBUG_FLAGS.ui.section;
    const classes = [
        'ui-section',
        `ui-section--bg-${bg}`,
        `ui-section--py-${py}`,
        debugEnabled ? 'is-debug' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const debugAttrs = debugEnabled ? { 'data-debug': 'section', 'data-debug-label': `Section(${bg},${py})` } : {};

    return (
        <Component className={classes} {...debugAttrs} {...rest}>
            {children}
        </Component>
    );
};

export default Section;
