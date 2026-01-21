import React, { useState } from 'react';
import './ProfileUpdate.css'
import assets from '../../../public/assets/assets';
const ProfileUpdate = () => {

    const [profileImg, setprofileImg] = useState(null);

    return (
        <div className='profile'>
            <div className="profile-container">
                <form action="">
                    <h3>Profile Details</h3>
                    <label htmlFor="avatar">
                        <input onChange={(e) => setprofileImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
                        <img src={profileImg ? URL.createObjectURL(profileImg) : assets.avatar_icon} alt="avatar" />
                        Upload profile image
                    </label>
                    <input type="text" placeholder='Your name' required />
                    <textarea name="" placeholder='Write profile bio' id="" required></textarea>
                    <button type='submit'>Save</button>
                </form>
                <img src={assets.logo_icon} alt="" />
            </div>
        
        </div>
    );
};

export default ProfileUpdate;