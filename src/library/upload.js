import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

const upload = (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${Date.now() + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error); // 👈 important
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Upload successful, URL:", downloadURL);
          resolve(downloadURL); // ✅ NOW IT WORKS
        } catch (urlError) {
          console.error("Error getting download URL:", urlError);
          reject(urlError);
        }
      },
    );
  });
};

export default upload;
