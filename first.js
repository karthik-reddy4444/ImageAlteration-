
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let uploadedImage;

// Image Upload Functionality
document.getElementById('uploadImage').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            uploadedImage = img;
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});


// Resize Image
document.getElementById('resizeImage').addEventListener('click', function () {
    let width = prompt("Enter new width:");
    let height = prompt("Enter new height:");
    if (uploadedImage && width && height) {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(uploadedImage, 0, 0, width, height);
    }
});

// Convert Image
document.getElementById('convertImage').addEventListener('click', function () {
    const format = prompt("Enter format (png, jpeg, webp):");
    if (format) {
        const dataUrl = canvas.toDataURL('image/' + format);
        downloadImage(dataUrl, 'converted.' + format);
    }
});

// Compress Image
document.getElementById('compressImage').addEventListener('click', function () {
    const quality = prompt("Enter compression quality (0.1 to 1):");
    if (quality) {
        const dataUrl = canvas.toDataURL('image/jpeg', parseFloat(quality));
        downloadImage(dataUrl, 'compressed.jpg');
    }
});

// Pixelate Image
document.getElementById('pixelateImage').addEventListener('click', function () {
    let pixelSize = prompt("Enter pixelation level:");
    if (uploadedImage && pixelSize) {
        pixelSize = parseInt(pixelSize);
        const width = canvas.width / pixelSize;
        const height = canvas.height / pixelSize;

        ctx.drawImage(uploadedImage, 0, 0, width, height);
        ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    }
});

// Helper function to download image
function downloadImage(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}





