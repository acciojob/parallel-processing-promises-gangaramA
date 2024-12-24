const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load a single image and return a Promise
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => resolve(img); // Resolve when the image loads successfully
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}

// Function to download and display all images
function downloadAndDisplayImages() {
  // Map image URLs to Promises
  const imagePromises = images.map(loadImage);

  Promise.all(imagePromises)
    .then((loadedImages) => {
      // Clear output div
      output.innerHTML = "";
      // Append all loaded images to the output div
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      console.error(error.message);
      output.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
}

// Attach event listener to the button
btn.addEventListener("click", downloadAndDisplayImages);


