import { colors } from "../../styles/colors";
import { getClassName } from "../../Utils/getClassName";
import { RawText } from "../RawText/RawText";
import "./delete-button.scss";

type DeleteButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string | React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  label,
  onClick,
  disabled,
  className,
  style,
}) => {
  return (
    <button
      style={style}
      className={getClassName("delete-button", {
        [className || ""]: !!className,
        "without-hover": !onClick,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {typeof label === "string" ? (
        <RawText
          text={label}
          color={disabled ? colors.gray03 : colors.red02}
          fontSize={16}
          fontWeight={600}
        />
      ) : (
        label
      )}
    </button>
  );
};
