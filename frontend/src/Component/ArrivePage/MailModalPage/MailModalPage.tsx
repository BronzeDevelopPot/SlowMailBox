import { useState, useRef } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import styles from "../../../Styles/_mailModalPage.module.scss";

const MailModalPage = (_props: any) => {
  const [from] = useState<string>("from : " + _props.fromName);
  const [letter] = useState<string>(_props.letterText);
  const captureRef = useRef(null);

  const onHandleDownload = () => {
    const element = captureRef.current;

    if (element) {
      const option = {
        style: {
          width: "440px",
          height: "700px",
        },
      };
      domtoimage.toBlob(element, option).then((blob) => {
        saveAs(blob, `letterfrom${from}.png`);
      });
    }
  };

  return (
    <div className={styles.mail_modal_page}>
      <div ref={captureRef} className={styles.mail_modal_container}>
        <div className={styles.letter_style}>
          {from} <br />
          {letter}
        </div>
      </div>
      <div className={styles.close_button} onClick={_props.onHandleModal}>
        X
      </div>
      <button onClick={onHandleDownload}>저장</button>
    </div>
  );
};

export default MailModalPage;

