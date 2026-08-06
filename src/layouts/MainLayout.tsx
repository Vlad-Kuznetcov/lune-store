import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ScrollToTop";
import AnnouncementBar from "../components/layout/AnnouncementBar";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />

      <Header />
      <AnnouncementBar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
