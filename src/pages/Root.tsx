import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Root() {
  // useEffect(() => {
  //   if (!(data) || (data as { error?: string }).error) {
  //     submit(null, { action: "/logout", method: "post" });
  //     return;
  //   }
  // }, [data, submit]);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;
