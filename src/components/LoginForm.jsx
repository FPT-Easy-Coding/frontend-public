import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
function LoginForm() {
  const data = useActionData();
  useLockBodyScroll();
  useEffect(() => {
    if (data?.error) {
      toast.error(data.message);
    }
  }, [data]);
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
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  name="email"
                  className="input input-bordered"
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
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
