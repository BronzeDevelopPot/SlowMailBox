import { useState } from "react";
import styles from "../../../Styles/_mailModalPage.module.scss";

const MailModalPage = (_props: any) => {
  const [from] = useState<string>("from : " + _props.fromName);
  const [letter] = useState<string>(_props.letterText);

  return (
    <div className={styles.mail_modal_page}>
      <div className={styles.mail_modal_container}>
        <div className={styles.close_button} onClick={_props.onHandleModal}>X</div>
        <div className={styles.letter_style}>
          {from} <br />
          {letter}
        </div>
        <button>저장</button>
      </div>
    </div>
  );
};

export default MailModalPage;
