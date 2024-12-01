import { colors } from "../../styles/colors";
import { getClassName } from "../../Utils/getClassName";
import { RawText } from "../RawText/RawText";
import "./primary-button.scss";

type PrimaryButtonProps = {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
  label: string | React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  disabled,
  className,
  style,
}) => {
  return (
    <button
      style={style}
      className={getClassName("primary-button", {
        [className || ""]: !!className,
        "without-hover": !onClick,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {typeof label === "string" ? (
        <RawText
          text={label}
          color={colors.white}
          fontSize={16}
          fontWeight={600}
        />
      ) : (
        label
      )}
    </button>
  );
};
