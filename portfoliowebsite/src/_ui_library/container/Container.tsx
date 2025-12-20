import React from 'react';
import './Container.css';
import { DEBUG_FLAGS } from '../../_constants/debug_flags';

export type ContainerMax = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'responsive';
export type ContainerDisplay = 'block' | 'flex' | 'grid';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  max?: ContainerMax;
  padding?: ContainerPadding;
  display?: ContainerDisplay;
  direction?: FlexDirection; // only used when display === 'flex'
  justify?: FlexJustify;     // only used when display === 'flex'
  align?: FlexAlign;         // only used when display === 'flex'
  gap?: FlexGap;             // only used when display === 'flex'
}

const Container: React.FC<ContainerProps> = ({
  as = 'div',
  className = '',
  max = 'xl',
  padding = 'responsive',
  display = 'block',
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap = 'md',
  children,
  ...rest
}) => {
  const Component = as as any;

  const debugEnabled = DEBUG_FLAGS.ui.all || DEBUG_FLAGS.ui.container;
  const classes = [
    'ui-container',
    `ui-container--${max}`,
    `ui-container--p-${padding}`,
    display !== 'block' ? `ui-container--display-${display}` : '',
    display === 'flex' ? `ui-container--flex-${direction}` : '',
    display === 'flex' ? `ui-container--justify-${justify}` : '',
    display === 'flex' ? `ui-container--items-${align}` : '',
    display === 'flex' && gap !== 'none' ? `ui-container--gap-${gap}` : '',
    debugEnabled ? 'is-debug' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const debugAttrs = debugEnabled ? { 'data-debug': 'container', 'data-debug-label': `Container(${max},${padding},${display}${display==='flex'?','+direction:''})` } : {};

  return (
    <Component className={classes} {...debugAttrs} {...rest}>
      {children}
    </Component>
  );
};

export default Container;
