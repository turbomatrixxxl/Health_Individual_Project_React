import React, { useState } from "react";
import { logIn } from "../../redux/auth/operationsAuth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../commonComponents/Input/Input";
import Button from "../commonComponents/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import useToggle from "../../hooks/useToggle";
import useFormValidation from "../../hooks/useFormValidation";
import validateLogin from "../../hooks/validateLogin";
import useFormTouched from "../../hooks/useFormTouched";

import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const { fields, setFields, validateFields } = useFormValidation(
    {
      email: "",
      password: "",
    },
    validateLogin
  );

  const { user, isLoggedIn } = useAuth()

  const { touched, handleBlur } = useFormTouched(fields);

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const [eyeVisible, toggleEyeVisible] = useToggle(true);
  const [closedEyeVisible, toggleClosedEyeVisible] = useToggle(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      await dispatch(logIn(fields))
        .unwrap()
    } catch (error) {
      setFields((prevFields) => ({
        ...prevFields,
        errorMessage: setErrorMessage(
          "You have entered an invalid username or password."
        ),
      }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.inputIcon} />

            <Input
              autoComplete="on"
              paddingLeft="53.5px"
              width="100%"
              type="email"
              value={fields.email}
              handleChange={(e) => {
                setFields({ ...fields, email: e.target.value });
              }}
              handleBlur={handleBlur("email")}
              placeholder="Email *"
              required={true}
            />
          </div>
          {touched.email && !fields.email && (
            <p className={styles.inputError}>Required</p>
          )}
        </div>
        <div styles={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />

            {eyeVisible && (
              <VscEye
                onClick={() => {
                  toggleEyeVisible();
                  toggleClosedEyeVisible();
                  setType("text");
                }}
                size="24px"
                className={styles.eyeIcon}
              />
            )}

            {closedEyeVisible && (
              <VscEyeClosed
                onClick={() => {
                  toggleEyeVisible();
                  toggleClosedEyeVisible();
                  setType("password");
                }}
                size="24px"
                className={styles.eyeIcon}
              />
            )}

            <Input
              autoComplete="on"
              paddingLeft="53.5px"
              width="100%"
              type={type}
              value={fields.password}
              handleChange={(e) => {
                setFields({ ...fields, password: e.target.value });
              }}
              handleBlur={handleBlur("password")}
              placeholder="Password"
              required={true}
            />
          </div>
          {touched.password && fields.password.length < 6 && (
            <p className={styles.inputError}>
              Password must be at least 6 characters!
            </p>
          )}
        </div>
        <div className={styles.buttonsContainer}>
          <Button variant="colored" type="submit">
            Log in
          </Button>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <Button type="button">
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>{" "}
          </Button>



          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        </div>
        {(user !== null && !isLoggedIn) && ((<div className={styles.errorCont}>
          <p className={styles.error}>It seems that your email is not verified! Please click the Verify button to be redirected to verify email page !
          </p><Button>
            <Link to="/verify-email" className={clsx(styles.navLink, styles.link)}>
              Verify
            </Link>
          </Button>
        </div>))}
      </form>
    </>
  );
}

export default LoginForm;
