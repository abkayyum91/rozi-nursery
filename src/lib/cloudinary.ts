import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
})


// remove image from cloudinary
export const removeOnCloudinary = async (public_id: string)=>{
  try {
    const response = await cloudinary.uploader.destroy(public_id);
    return JSON.stringify(response);
  } catch (error) {
    console.log("Error in roveing image on cloudinary: ", error)
  }
}