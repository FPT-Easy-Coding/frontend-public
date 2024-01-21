// import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useEffect, useState, useRef } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isError, setIsError] = useState(false);
  const errorCond = useRef();
  useEffect(() => {
    if (data?.errorCondition) {
      switch (data?.errorCondition) {
        case "wc":
        case "ec":
        case "pc":
          toast.error(data.message);
          errorCond.current = data.errorCondition;
          break;
        default:
          toast.error("You should check again the credentials you entered.");
      }
      setIsError(true);
    } else {
      if (data?.error){
        toast.error(data.message)
      }
      setIsError(false);
    }
  }, [data]);
  function handleChange() {
    setIsError(false);
  }
  const spinningBtn = <span className="loading loading-spinner"></span>;
  return (
    <>
      <div className="hero min-h-[90vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse md:gap-60">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Form method="post" className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className={`input input-bordered ${
                    isError ? "input-error" : ""
                  }`}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className={`input input-bordered ${
                    isError ? "input-error" : ""
                  }`}
                  name="password"
                  onChange={handleChange}
                  required
                />
                <label className="label">
                  <Link
                    to="/forgotten"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  disabled={isSubmitting && true}
                >
                  {isSubmitting ? spinningBtn : "Login"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
