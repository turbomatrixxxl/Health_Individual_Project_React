import React from "react";
import Button from "./components/commonComponents/Button";
import Loader from "./components/commonComponents/Loader";
import Logo from "./components/Logo/Logo";
import Modal from "./components/commonComponents/Modal/Modal";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AuthLinks from './components/AuthLinks/AuthLinks.jsx'
import HeartSvgBackground from './components/backgroundComponents/HeartSvgBackground/HeartSvgBackground.jsx'
import LeavesBackground from './components/backgroundComponents/LeavesBackground/LeavesBackground.jsx'
import BananaBackground from './components/backgroundComponents/BananaBackground/BananaBackground.jsx'
import StrawberryBackground from './components/backgroundComponents/StrawberryBackground/StrawberryBackground.jsx'
import LogoutButton from './components/LogoutButton/LogoutButton.jsx'
import Header from "./components/Header/Header.jsx";
import UserLogout from "./components/UserLogout/UserLogout.jsx";

import "./App.css";

function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="App">
      <Button>Login</Button>
      <Button variant="colored">Login</Button>
      <Button>Register</Button>
      <Button variant="colored">Register</Button>
      <Button>Start losing weight</Button>
      <Button variant="colored">Start losing weight</Button>
      <Button variant="plusButton">+</Button>
      <LogoutButton />
      <Loader />
      <Header />
      <Logo />
      <AuthLinks />
      <Modal />
      <NotFoundPage />
      <HeartSvgBackground />
      <LeavesBackground />
      <BananaBackground />
      <StrawberryBackground />
      <UserLogout />
    </div>
  );
}

export default App;
