import { Outlet } from "react-router-dom";
import AppFooter from "./AppFooter/AppFooter";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <AppFooter />
    </div>
  );
}

export default Sidebar;
