import { KAKAO_AUTH_URL } from "./Auth";
import styles from "../../Styles/_loginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.login_page}>
      <div className={styles.title}>추억의 느린 우체통</div>
      <div className={styles.mail_box} />
      <div className={styles.sign_up_title}>느린 우체통 만들기</div>
      <a href={KAKAO_AUTH_URL}>
        <div className={styles.kakao_login_button}>
          <img src="../src/Assets/kakaologin.png" />
        </div>
      </a>
    </div>
  );
};

export default LoginPage;
