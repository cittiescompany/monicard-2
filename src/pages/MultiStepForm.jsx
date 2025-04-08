import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const steps = ["Personal Info", "Business Info", "Work Info", "Account Info", "Identity Verification"];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    if (currentStep === steps.length - 1) {
      console.log("Form submitted:", data);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Stepper */}
      <div className="flex items-center justify-between relative mb-6">
        {/* Connecting Line */}
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-300">
          <div
            className="h-1 bg-blue-600 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative z-10 flex flex-col items-center text-sm font-medium"
          >
            <div
              className={`h-8 w-8 flex items-center justify-center rounded-full transition-all duration-500 ${
                index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`mt-2 ${
                index === currentStep ? "text-blue-600 font-bold" : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 0 && (
          <div>
            <Input
              label="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
              placeholder="John Doe"
              fullWidth
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}

            <Input
              label="Date of Birth"
              {...register("dob", { required: "Date of Birth is required" })}
              type="date"
              fullWidth
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <Input
              label="Business Email"
              {...register("businessEmail", { required: "Business Email is required" })}
              placeholder="business@example.com"
              fullWidth
            />
            {errors.businessEmail && <p className="text-red-500 text-sm mt-1">{errors.businessEmail.message}</p>}
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <Input
              label="Work Email"
              {...register("workEmail", { required: "Work Email is required" })}
              placeholder="work@example.com"
              fullWidth
            />
            {errors.workEmail && <p className="text-red-500 text-sm mt-1">{errors.workEmail.message}</p>}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <Input
              label="Account Number"
              {...register("accountNumber", { required: "Account Number is required" })}
              placeholder="1234567890"
              fullWidth
            />
            {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber.message}</p>}
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <Input
              label="National Identity Card Number"
              {...register("nationalId", { required: "National ID is required" })}
              placeholder="ID123456789"
              fullWidth
            />
            {errors.nationalId && <p className="text-red-500 text-sm mt-1">{errors.nationalId.message}</p>}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <Button auto flat color="primary" onPress={handleBack}>
              Back
            </Button>
          )}
          <Button auto type="submit" color="primary">
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
