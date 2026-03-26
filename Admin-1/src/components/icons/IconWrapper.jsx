import { forwardRef } from "react";

const IconWrapper = forwardRef(({
  children,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}, ref) => {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
});

IconWrapper.displayName = "Icon";

export default IconWrapper;