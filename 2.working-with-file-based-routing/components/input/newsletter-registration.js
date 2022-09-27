import { useRef, useState, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

const NewsletterRegistration = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailInputField = useRef();
  const notificationCtx = useContext(NotificationContext);

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

        notificationCtx.showNotification({
          title: "Signing Up...",
          message: "Registering for newsletter.",
          status: "pending",
        });

        fetch("/api/newsletter", {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json(); 
            }

            return response.json().then((data) => {
              throw new Error(data.message || "Something went wrong!");
            });
          })
          .then((data) => {
            if (data.status === 200) {
              setSuccess(data.message);
              emailInputField.current.value = "";

              notificationCtx.showNotification({
                title: "Success!",
                message: "Successfully registered for newsletter!",
                status: "success",
              });
            } 
          })
          .catch((error) => {
            notificationCtx.showNotification({
              title: "Error!",
              message: error.message || "Something went wrong!",
              status: "error",
            });
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
