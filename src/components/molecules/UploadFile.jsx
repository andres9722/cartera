import React from "react";

const UploadFile = ({ handleInputChange }) => {
  return (
    <div className="button-wrapper">
      <span className="label">Subir archivo</span>

      <input
        type="file"
        name="excel"
        id="excel"
        className="upload-box"
        placeholder="Upload File"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default UploadFile;
