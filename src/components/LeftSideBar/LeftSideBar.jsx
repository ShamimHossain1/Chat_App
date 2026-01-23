import React, { useContext, useState } from "react";
import "./LeftSideBar.css";
import assets from "../../../public/assets/assets";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
const LeftSideBar = () => {
  const { userData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      // console.log("Search input:", input);

      if (input && userData?.id) {
        setShowSearch(true);
        const userRef = collection(db, "user");

        // Try exact match first
        const exactQuery = query(
          userRef,
          where("username", "==", input.toLowerCase()),
        );
        const exactSnap = await getDocs(exactQuery);

        if (!exactSnap.empty) {
          const exactUser = exactSnap.docs.find(
            (doc) => doc.data().id !== userData.id,
          );
          if (exactUser) {
            // console.log("Found exact match:", exactUser.data().username);
            setUser(exactUser.data());
            return;
          }
        }

        // If no exact match, try prefix matching
        const prefixQuery = query(
          userRef,
          where("username", ">=", input.toLowerCase()),
          where("username", "<", input.toLowerCase() + "\uf8ff"),
        );
        const prefixSnap = await getDocs(prefixQuery);

        const filteredUsers = prefixSnap.docs
          .map((doc) => doc.data())
          .filter(
            (user) =>
              user.username.toLowerCase().startsWith(input.toLowerCase()) &&
              user.id !== userData.id,
          );

        // console.log(
        //   "Prefix search results:",
        //   filteredUsers.map((u) => u.username),
        // );

        if (filteredUsers.length > 0) {
          setUser(filteredUsers[0]);
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
        setUser(null);
      }
    } catch (err) {
      // console.log("Search error:", err);
    }
  };

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="ls-logo" alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search here.."
          />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && user ? (
          <div className="friends add-user">
            <img src={user.avatar || assets.profile_img} alt="" />
            <p>{user.username}</p>
          </div>
        ) : (
          Array(12)
            .fill("")
            .map((item, index) => (
              <div key={index} className="friends">
                <img src={assets.profile_img} alt="" />
                <div>
                  <p>John</p>
                  <span>Hello how are you</span>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
