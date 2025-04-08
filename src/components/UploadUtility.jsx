import { useState } from "react";
import PropTypes from 'prop-types'
const UploadUtility = ({setValue,register,errors}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrlImg, setPreviewUrlImg] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    
    if (file) {
      setSelectedFile(file);
      setPreviewUrlImg(URL.createObjectURL(file)); // Generate a preview URL for the file
      // setValue('identity_verification.utility',file);
      setValue(file);
    }
  };

  return (
    <div>
    <div className="flex items-center gap-4">
     <label
            htmlFor="inputFile"
            className="cursor-pointer w-16 h-16 border-dashed border-gray-300 bg-blue-100 flex items-center justify-center rounded-lg"
          >
            <span className="text-gray-400 text-sm">+</span>
          </label>
          <input
            id="inputFile"
            type="file"
            accept="image/*"
            className="hidden"
            {...register('identity_verification.utility', { required: `Upload your utility bill` })}
            onChange={handleFileChange}
          />
       {selectedFile && (
          <div className="flex gap-4 items-end bg-gray-50 w-full rounded-lg">
             <img
              src={previewUrlImg}
              alt="Uploaded Thumbnail"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <ul className="text-sm text-gray-500">
              <li>
                <strong>Name:</strong> {selectedFile.name}
              </li>
              <li>
                <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
              </li>
            </ul>
          </div>
        )}
    </div>
    {errors?.identity_verification?.utility && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.identity_verification?.utility.message}
                </p>
              )}
    </div>
  );
};

export default UploadUtility;
UploadUtility.propTypes = {
  setValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}
