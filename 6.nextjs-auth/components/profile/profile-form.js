import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const oldPasswodRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPasswodRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional : Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswodRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
