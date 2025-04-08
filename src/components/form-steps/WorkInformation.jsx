/* eslint-disable react/prop-types */
import { Input } from '@nextui-org/react'


const WorkInformation = ({ register, errors }) => {

  
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          size="sm"
          type="email"
          label="Work Email"
          {...register("work_information.work_email", {
            required: "Work email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          fullWidth
        />
        {errors?.work_information?.work_email && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.work_information?.work_email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="tel"
          label="Work Phone Number"
          {...register("work_information.work_number", {
            required: "Work phone number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Invalid phone number format",
            },
          })}
          fullWidth
        />
        {errors?.work_information?.work_number && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.work_information?.work_number.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="text"
          label="Office Address"
          {...register("work_information.office_address", {
            required: "Office address is required",
          })}
          fullWidth
        />
        {errors?.work_information?.office_address && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.work_information?.office_address.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="text"
          label="Office Closest Bus Stop"
          {...register("work_information.office_bstop", {
            required: "Office closest bus stop is required",
          })}
          fullWidth
        />
        {errors?.work_information?.office_bstop && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.work_information?.office_bstop.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkInformation;
