import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import axios from "axios";

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
      <main className="mt-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;

export async function action({ request }: { request: Request }) {
  try {
    const data = Object.fromEntries(await request.formData());
    const AT = "Bearer " + localStorage.getItem("AT");
    const action = data.action;
    const payload = {
      folderName: data.folderTitle,
      userId: Number(localStorage.getItem("uid")),
    };

    if (action === "create-folder") {
      await axios
        .post("http://localhost:8080/api/v1/folder/create-folder", payload, {
          headers: {
            Authorization: AT,
          },
        })
        .catch(() => {
          throw new Error("Something went wrong");
        });
      return {
        success: true,
        msg: "Folder created successfully",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
