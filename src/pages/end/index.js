import AppHeader from "../../components/layout/Header";

const EndView = () => {
  return (
    <>
      <AppHeader />
      <div className="container m-auto pt-12  w-[75%] justify-between text-center">
        Thanks, for making the Janamasthami program successful, we will again
        live next year till now chant Hare Krishna Mahamantra!
        <div className="text-center text-2xl">
          <span className="block font-bold mt-5">
            Hare Krishna Hare Krishna
          </span>
          <span className="block font-bold">Krishna Krishna Hare Hare</span>
          <span className="block font-bold"> Hare Rama Hare Rama</span>
          <span className="block font-bold"> Rama Rama Hare Hare</span>
        </div>
      </div>
    </>
  );
};

export default EndView;
