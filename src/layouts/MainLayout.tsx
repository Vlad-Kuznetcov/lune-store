import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />

      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
