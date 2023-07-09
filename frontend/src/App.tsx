import LoginPage from './Component/LoginPage/LoginPage';
import MainPage from './Component/MainPage/MainPage';
import styles from './App.module.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
