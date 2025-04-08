/* eslint-disable react/prop-types */
import { Input, Select, SelectItem } from '@nextui-org/react'

const BusinessInformation = ({ register, errors, setValue }) => {
  const options = [
    { label: "Banking", name: "banking" },
    { label: "Finance", name: "finance" },
    { label: "Technology", name: "technology" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Select
          label="Business Sector"
          defaultValue=""
          required={true}
          {...register('business_information.business_sector', {
            required: 'Business sector is required',
            onChange: (e) => setValue('business_information.business_sector', e.target.value),
          })}
        >
          <SelectItem value="" disabled>Select an option</SelectItem>
          {options?.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        {errors?.business_information?.business_sector && (
          <p className="text-red-500 text-sm mt-1">
            {errors.business_information.business_sector.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="email"
          label="Business Email"
          required={true}
          {...register('business_information.business_email', {
            required: 'Business email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email format',
            },
          })}
          fullWidth
        />
        {errors?.business_information?.business_email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.business_information.business_email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="tel"
          label="Business Whatsapp Number"
          required={true}
          {...register('business_information.business_whatsapp_number', {
            required: 'Business WhatsApp number is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Invalid phone number format',
            },
          })}
          fullWidth
        />
        {errors?.business_information?.business_whatsapp_number && (
          <p className="text-red-500 text-sm mt-1">
            {errors.business_information.business_whatsapp_number.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="text"
          label="Business Address"
          required={true}
          {...register('business_information.business_address', {
            required: 'Business address is required',
          })}
          fullWidth
        />
        {errors?.business_information?.business_address && (
          <p className="text-red-500 text-sm mt-1">
            {errors.business_information.business_address.message}
          </p>
        )}
      </div>

      <div>
        <Input
          size="sm"
          type="text"
          label="Business Bus Stop"
          {...register('business_information.business_bstop')}
          fullWidth
        />
        {errors?.business_information?.business_bstop && (
          <p className="text-red-500 text-sm mt-1">
            {errors.business_information.business_bstop.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BusinessInformation;
