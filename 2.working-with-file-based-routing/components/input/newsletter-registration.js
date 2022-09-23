import { useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

const NewsletterRegistration = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailInputField = useRef();

  const validateEmail = (email) => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return email.match(validRegex);
  };

  const registrationHandler = (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();

    const enteredEmail = emailInputField.current.value;

    if (!enteredEmail) {
      setError("Please enter email");
    } else {
      if (!validateEmail(enteredEmail)) {
        setError("Please enter valid email!");
      } else {
        const reqBody = { email: enteredEmail };

        fetch("/api/newsletter", {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 200) {
              setSuccess(data.message);
              emailInputField.current.value = '';
            }
          });
      }
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputField}
          />
          <button>Register</button>
        </div>
      </form>
      {error && <span>{error}</span>}
      {success && <span>{success}</span>}
    </section>
  );
};

export default NewsletterRegistration;
