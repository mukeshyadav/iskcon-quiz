import "./animated-option.css";

export const AnimatedOption = ({
  children,
  className = "",
  optionCss,
  onClick = () => {},
}) => {
  return (
    <div className={`kbc-option`} onClick={onClick}>
      <div className={`kbc-option-text ${className}`}>{children}</div>
    </div>
  );
};
