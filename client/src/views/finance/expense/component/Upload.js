import React, { useState, useRef } from 'react';
import { Input, Label } from 'reactstrap';

function ImageUploadExample() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  function handleInputChange(event) {
    const file = event.target.files[0];
    setFile(file);
    setUploading(true);
  }

  return (
    <div>
      <div className="file-upload">
        <Label>Proof</Label>
        <Input type="file" onChange={handleInputChange} ref={inputRef} />
        {/* <div className="file-upload-label">
          {file ? `Uploading...` : 'Upload invoice/bills'}
        </div> */}
        {uploading && (
          <div className="d-flex">
            <div className="loading-expense"></div>
             <div className="file-upload-status">Waiting for upload...</div>
          </div>
        )}
        {file && (
          <div className="file-upload-progress" style={{ width: `${uploadProgress}%` }}></div>
        )}
      </div>
    </div>
  );
}

export default ImageUploadExample;
