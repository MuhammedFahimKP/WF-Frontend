/**
 *
 * @param image :Blob
 * @returns
 */

export function genrateImageUrl(image: Blob): string {
  const url = URL.createObjectURL(image);

  return url;
}

export function blobToBase64Image(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Event listener for when the file has been read
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    // Event listener for errors
    reader.onerror = (error) => {
      reject(error);
    };

    // Read the blob as a data URL
    reader.readAsDataURL(blob);
  });
}
