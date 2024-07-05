import classNames from "classnames";
import "./choices.scss";

export const Choices = ({
  children,
  buttonLabel,
  className,
  isOpen,
  onToggle,
}) => (
  <div className={classNames("choices", className)}>
    <button className="choices__btn" type="button" onClick={onToggle}>
      {buttonLabel}
    </button>

    {isOpen && <div className="choices__box">{children}</div>}
  </div>
);
