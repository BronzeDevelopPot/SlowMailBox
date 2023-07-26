import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../Styles/_mainPage.module.scss";

const MainPage = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setName(res.data.name);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={styles.main_page}>
      <span className={styles.title}>{name}님의 우체통</span>
      <div className={styles.mail_box}></div>

      <div className={styles.link_container}>
        <Link to="/letter">
          <button className={styles.write_button}>편지 남기기</button>
        </Link>
      </div>
      <button className={styles.share_button}>내 우체통 공유하기 (Link 복사)</button>
    </div>
  );
};

export default MainPage;
