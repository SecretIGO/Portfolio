import React from 'react';
import './Tag.css';
import { DEBUG_FLAGS } from '../../_constants/debug_flags';

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
  iconSize?: number | string;
}

const Tag: React.FC<TagProps> = ({
  as = 'span',
  className = '',
  variant = 'soft',
  size = 'md',
  radius = 'full',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconSize = 14,
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

  return (
    <Component className={classes} {...debugAttrs} {...rest}>
      {LeftIcon ? (
        <span className="ui-tag__icon ui-tag__icon--left" aria-hidden="true">
          <LeftIcon size={iconSize} />
        </span>
      ) : null}
      <span className="ui-tag__label">{children}</span>
      {RightIcon ? (
        <span className="ui-tag__icon ui-tag__icon--right" aria-hidden="true">
          <RightIcon size={iconSize} />
        </span>
      ) : null}
    </Component>
  );
};

export default Tag;
