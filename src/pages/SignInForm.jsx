import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../lib/api";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext.jsx";
import { ImSpinner8 } from "react-icons/im";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {mutateAsync:loginUser, isPending}=useLoginUser()
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, []);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    await loginUser(data, {
      onSuccess: (response) => {
        console.log(response);
        setErrorMessage('')
        login(response.user); 
        // window.location.href = "/"; // Redirect user after login
      },
      onError: (err) => {
        setErrorMessage(err.response.data.message);
        console.log("error:", err.response.data.message);
      },
    });
  };

  return (
    <div className="p-4 mt-10 lg:mt-0">
    <div className="hidden lg:block my-6 text-center text-[#31397a]">
    <h2 className="font-bold text-3xl">Welcome Back</h2>
    <p className="mt-2">Provide your login details</p>
    </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div>
            <Input
              size="sm"
              type='email'
              label='Email Address'
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              fullWidth
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              size="sm"
              type='password'
              label='Password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              fullWidth
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between my-6 ">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              {...register('rememberMe')}
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
        <Button
          type="submit"
          isDisabled={isPending}
          className="w-full bg-[#3f488d] text-white py-2 px-4 rounded-lg hover:bg-[#31397a] focus:outline-none "
        >
         {isPending?<span className="flex items-center gap-1"><ImSpinner8 className="animate-spin" size={18} /> Loading</span> : "Sign In"}
        </Button>
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
