import { useState } from "react";
import styles from "./AuthSignup.module.css";
import desert from "./moments.jpg";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agree: boolean;
};

export default function AuthSignup() {
  const [form, setForm] = useState<FormState>({
    firstName: "Oberoy",
    lastName: "",
    email: "",
    password: "",
    agree: true,
  });

  const handleChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key === "agree" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SUBMITTED FORM:", form);
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

        <section className={styles.formArea} aria-label="Create account">
          <div className={styles.formWrap}>
            <h1 className={styles.title}>Create an account</h1>

            <p className={styles.subtitle}>
              Already have an account?{" "}
              <a className={styles.link} href="#">
                Log in
              </a>
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row2}>
                <input
                  className={styles.input}
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  placeholder="First name"
                  autoComplete="given-name"
                />
                <input
                  className={styles.input}
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  placeholder="Last name"
                  autoComplete="family-name"
                />
              </div>

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
                autoComplete="new-password"
              />

              <label className={styles.checkboxRow}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={form.agree}
                  onChange={handleChange("agree")}
                />
                <span className={styles.checkboxText}>
                  I agree to the{" "}
                  <a className={styles.link} href="#">
                    terms &amp; conditon
                  </a>
                </span>
              </label>

              <button className={styles.primaryBtn} type="submit">
                Create Account
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
                aria-label="Or register with"
              >
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>Or register with</span>
                <span className={styles.dividerLine} />
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
