import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AuthSignin.module.css";
import desert from "./moments.jpg";

type SignInState = {
  email: string;
  password: string;
  remember: boolean;
};

export default function AuthSignin() {
  const [form, setForm] = useState<SignInState>({
    email: "",
    password: "",
    remember: true,
  });

  const handleChange =
    (key: keyof SignInState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key === "remember" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SIGN IN SUBMITTED:", form);
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <section
          className={styles.hero}
          style={{ backgroundImage: `url(${desert})` }}
          aria-label="Hero"
        >
          <div className={styles.heroLogo}>AMU</div>

          <a className={styles.backBtn} href="#">
            Back to website <span aria-hidden="true">→</span>
          </a>

          <div className={styles.heroOverlay} />

          <div className={styles.heroHeadline}>
            <div>Capturing Moments,</div>
            <div>Creating Moments</div>
          </div>

          <div className={styles.heroDots} aria-label="Carousel indicators">
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={`${styles.dot} ${styles.dotActive}`} />
          </div>
        </section>

        <section className={styles.formArea} aria-label="Sign in">
          <div className={styles.formWrap}>
            <h1 className={styles.title}>Welcome back</h1>

            <p className={styles.subtitle}>
              Don&apos;t have an account?{" "}
              <Link className={styles.link} to="/signup">
                Create one
              </Link>
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                value={form.email}
                onChange={handleChange("email")}
                placeholder="Email"
                autoComplete="email"
                inputMode="email"
              />

              <input
                className={styles.input}
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              <div className={styles.metaRow}>
                <label className={styles.checkboxRow}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={form.remember}
                    onChange={handleChange("remember")}
                  />
                  <span className={styles.checkboxText}>Remember me</span>
                </label>

                <a className={styles.linkMuted} href="#">
                  Forgot password?
                </a>
              </div>

              <button className={styles.primaryBtn} type="submit">
                Sign In
              </button>

              <div className={styles.socialRow}>
                <button className={styles.socialBtn} type="button">
                  <span className={styles.gMark}>G</span>
                  <span>Google</span>
                </button>

                <button className={styles.socialBtn} type="button">
                  <span aria-hidden="true"></span>
                  <span>Apple</span>
                </button>
              </div>

              <div
                className={styles.divider}
                role="separator"
                aria-label="Or sign in with"
              >
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>Or sign in with</span>
                <span className={styles.dividerLine} />
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
