import { useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation
} from "react-router-dom";
import { toast } from "react-toastify";
// import { useRef } from "react";
// import Modal from "./Modal";
function SignupForm() {
  const data = useActionData();
  console.log(data);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (data?.error === true) {
      toast.error(data?.message, {
        onClose: () => {
          window.open("/", "_self");
        }
      });
    } else {
      toast.success(data?.message, {
        onClose: () => {
          window.open("/login", "_self");
        }
      });
    }
  }, [data]);
  return (
    <>
      <div className="flex justify-center items-center pb-10">
        <div className="card w-full max-w-[35rem] shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="flex justify-center items-center pb-3">
              <div className="card-title">Sign up your QuizToast</div>
            </div>
            <Form method="post">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  id="new-email"
                  name="email"
                />
              </div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone number</span>
                </label>
                <input
                  type="tel"
                  placeholder="phone number"
                  className="input input-bordered"
                  id="new-phonenum"
                />
              </div> */}
              <div className="flex items-center gap-3">
                <div className="form-control basis-1/2">
                  <label className="label">
                    <span className="label-text">Firstname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="firstname"
                    className="input input-bordered"
                    id="new-fname"
                    name="firstname"
                  />
                </div>
                <div className="form-control basis-1/2">
                  <label className="label">
                    <span className="label-text">Lastname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="lastname"
                    className="input input-bordered"
                    id="new-lname"
                    name="lastname"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* <div className="form-control basis-3/5">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered"
                    id="new-uname"

                  />
                </div> */}
                {/* <div className="form-control basis-2/5">
                  <label className="label">
                    <span className="label-text">Date of birth</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    id="new-dob"

                  />
                </div> */}
              </div>
              {/* <div className="flex pl-1 py-4">
                <div className="flex justify-end mr-7">
                  <label className="label-text">Gender</label>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="userGender"
                      className="radio radio-sm checked:bg-blue-500"
                      defaultValue="Male"
                      defaultChecked=""
                      id="g-1"
                    />
                    <label className="label-text cursor-pointer" htmlFor="g-1">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="userGender"
                      className="radio radio-sm checked:bg-blue-500"
                      defaultValue="Female"
                      id="g-2"
                    />
                    <label className="label-text cursor-pointer" htmlFor="g-2">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="userGender"
                      className="radio radio-sm checked:bg-blue-500"
                      defaultValue="Other"
                      id="g-3"
                    />
                    <label className="label-text cursor-pointer" htmlFor="g-3">
                      Other
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="flex items-center gap-3">
                <div className="form-control basis-1/2">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    id="new-password"
                    name="password"
                  />
                </div>
                <div className="form-control basis-1/2">
                  <label className="label">
                    <span className="label-text">Confirm password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered"
                    id="cf-new-password"
                  />
                </div>
              </div>
              <div className="form-control mt-5">
                <button
                  className="btn btn-primary btn-outline"
                  // onClick={handleSubmit}
                  disabled={isSubmitting && true}
                >
                  Signup
                </button>
              </div>
            </Form>
            <div className="flex flex-col justify-center">
              <div className="divider">OR</div>
              <div
                className="form-control tooltip tooltip-right"
                data-tip="Feature have been disabled due to Google security reason, if you want to use this feature, pls contact me at: ducldc@jsclub.dev"
              >
                <a
                  href="https://accounts.google.com/o/oauth2/auth?scope=profile email&redirect_uri=http://localhost:8080/eCommerceProject/register-google&response_type=code&client_id=432080739851-i90lscb3v0n6lrv551n210tise0a6drf.apps.googleusercontent.com&approval_prompt=force"
                  className="btn btn-primary btn-outline btn-disabled"
                  disabled=""
                >
                  <img
                    //   src="./asset/images/Login/icons8-google.svg"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  Register with Google
                </a>
              </div>
            </div>
            <div className="text-center mt-5">
              Already have an account?&nbsp;
              <Link to="/login" className="link link-hover text-blue-600">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
