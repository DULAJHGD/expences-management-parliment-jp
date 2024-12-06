// cropImageHelper.js
export const getCroppedImg = (imageSrc, pixelCrop, rotation = 0) => {
    const image = new Image();
    image.src = imageSrc;
  
    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        const rotRad = (rotation * Math.PI) / 180;
        const { width: bBoxWidth, height: bBoxHeight } = {
          width: image.width * Math.abs(Math.cos(rotRad)) + image.height * Math.abs(Math.sin(rotRad)),
          height: image.height * Math.abs(Math.cos(rotRad)) + image.width * Math.abs(Math.sin(rotRad)),
        };
  
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
  
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotRad);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
  
        ctx.drawImage(
          image,
          -pixelCrop.x,
          -pixelCrop.y,
          image.width,
          image.height
        );
  
        resolve(canvas.toDataURL('image/jpeg'));
      };
  
      image.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  };
    