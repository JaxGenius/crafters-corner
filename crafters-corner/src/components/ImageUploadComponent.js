import React, { useState } from 'react';

function ImageUploadComponent({ onUpload }) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
    
    const handleUpload = async () => {
      if (!image) {
        console.log('No image selected');
        return;
      }
    
      const formData = new FormData();
      formData.append('image', image);
    
      const uploadUrl = 'http://localhost:4000/upload';
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully');
        onUpload(data.filename);
      } else {
        console.log('Image upload failed');
      }
    }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" />}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUploadComponent;