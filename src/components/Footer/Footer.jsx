import { useState } from "react";
import Modal from "../ModalFooter/ModalFooter";
import styles from "./Footer.module.css";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false); // Starea pentru a ține evidența dacă modalul este deschis sau nu

  const handleTextClick = () => {
    setModalOpen(true); // Deschide modalul la click
  };

  return (
    <footer className={styles.footer}>
      <div onClick={handleTextClick} className={styles.footerText}>
        <p>℗ & © GoIT 2024</p>
        <p>Powered by Naramzoiu Radu Bogdan </p>
      </div>
      {/* Randează Modal-ul dacă este deschis */}
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </footer>
  );
};

export default Footer;
