const backendUri = import.meta.env.VITE_BACKEND_URI;
const openAiAPI = import.meta.env.VITE_OPENAI_API_KEY;
const cloud_name= import.meta.env.CLOUDINARY_API_NAME; 
const  api_key= import.meta.env.CLOUDINARY_API_KEY; 
const  api_secret= import.meta.env.CLOUDINARY_API_SECRET; 
export {
    backendUri,
    openAiAPI,
    cloud_name,
    api_key,
    api_secret
};