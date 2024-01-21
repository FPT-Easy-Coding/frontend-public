import { Outlet, useSubmit, useRouteLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";

function Root() {
  const data = useRouteLoaderData("root-loader");
  const submit = useSubmit();
  useEffect(() => {
    if (!(data) || data?.error) {
      submit(null, { action: "/logout", method: "post" });
      return;
    }
  }, [data, submit]);
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
