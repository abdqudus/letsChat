import React, { useContext, useRef, useState } from "react";
import Back from "../img/back.png";
import Edit from "../img/edit.png";
import CheckMark from "../img/checkmark.png";
import Emoji from "../img/happy (1).png";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../Contexts/AuthContext";
import { firestoredb } from "..";
import defaultDP from "../img/user.png";
import removeDp from "../utils/removeDp";
const ProfileInfo = ({
  data,
  editUsername,
  editAbout,
  setEditUsername,
  setEditAbout,
  handleChange,
  handleEdit,
  showUserProfile,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [dpUrl, setDpUrl] = useState(null);

  const handleRemoveDp = () => {
    removeDp(currentUser);
    setShowOptions(false);
  };
  const handleSelectPhoto = async (e) => {
    const storage = getStorage();
    const file = e.target.files[0];
    const imgRef = ref(
      storage,
      `images/${currentUser.uid}/${currentUser.displayName}`
    );
    setShowOptions(false);
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    console.log(url);
    setDpUrl(url);
    await updateProfile(currentUser, {
      photoURL: url,
    });
    const userRef = doc(firestoredb, "users", currentUser.uid);

    await updateDoc(userRef, {
      photoURL: url,
    });
  };
  const pic = data?.photoURL ? data.photoURL : defaultDP;
  return (
    <>
      <aside
        className="owner-profile"
        onClick={(e) => {
          console.dir(e.target);
        }}
      >
        <div className="header">
          <img
            onClick={() => {
              showUserProfile(false);
            }}
            src={Back}
            alt="back icon"
          />
          <h4>Profile</h4>
        </div>
        <div className="dp-div">
          <img onClick={() => setShowOptions(true)} src={dpUrl ? dpUrl : pic} />
          {showOptions && (
            <div onClick={(e) => e.stopPropagation()} className="dp-options">
              <input
                required
                type="file"
                accept="image/*"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleSelectPhoto}
              />
              <label id="upload-dp" htmlFor="file">
                Upload Photo
              </label>
              <p onClick={handleRemoveDp}>Remove Photo</p>
            </div>
          )}
        </div>
        <div className="display-name-div">
          <p>Your name</p>
          {!editUsername && (
            <div>
              <p>{data?.displayName}</p>
              <img src={Edit} onClick={() => setEditUsername(true)} />
            </div>
          )}
          {editUsername && (
            <div className="edit-username">
              <input
                value={data?.displayName}
                name="displayName"
                onChange={handleChange}
              />
              <img src={Emoji} />
              <img
                src={CheckMark}
                alt="save username"
                onClick={(e) => handleEdit(e)}
              />
            </div>
          )}
        </div>
        <div className="fourth-div">
          <p>
            This is your username. This name will be visible to your chatApp
            contacts
          </p>
        </div>
        <div className="about">
          <p>About</p>
          {!editAbout && (
            <div>
              <p>{data?.about}</p>
              <img src={Edit} onClick={() => setEditAbout(true)} />
            </div>
          )}
          {editAbout && (
            <div className="edit-about">
              <input value={data?.about} name="about" onChange={handleChange} />
              <img src={Emoji} />
              <img
                src={CheckMark}
                alt="save about"
                onClick={(e) => handleEdit(e)}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default ProfileInfo;
