/* eslint-disable react/prop-types */
import { DatePicker, Input } from "@nextui-org/react";

const PersonalInformation = ({ register, errors,setValue }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          size="sm"
          type="text"
          label="Full Name"
          {...register("personal_information.fullName", {
            required: "Full name is required",
          })}
          fullWidth
        />
        {errors?.personal_information?.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.personal_information?.fullName.message}
          </p>
        )}
      </div>

      <div>
      <DatePicker  size="sm"
          type="date"
          label="Date of Birth"
          {...register("personal_information.dob", {
              required: "Date of birth is required",
            })}
            onChange={(one) => setValue('personal_information.dob',one.toDate())}
           />
        {/* <Input
        
          fullWidth
        /> */}
        {errors?.personal_information?.dob && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.personal_information?.dob.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="text"
          label="Home Address"
          {...register("personal_information.homeAddress", {
            required: "Home address is required",
          })}
          fullWidth
        />
        {errors?.personal_information?.homeAddress && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.personal_information?.homeAddress.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="tel"
          label="Phone Number"
          {...register("personal_information.phone_number", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Invalid phone number format",
            },
          })}
          fullWidth
        />
        {errors?.personal_information?.phone_number && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.personal_information?.phone_number.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="email"
          label="Email Address"
          {...register("personal_information.email", {
            required: "Email address is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          fullWidth
        />
        {errors?.personal_information?.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.personal_information?.email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="password"
          label="Password"
          {...register("personal_information.password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          fullWidth
        />
        {errors?.personal_information?.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.personal_information?.password.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;
