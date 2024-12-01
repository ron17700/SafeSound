import { LoginButton } from "./components/LoginButton/LoginButton";
import { SafeSoundLogo } from "../../components/SafeSoundLogo/SafeSoundLogo";
import styles from "./Login.module.scss";
import { RawText } from "../../components/RawText/RawText";

export const Login: React.FC = () => {
  return (
    <div className="flex flex-1 align-center justify-center flex-height-100">
      <div
        className="flex layout-column justify-center align-center"
        style={{ width: "500px" }}
      >
        <div style={{ marginInlineEnd: "40px" }}>
          <SafeSoundLogo RawTextSize={60} ShoppingBagIconSize="40px" />
        </div>
        <div className={styles.section} style={{ width: "100%" }}>
          <RawText
            style={{ width: "100%" }}
            lineClamp={3}
            text={
              "Discover SafeSound!"
            }
            fontWeight={500}
          />
          <RawText
            style={{ width: "100%", marginTop: "1rem" }}
            lineClamp={3}
            text={
              "Protect your love ones in an easy way!"
            }
            fontWeight={500}
          />
          <RawText
            style={{ width: "100%", marginTop: "1rem" }}
            lineClamp={3}
            text={`Don't wait! Start exploring our app. We have many things to offer`}
            fontWeight={500}
          />
        </div>
        <div className={styles.section} style={{ width: "100%" }}>
          <LoginButton />
        </div>
      </div>
      <img src="assets/login-img.png" className="flex-60" />
    </div>
  );
};
