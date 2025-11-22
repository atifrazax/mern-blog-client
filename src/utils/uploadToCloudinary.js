import axios from "axios";

const getSignature = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/signature`, {
      withCredentials: true,
    });
    return res.data; // Return signature (timestamp, apiKey, cloudName, and signature)
  } catch (error) {
    console.log(error);
  }
};
export const uploadToCloudinary = async (file) => {
  const signature = await getSignature();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature.signature);
  formData.append("timestamp", signature.timestamp);
  formData.append("api_key", signature.apiKey);
  // options
  formData.append("allowed_formats", signature.allowed_formats);
  formData.append("folder", "mern-blog-1");
  const url = `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`;
  try {
    const uploadRes = await axios.post(url, formData);
    const data = await uploadRes.data;
    console.log("Uploaded to Cloudinary", data);
    return {
      success: true,
      imageUrl: data.secure_url,
      imagePublicId: data.public_id,
    };
  } catch {
    return {
      success: false,
      message: "Image upload failed. Please try again.",
    };
  }
};
