/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={styles.notfoundSection}>
      <div className={styles.notfound}>
        <div className={styles['notfound-404']}>
          <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <Link to={'/'}>Go To Homepage</Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
