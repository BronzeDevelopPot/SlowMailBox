import LoginPage from "./Component/LoginPage/LoginPage";
import MainPage from "./Component/MainPage/MainPage";
import LetterPage from "./Component/LetterPage/LetterPage";
import ArrivePage from "./Component/ArrivePage/ArrivePage";
import styles from "./App.module.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/letter" element={<LetterPage />}></Route>
          <Route path="/arrive" element={<ArrivePage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
