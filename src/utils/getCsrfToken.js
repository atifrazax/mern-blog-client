import axios from "axios";

export default async function getCsrfToken() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/csrf`, {
      withCredentials: true,
    });
    return res.data.csrfToken;
  } catch (error) {
    console.error(error);
  }
}
