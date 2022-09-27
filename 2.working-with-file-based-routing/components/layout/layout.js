import { Fragment, useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const acitiveNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {acitiveNotification && (
        <Notification
          title={acitiveNotification.title}
          message={acitiveNotification.message}
          status={acitiveNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
