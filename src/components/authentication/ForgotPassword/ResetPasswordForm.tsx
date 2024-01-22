import { Form } from "react-router-dom";
function ResetPasswordForm() {
  return (
    <div className="max-w-screen h-screen">
      <div className="w-9/12 h-screen mx-auto flex items-center justify-center">
        <div className="w-2/3 h-2/3 ">
          <h1 className="text-4xl font-extrabold mb-2">
            Time to reset your password : )
          </h1>
          <h2 className="text-xl italic">
            ... don&apos;t forget it, as it&apos;s important!
          </h2>
          <div className="font-light mt-10"></div>
          <Form>
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">new password</span>
              </div>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">confirm new password</span>
              </div>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>

            <button className="btn btn-primary">Send</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
