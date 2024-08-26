import "./animated-label.css";

export const AnimatedLabel = ({
  children,
  className = "",
  optionCss,
  onClick = () => {},
}) => {
  return (
    <div className={`kbc-question`} onClick={onClick}>
      <div className={`kbc-question-text ${className}`}>{children}</div>
    </div>
  );
};
