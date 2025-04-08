import { useRef, useState } from "react";
import { Button, Steps } from "antd";
import { useForm } from "react-hook-form";
import PersonalInformation from "../components/form-steps/PersonalInformation";
import BusinessInformation from "../components/form-steps/BusinessInformation";
import WorkInformation from "../components/form-steps/WorkInformation";
import AccountInformation from "../components/form-steps/AccountInformation";
import IdentityVerification from "../components/form-steps/IdentityVerification";
// import data from "../lib/formInformation.json";
import { Checkbox } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  account_information,
  business_information,
  identity_verification,
  personal_information,
  work_information,
} from "../lib/data";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: "onSubmit",
  });
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: "Personal",
      content: (
        <PersonalInformation
          register={register}
          errors={errors}
          data={personal_information}
          setValue={setValue}
        />
      ),
    },
    {
      title: "Business",
      content: (
        <BusinessInformation
          register={register}
          errors={errors}
          data={business_information}
          setValue={setValue}
        />
      ),
    },
    {
      title: "Work",
      content: (
        <WorkInformation
          register={register}
          errors={errors}
          data={work_information}
          setValue={setValue}
        />
      ),
    },
    {
      title: "Identity",
      content: (
        <IdentityVerification
          register={register}
          watch={watch}
          errors={errors}
          data={identity_verification}
          setValue={setValue}
        />
      ),
    },
    {
      title: "Account",
      content: (
        <AccountInformation
          register={register}
          errors={errors}
          data={account_information}
          setValue={setValue}
        />
      ),
    },
  ];

  const next = (data) => {
    console.log(errors);

    console.log(getValues());

    setCurrent((prev) => prev + 1);

    if (swiperRef.current) {
      setCurrent((prev) => prev + 1);
      swiperRef.current?.slideNext();
    }
    // handleSubmit(() => {
    //   if(swiperRef.current){
    //     setCurrent((prev) => prev + 1);
    //   swiperRef.current?.slideNext()
    //   }
    // })(data);
  };

  const prev = () => {
    if (swiperRef.current) {
      setCurrent((prev) => prev - 1);
      swiperRef.current?.slidePrev();
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onSubmit = (data) => {
    console.log("Hello world");
    console.log(errors);

    console.log("Form submitted:", data);
  };


  const check=()=>{
    console.log(getValues());
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Steps
        className="custom-steps mt-8 md:mt-0"
        current={current}
        items={items}
        labelPlacement="vertical"
      />
{steps[current].content}
      
      {/* <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Save swiper instance in ref
        }}
        spaceBetween={50}
        slidesPerView={1}
        className="h-auto"
      >
        {steps.map((step) => (
          <SwiperSlide key={step.id} className="my-6">
            {step.content}
          </SwiperSlide>
        ))}
      </Swiper> */}
      {/* <div className="mb-4">
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
      </div> */}
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
        {/* <button >Submi</button> */}
        {current === steps.length - 1 && (
          <button
            // type="submit"
            // type="button"
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
export default RegisterForm;
