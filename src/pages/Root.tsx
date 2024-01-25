import { Outlet, useSubmit, useRouteLoaderData } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useEffect } from "react";

function Root() {
  const data = useRouteLoaderData("root-loader");
  const submit = useSubmit();
  useEffect(() => {
    if (!(data) || (data as { error?: string }).error) {
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
    </>
  );
}

export default Root;
