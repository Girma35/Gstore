import React from "react";
import PageHeader from "../../components/common/pageHeader";
import PageFooter from "../../components/common/pageFooter";
import styles from './auth.module.css';

const Auth = () => {
  return (
    <>
      <PageHeader title="My Account" />
      
      <div className={styles.section}>
        {/* Login section */}
        <div className={styles.registerContainer}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="Email">Email address</label>
              <input
                type="email"
                className={styles.input}
                id="Email"
                placeholder="name@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                className={styles.input}
                id="Password"
                placeholder="Password"
              />
            </div>

            <div className={styles.formGroup}>
      <label className={styles.rememberLabel}>
        <input
          type="checkbox"
          name="remember"
          className={styles.checkbox}
        />{' '}
        Remember Me
      </label>
    </div>

            <div className={styles.redirectMessage}>
  <p>
    Don't have an account?{' '}
    <span role="img" aria-label="thumb pointing right">👉</span>
  </p>
</div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.submitButton}>
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Register section */}
        <div className={styles.registerContainer}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="Name">Full Name</label>
              <input
                type="text"
                className={styles.input}
                id="Name"
                placeholder="Enter Your Name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="Email">Email address</label>
              <input
                type="email"
                className={styles.input}
                id="Email"
                placeholder="name@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                className={styles.input}
                id="Password"
                placeholder="Password"
              />
            </div>

            <div className={styles.redirectMessage}>
  <p>
    Already have an account?{' '}
    <span role="img" aria-label="pointing left">👈</span>{' '}
  </p>
</div>

            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.submitButton} disabled>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      <PageFooter />
    </>
  );
};

export default Auth;
