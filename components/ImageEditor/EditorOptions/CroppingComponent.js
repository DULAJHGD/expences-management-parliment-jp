import React, { useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Input, Row, Col } from 'reactstrap';
import { getCroppedImg } from '../cropImageHelper'; // Ensure this is correct
import IconButton from '@mui/material/IconButton';
import CropIcon from '@mui/icons-material/Crop';

const CroppingComponent = ({ 
  selectedImage, 
  setSelectedImage, 
  crop, 
  setCrop, 
  zoom, 
  setZoom, 
  aspectRatio, 
  setAspectRatio, 
  rotation, 
  setIsCropping 
}) => {
  const defaultCrop = { x: 0, y: 0 };
  const defaultZoom = 1;

  useEffect(() => {
    if (!crop) {
      setCrop(defaultCrop);
    }
    if (zoom === undefined) {
      setZoom(defaultZoom);
    }
  }, [crop, zoom, setCrop, setZoom]);

  const handleCrop = async () => {
    if (!selectedImage || !crop) return; // Validate presence of selectedImage and crop
    try {
      const croppedImg = await getCroppedImg(selectedImage, crop, rotation);
      console.log("Cropped Image:", croppedImg); // Debugging line to check the cropped image
      setSelectedImage(croppedImg); // Replace the original image with the cropped image
      setIsCropping(false); // Exit cropping mode
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };
  

  const handleAspectRatioChange = (event) => {
    const value = event.target.value;
    setAspectRatio(value === 'free' ? null : parseFloat(value));
  };

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>
          <label>Select Aspect Ratio:</label>
          <Input type="select" onChange={handleAspectRatioChange} value={aspectRatio || 'free'}>
            <option value="free">Free (No Fixed Ratio)</option>
            <option value={1}>1:1 (Square)</option>
            <option value={4 / 3}>4:3</option>
            <option value={16 / 9}>16:9</option>
            <option value={3 / 2}>3:2</option>
          </Input>
        </Col>
      </Row>
      <div style={{ position: 'relative', width: '100%', height: '400px', margin: '0 auto' }}>
        <Cropper
          image={selectedImage}
          crop={crop || defaultCrop}
          zoom={zoom || defaultZoom}
          aspect={aspectRatio}
          cropShape="rect"
          showGrid={true}
          rotation={rotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
        />
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <IconButton onClick={handleCrop} aria-label="Crop">
            <CropIcon />
          </IconButton>
          <IconButton onClick={() => setIsCropping(false)} style={{ marginLeft: '10px' }} aria-label="Cancel">
            <i className="tim-icons icon-simple-remove" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default CroppingComponent;
