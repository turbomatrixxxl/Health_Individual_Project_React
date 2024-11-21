import React, { useEffect, useRef } from "react";
import styles from "./ModalFooter.module.css";
import { useMediaQuery } from "react-responsive";
import ModalLogo from "../commonComponents/FooterLogo/FooterLogo";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FormButton from "../commonComponents/FormButton/FormButton";
import "animate.css";

// Corectarea importului imaginii
import Radu from "../../images/Radu.webp";

const ModalFooter = ({ closeModal }) => {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const addCloseEvent = (event) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", addCloseEvent);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", addCloseEvent);
    };
  });

  const closeOnClickOutside = (event) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  const screenCondition = useMediaQuery({ query: "(min-width: 768px)" });

  const animation = "animate__animated animate__fadeInDown animate__slow";

  return (
    <div
      className={styles.modalFooter}
      onClick={closeOnClickOutside}
      ref={modalRef}>
      <div className={styles.modalBg}>
        <div className={styles.modalContent}>
          {screenCondition && <ModalLogo variant={"formLogo"} />}
          <h2>Fullstack Developer:</h2>

          <div className={styles.footerCards}>
            {/* Card pentru Radu */}
            <div
              className={`${styles.footerTeamCard} ${animation} ${styles.Radu}`}>
              <img
                src={Radu} // Folosește variabila corectă pentru imagine
                alt="Radu"
                className={styles.teamMemberImage}
              />
              <span className={styles.footerTeamName}>
                Naramzoiu Radu Bogdan
              </span>
              <em className={styles.footerTeamFunction}>Fullstack Developer</em>
              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/turbomatrixxxl"
                  className={styles.footerGithubIcon}
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/radu-bogdan-naramzoiu-fullstack-developer/"
                  className={styles.footerLinkedinIcon}
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noreferrer noopener">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Adaugă alte carduri pentru membrii echipei dacă este necesar */}
          </div>

          <FormButton
            type={"button"}
            text={"Thank You"}
            variant={"whiteButtton"}
            handlerFunction={() => closeModal()}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;
