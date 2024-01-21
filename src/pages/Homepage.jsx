import cover from "../assets/homepage-cover.jpg";

const Homepage = () => {
  return (
    <div className="overflow-x-hidden">
      <div>
        {/* <div className="max-w-[100vw] max-h-[100vh]">
          <img src={cover} alt="homepage cover" />
        </div> */}
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${cover})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="flex w-4/5">
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md text-left">
                <h1 className="mb-5 text-6xl font-bold">Hello there</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
