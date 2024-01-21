import { Form } from "react-router-dom";

function ForgotPasswordForm() {
  return (
    <div className="max-w-screen h-screen">
      <div className="w-9/12 h-screen mx-auto flex items-center justify-center">
        <div className="w-2/3 h-2/3 ">
          <h1 className="text-4xl font-extrabold mb-2">
            Oh no! You forgot your password?
          </h1>
          <h2 className="text-xl italic">
            ... don&apos;t worry, we are here to help!
          </h2>
          <div className="font-light mt-10">
            Enter the email you signed up with. We&apos;ll send you a link to
            log in and reset your password. If you signed up with your
            parent&apos;s email, we&apos;ll send them a link.
          </div>
          <Form>
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Enter your account email</span>
              </div>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <button className="btn btn-primary">Send link</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
