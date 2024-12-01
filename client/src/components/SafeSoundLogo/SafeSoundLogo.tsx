import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { colors } from "../../styles/colors";
import { RawText } from "../RawText/RawText";

type Props = {
  ShoppingBagIconSize: string;
  RawTextSize:number;
};

export const SafeSoundLogo: React.FC<Props> = ({ ShoppingBagIconSize,RawTextSize }) => {
  return (
    <div className="flex align-center column-gap-8">
      <ShoppingBagIcon color={colors.blue03} height={ShoppingBagIconSize} width={ShoppingBagIconSize} />
      <RawText
        text="SafeSound"
        fontFamily="Courgette, cursive"
        fontSize={RawTextSize}
        style={{
          userSelect: "none",
        }}
      />
    </div>
  );
};
