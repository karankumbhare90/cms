import React from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'rounded' | 'circular' | 'text'
  dark?: boolean
  width?: string | number
  height?: string | number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  dark = false,
  width,
  height,
  style,
  ...props
}) => {
  const variantClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'text'
        ? 'rounded-md h-4 my-1'
        : variant === 'rounded'
          ? 'rounded-xl'
          : 'rounded-none'

  const customStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  }

  return (
    <div
      className={`skeleton-shimmer ${dark ? 'skeleton-dark' : ''} ${variantClass} ${className}`}
      style={customStyle}
      aria-hidden="true"
      {...props}
    />
  )
}

export const SkeletonText: React.FC<{
  lines?: number
  className?: string
  dark?: boolean
  lastLineWidth?: string
}> = ({ lines = 3, className = '', dark = false, lastLineWidth = '60%' }) => {
  return (
    <div className={`space-y-2.5 w-full ${className}`}>
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="text"
          dark={dark}
          className="w-full h-3.5"
          style={idx === lines - 1 ? { width: lastLineWidth } : undefined}
        />
      ))}
    </div>
  )
}

export const SkeletonButton: React.FC<{
  className?: string
  dark?: boolean
  width?: string
  height?: string
}> = ({ className = '', dark = false, width = '140px', height = '46px' }) => {
  return (
    <Skeleton
      variant="rounded"
      dark={dark}
      className={`rounded-full ${className}`}
      style={{ width, height }}
    />
  )
}

export const SkeletonCircle: React.FC<{
  size?: number | string
  className?: string
  dark?: boolean
}> = ({ size = 48, className = '', dark = false }) => {
  const sizeStr = typeof size === 'number' ? `${size}px` : size
  return (
    <Skeleton
      variant="circular"
      dark={dark}
      className={`flex-shrink-0 ${className}`}
      style={{ width: sizeStr, height: sizeStr }}
    />
  )
}
