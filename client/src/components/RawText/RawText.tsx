import { MouseEvent } from "react";
import { getClassName } from "../../Utils/getClassName";
import { Colors } from "../../styles/colors";
import "./raw-text.scss";

export const TEXT_OVERFLOW = {
  ELLIPSIS: "ellipsis",
  PRE_LINE: "pre-line",
} as const;

export type TextOverflow = (typeof TEXT_OVERFLOW)[keyof typeof TEXT_OVERFLOW];

export interface TextProps {
  text: React.ReactNode;
  className?: string;
  textOverflow?: TextOverflow;
  fontSize?: number;
  style?: React.CSSProperties;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  fontFamily?: React.CSSProperties["fontFamily"];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  color?: Colors;
  fontWeight?: React.CSSProperties["fontWeight"];
  lineClamp?: number;
}

export const RawText: React.FC<TextProps> = ({
  text,
  className,
  textOverflow = "ellipsis",
  fontSize,
  fontWeight,
  style,
  onClick,
  fontFamily = "Nunito",
  color,
  onMouseEnter,
  onMouseLeave,
  lineClamp,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={getClassName(`text ${className} ${textOverflow}`, {
        clickable: onClick,
        "line-clamp": lineClamp,
      })}
      style={{
        fontSize: fontSize ? `${fontSize}px` : undefined,
        fontFamily,
        color,
        fontWeight,
        lineClamp,
        WebkitLineClamp: lineClamp,
        ...style,
      }}
    >
      {text || ""}
    </div>
  );
};
