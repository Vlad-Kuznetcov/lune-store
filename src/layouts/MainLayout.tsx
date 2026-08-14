import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ScrollToTop";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Loader from "../components/ui/Loader";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

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
