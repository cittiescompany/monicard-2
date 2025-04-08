/* eslint-disable react/prop-types */
import { Input, Select, SelectItem } from '@nextui-org/react'
import FileUpload from '../FileUpload'
import UploadUtility from '../UploadUtility';
import { useCallback, useEffect, useState } from 'react'
import { useVerifyBvn } from '../../lib/api';
import { debounce } from '../../lib/utils';
import { ImSpinner8 } from 'react-icons/im';

const IdentityVerification = ({register, errors,setValue,watch}) => {
  const [bvn, setBvn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const {mutate:verifyBvn, isPending, isError}=useVerifyBvn()

    useEffect(() => {
      if (bvn.length === 11) {
        debouncedValidateBVN({number:bvn});
      }
    }, [bvn]);

  const handleChange = (value,name) => {

    if (value.length < bvn.length || value.length <= 11) {
      console.log(value);
      
      setValue(name, value);
      setBvn(value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      console.log('backspace or delete pressed');
      
    } else if (bvn.length >= 11) {
      event.preventDefault(); 
    }
  };

  const handleVerify = (payload) => {
    console.log('triggered')
    setIsLoading(true);
verifyBvn(payload,{onSuccess:(data)=>{
console.log(data);
if (data?.data?.status) {
  setValidationResult({
    message: `${data.data.data.firstName} ${data.data.data.lastName}`,
    type: "success",
  });
  setIsLoading(false);
} else {
  setValidationResult({
    message: "Invalid BVN",
    type: "error",
  });
  setIsLoading(false);
}
},onError:()=>{
  setValidationResult({
    message: "Invalid BVN",
    type: "error",
  });
  setIsLoading(false);
}})
    // setTimeout(() => {
    //   setIsVerified(true);
    //   setIsLoading(false);
    // }, 500);
  };

   const debouncedValidateBVN = useCallback(
      debounce((payload) => {
        console.log(payload);
        
        handleVerify(payload);
      }, 500), // 500ms delay
      []
    );

 const options= [
    { label: "National Identification Card", name: "national_identification_card" },
    { label: "Driver's License", name: "drivers_license" },
    { label: "Voter's Card", name: "voters_card" },
    { label: "International Passport", name: "international_passport" },
    { label: "CAC", name: "cac" },
    { label: "Tax Clearance", name: "tax_clearance" },
    { label: "SSN", name: "ssn" },
  ]

  const selectedIdentity = watch("identity_verification.identity", "");
  return (
      <div className="flex flex-col gap-4">
            <div>
                 <Select
                label='Identity'
                 required
                defaultValue=""
                {...register('identity_verification.identity', {
                  required: `identity is required`,
                  onChange: (e) =>setValue('identity_verification.identity', e.target.value),
                })}
              >
              <SelectItem value="" disabled>Select an option</SelectItem>
                {options.map((item) => (
                  <SelectItem key={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              {errors?.identity_verification?.identity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.identity_verification?.identity.message}
                </p>
              )}
            </div>
            <div className={!selectedIdentity&&'hidden'}>
           <p className='mb-2'>Upload your <i className='font-semibold'>{selectedIdentity}</i> image.</p>
            <FileUpload setValue={setValue} errors={errors} register={register}/>
            </div>
            <div>
              <Input
                size="sm"
                type='number'
                label='BVN'
                 required
                {...register('identity_verification.bvn', {required: `BVN is required`,  validate: () => {
                  if(isError){
                      return 'Invalid BVN';
                    }else{
                      return '';
                    }
                  } })}
                onKeyDown={handleKeyDown}
                    onChange={(e) => handleChange(e.target.value, 'identity_verification.bvn')}
                fullWidth
              />
              {errors?.identity_verification?.bvn && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.identity_verification?.bvn.message}
                </p>
              )}
                <p
                                  className={`${
                                    validationResult?.type == "error"
                                      ? "text-red-600"
                                      : "text-orange-500"
                                  } text-sm font-semibold mt-1 flex items-center`}
                                >
                                  {isPending ? (
                                    <ImSpinner8
                                      size={15}
                                      className="animate-spin text-gray-500 mt-2"
                                    />
                                  ) : (
                                   <span>{validationResult?.type == "success"&&validationResult?.message}</span>
                                  )}
                                </p>
            </div>
            <div>
           <p className='mb-2'>Upload your utility bills</p>
            <UploadUtility setValue={setValue} errors={errors} register={register}/>
            </div>



      {/* {data?.map((info, i) => (
        <div key={i}>
          {info.fieldType === "select" ? (
            <div>
                 <Select
                label={info.label}
                 required={info.required}
                defaultValue=""
                {...register(info.name, {
                  required: `${info.label} is required`,
                  onChange: (e) =>setValue(info.name, e.target.value),
                })}
              >
              <SelectItem value="" disabled>Select an option</SelectItem>
                {info.options.map((item) => (
                  <SelectItem key={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              {errors?.identity_verification?[info.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.identity_verification?[info.name].message}
                </p>
              )}
            </div>
          ) : (
            <div>
            {info.type === "file"?
            (<div className={!selectedIdentity&&'hidden'}>
           <p>Upload your <i className='font-semibold'>{selectedIdentity}</i> image.</p>
            <FileUpload/>
            <div></div>
            </div>):
            (<div>
              <Input
                size="sm"
                type={info.type}
                label={info.label}
                 required={info.required}
                {...register(info.name, { required: `${info.label} is required` })}
                fullWidth
              />
              {errors?.identity_verification?[info.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.identity_verification?[info.name].message}
                </p>
              )}
            </div>)
            }
            </div>
          )}
        </div>
      ))}  */}
    </div>
  )
}

export default IdentityVerification