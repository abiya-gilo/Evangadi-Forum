import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>
        <Outlet /> {/* ⭐ This is where the page content appears */}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
