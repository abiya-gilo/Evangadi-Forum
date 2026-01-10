import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet /> {/* ⭐ This is where the page content appears */}
      <Footer />
    </>
  );
}

export default Layout;
