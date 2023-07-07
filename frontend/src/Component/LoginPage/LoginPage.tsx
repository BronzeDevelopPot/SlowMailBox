import styles from "../../Styles/_LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.title}> 추억의 느린 우체통 </div>

      <div className={styles.mailBox} />

      <div className={styles.signUpTitle}> 느린 우체통 만들기</div>
      <a>
        {/* href로 카카오 연결 */}
        <div className={styles.kakaoLoginButton}>
          <img src="/src/Assets/kakaologin.png"></img>
        </div>
      </a>
    </div>
  );
};

export default LoginPage;
