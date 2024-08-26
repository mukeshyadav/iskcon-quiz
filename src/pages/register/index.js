import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/layout/Header";

const RegisterView = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("participant");
  });

  const onSubmit = (data) => {
    const { group } = data;
    sessionStorage.setItem("participant", JSON.stringify(getValues()));
    navigate(`/qna/${group}/0`);
    reset();
  };
  const groups = [
    { value: 1, label: "Group 1" },
    { value: 2, label: "Group 2" },
    { value: 3, label: "Group 3" },
    { value: 4, label: "Group 4" },
    { value: 5, label: "Group 5" },
    { value: 6, label: "Group 6" },
    { value: 7, label: "Group 7" },
    { value: 8, label: "Group 8" },
    { value: 9, label: "Group 9" },
    { value: 10, label: "Group 10" },
    { value: 11, label: "Group 11" },
    { value: 12, label: "Group 12" },
    { value: 13, label: "Group 13" },
    { value: 14, label: "Group 14" },
    { value: 15, label: "Group 15" },
  ];

  return (
    <>
      <AppHeader />
      <div className="container m-auto p-10 flex w-[75%] justify-between items-center bg-slate-100 rounded ">
        <div className="w-1/2">
          <div className="text-lg font-bold bg-orange-600 text-white py-2 px-5 mb-5 rounded-full">
            Participant Info
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 gap-4">
              <div className="block">
                <span className="text-gray-700 font-medium">Full Name</span>
                <input
                  type="text"
                  className={`mt-1 block w-full border p-2 ${
                    errors?.name && "border-red-600"
                  }`}
                  placeholder="enter participant full name"
                  {...register("name", {
                    required: "Name is required.",
                    maxLength: 200,
                    pattern: {
                      value: /[A-Za-z]{3}/,
                      message: "Enter correct name.",
                    },
                  })}
                />
                <p className="text-sm text-red-600 mt-1">
                  {errors?.name && errors?.name?.message}
                </p>
              </div>
              <div className="block">
                <span className="text-gray-700 font-medium">Mobile</span>
                <input
                  type="tel"
                  className={`mt-1 block w-full border p-2 ${
                    errors?.mobile && "border-red-600"
                  }`}
                  placeholder="enter participant mobile"
                  {...register("mobile", {
                    required: "Mobile number is required.",
                    minLength: {
                      value: 10,
                      message: "Enter correct mobile minimum 10 digit.",
                    },
                    maxLength: {
                      value: 10,
                      message: "Enter correct mobile maximum 10 digit.",
                    },
                    pattern: {
                      value: /[0-9]{10}$/,
                      message: "Only numbers allowed.",
                    },
                  })}
                />
                <p className="text-sm text-red-600 mt-1">
                  {errors?.mobile && errors?.mobile?.message}
                </p>
              </div>
              <div className="block">
                <span className="text-gray-700 font-medium">Select Group</span>
                <select
                  placeholder="Select group"
                  className={`mt-1 block w-full border p-2 ${
                    errors?.group && "border-red-600"
                  }`}
                  {...register("group", { required: "Groupd is required." })}
                >
                  <option selected value="" disabled>
                    choose a group
                  </option>
                  {groups.map(({ label, value }) => (
                    <option value={value} key={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-600 mt-1">
                  {errors?.group && errors?.group?.message}
                </p>
              </div>
            </div>
            <div className="text-center mt-6 mb-2">
              <input
                type="submit"
                value="Register"
                disabled={isSubmitting}
                className="bg-orange-600 text-white rounded-md py-2 px-5 border-orange-500 border cursor-pointer"
              />
            </div>
          </form>
        </div>

        <div className="w-1/2 pl-20">
          <h2 className="font-semibold text-2xl">-:नियम:-</h2>
          <ol className="text-xl my-4 font-bold">
            <li className="py-2">10 प्रश्न हैं</li>
            <li className="py-2">
              प्रत्येक प्रश्न का उत्तर 1 मिनट में देना होता है
            </li>
            <li className="py-2">प्रत्येक प्रश्न में 1000 अंक हैं</li>
            <li className="py-2">प्रत्येक प्रश्न अनिवार्य है</li>
            <li className="py-2">नॉकआउट क्विज है</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default RegisterView;
