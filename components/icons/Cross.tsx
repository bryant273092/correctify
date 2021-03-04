const Cross = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="32"
      height="32"
      stroke={ props.color || "currentColor"}
      strokeWidth="2.0"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

export default Cross
