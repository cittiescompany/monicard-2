import { useEffect, useState } from "react";
import { Button, Steps } from "antd";
import { useForm } from "react-hook-form";
import PersonalInformation from "../components/form-steps/PersonalInformation";
import BusinessInformation from "../components/form-steps/BusinessInformation";
import WorkInformation from "../components/form-steps/WorkInformation";
import AccountInformation from "../components/form-steps/AccountInformation";
// import IdentityVerification from "../components/form-steps/IdentityVerification";
// import data from "../lib/formInformation.json";
import { Checkbox } from "@nextui-org/react";
import {
  account_information,
  business_information,
  // identity_verification,
  personal_information,
  work_information,
} from "../lib/data";
import { useRegisterUser } from "../lib/api";
import { isAuthenticated } from "../lib/utils";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Personal",
    content: PersonalInformation,
  },
  {
    title: "Business",
    content: BusinessInformation,
  },
  {
    title: "Work",
    content: WorkInformation,
  },
  // {
  //   title: "Identity",
  //   content: IdentityVerification,
  // },
  {
    title: "Account",
    content: AccountInformation,
  },
];
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({});
  const [current, setCurrent] = useState(0);
  const information = [
    personal_information,
    business_information,
    work_information,
    // identity_verification,
    account_information,
  ];
  const { mutateAsync: registerUser } = useRegisterUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, []);

  const next = (data) => {
    console.log(getValues());
    // setCurrent((prev) => prev + 1);
    handleSubmit(() => {
      setCurrent((prev) => prev + 1);
    })(data);
  };

  const prev = () => {
    setCurrent((prev) => prev - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const check = async () => {
    const payload = getValues();
    console.log("payload:", payload);
    await registerUser(payload, {
      onSuccess: (data) => {
        console.log(data);
        navigate("/sign-in"); 
      },
      onError: (err) => {
        console.log("error:", err);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Steps
        className="custom-steps mt-8 md:mt-0"
        current={current}
        items={items}
        labelPlacement="vertical"
      />
      <div
        className={`relative ${
          current !== 0 && "h-[28rem]"
        } mt-8 overflow-x-hidden`}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${
              current !== 0 && "absolute"
            } p-2 top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
              index === current
                ? "translate-x-0"
                : index > current
                ? "translate-x-full"
                : "-translate-x-full"
            }`}
          >
            {/* {index === current && step.content({ register, errors, data:information[current],setValue,watch })} */}
            {index === current && (
              <step.content
                register={register}
                errors={errors}
                data={information[current]}
                setValue={setValue}
                watch={watch}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <Checkbox
          {...register("terms", { required: "You must agree to the terms" })}
          radius="full"
          classNames={{
            label: "text-sm text-gray-600",
          }}
        >
          I agree to the terms and conditions
        </Checkbox>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>
      <div
        className={`flex items-center ${
          current == 0 ? "justify-end" : "justify-between"
        }`}
      >
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            className="bg-[#3f488d] text-white hover:!text-white hover:!bg-[#31397a]"
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <button
            // type="submit"
            type="button"
            onClick={() => check()}
            className="bg-[#3f488d] text-white py-1.5 px-4 rounded text-sm hover:bg-[#31397a] focus:outline-none"
          >
            Submit
          </button>
        )}
      </div>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <a href="/sign-in" className="text-blue-500 hover:underline">
          Sign In
        </a>
      </p>
    </form>
  );
};
export default SignUpForm;
