
import StudyModeNavbar from "../../components/navbar/study-mode/StudyModeNavbar";
import { Outlet } from "react-router-dom";

function StudyModeRoot() {
  return (
    <>
      <StudyModeNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default StudyModeRoot;
