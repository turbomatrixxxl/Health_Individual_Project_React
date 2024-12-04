import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resendVerificationEmail } from "../../redux/auth/operationsAuth";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/commonComponents/Button";
import styles from "./VerifyEmailPageComponent.module.css";

const VerifyEmailPage = () => {
  const { user, isLoggedIn, errorAuth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to home if user is logged in or already verified
    if (isLoggedIn || user?.verify) {
      navigate("/");
    }
  }, [isLoggedIn, user, navigate]);

  const handleResendVerificationEmail = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(resendVerificationEmail(user.email));
  };

  useEffect(() => {
    if (errorAuth) {
      console.error("Error:", errorAuth);
    }
  }, [errorAuth]);

  const getEmailProviderUrl = (email) => {
    if (!email || !email.includes("@")) {
      console.warn("Invalid email format:", email);
      return "https://mail.google.com";
    }

    const domain = email.split("@")[1];
    switch (domain) {
      case "gmail.com":
        return `https://mail.google.com/mail/u/0/#inbox`;
      case "yahoo.com":
        return `https://mail.yahoo.com`;
      case "outlook.com":
      case "hotmail.com":
        return `https://outlook.live.com/mail/0/inbox`;
      case "icloud.com":
        return `https://www.icloud.com/mail`;
      default:
        return `https://mail.${domain}`;
    }
  };

  const email = user?.email ?? "your email address";

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Please verify your email address</h2>
      <p className={styles.message}>
        We sent a verification link to your email:{" "}
        <strong className={styles.strong}>{email}</strong>
      </p>
      <a
        className={styles.emailLink}
        href={getEmailProviderUrl(user?.email)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>Go to your email provider</Button>
      </a>
      <Button
        className={styles.button}
        onClick={handleResendVerificationEmail}
        type="button"
        variant="colored"
      >
        Resend Verification Email
      </Button>

      {errorAuth && typeof errorAuth === "string" && (
        <p className={styles.error}>{errorAuth}</p>
      )}

      <div className={styles.infoCont}>
        <p className={styles.infoText}>
          If you've already verified your email, you can go to the
        </p>
        <Link className={styles.link} to="/login">
          <Button>Login page</Button>
        </Link>
        <p className={styles.infoText}>to sign in.</p>
      </div>
    </section>
  );
};

export default VerifyEmailPage;
