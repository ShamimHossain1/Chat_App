import React, { useEffect, useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../../public/assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../library/upload";
const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [profileImg, setprofileImg] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState(null);
  const [prevImg, setPrevImg] = useState(null);

  const profileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!prevImg && !profileImg) {
        toast.error("Please select a profile image");
        return;
      }
      const docRef = doc(db, "user", uid);
      if (profileImg) {
        const imgUrl = await upload(profileImg);
        setPrevImg(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          name: name,
          bio: bio,
        });
      } else {
        await updateDoc(docRef, {
          name: name,
          bio: bio,
        });
      }
      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile: " + err.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "user", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().avatar) {
          setPrevImg(docSnap.data().avatar);
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }
      } else {
        console.log("No such document!");
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate} action="">
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e) => setprofileImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                profileImg
                  ? URL.createObjectURL(profileImg)
                  : assets.avatar_icon
              }
              alt="avatar"
            />
            Upload profile image
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            name=""
            placeholder="Write profile bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            id=""
            required
          ></textarea>
          <button type="submit">Save</button>
        </form>
        <img src={assets.logo_icon} alt="" />
      </div>
    </div>
  );
};

export default ProfileUpdate;
