"use client"
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
const schema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(7),
});

const Signup = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(values);
        
        const res = await axios.post("/api/sign-up", values);
        console.log(res);
        
        if (res.status === 200) {
          router.push("/sign-in");
          return;
        } 
      } catch (error) {
        console.error("Sign-up failed:", error);
        alert("Sign-up failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="bg-zinc-800 flex justify-center items-center h-screen w-screen">
      <div className="md:w-[40%] lg:w-[25%] h-fit flex flex-col border-[1px] p-6 rounded-lg shadow-xl text-md w-[90%]">
        <h1 className="font-bold text-3xl text-center m-4">Sign up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col m-2">
            <input
              type="text"
              name="username"
              value={values.username}
              placeholder="Enter username"
              onChange={handleChange}
              className="w-full text-black text-md p-2 rounded-md focus:outline-none"
            />
            {errors.username && touched.username && <span className="text-red-600">{errors.username}</span>}
          </div>
          <div className="flex flex-col m-2 mt-6">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full text-black text-md p-2 rounded-md focus:outline-none"
            />
            {errors.email && touched.email && <span className="text-red-600">{errors.email}</span>}
          </div>
          <div className="flex flex-col m-2 mt-6">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full text-black text-md p-2 rounded-md focus:outline-none"
            />
            {errors.password && touched.password && <span className="text-red-600">{errors.password}</span>}
          </div>
          <button type="submit" className="p-2 mt-6 bg-orange-600 w-[30%] rounded-md mx-auto mt-3">
            Sign up
          </button>
          <span className="text-center m-2 font-thin">or</span>
          <p className="text-center">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer">
              <Link href="/sign-in">Login here</Link>
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
