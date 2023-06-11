import React, { Suspense, lazy, useContext, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../Contexts/AuthContext";
import { firestoredb } from "..";
import { useRef } from "react";
const Profile = ({ showUserProfile }) => {
  const ProfileInfo = lazy(() => import("./ProfileInfo"));
  const [data, setData] = useState(null);
  const [editUsername, setEditUsername] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const infoRef = useRef({});
  const { currentUser } = useContext(AuthContext);
  const currentUserRef = useRef(null);
  const getData = async () => {
    const docRef = doc(firestoredb, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    const { displayName, photoURL, about } = docSnap.data();
    setData({ displayName, photoURL, about });
    currentUserRef.current = currentUser.uid;
    infoRef.current = { username: docSnap.data().displayName, about };
  };
  {
    currentUser.uid != currentUserRef.current && getData();
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && editUsername) {
      setEditUsername(false);
      setData((prev) => ({ ...prev, displayName: infoRef.current.username }));
    } else if (e.key === "Escape" && editAbout) {
      setEditAbout(false);
      setData((prev) => ({ ...prev, about: infoRef.current.about }));
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    infoRef.current = { username: value, about: data.about };
  };

  const handleEdit = async (param) => {
    const userRef = doc(firestoredb, "users", currentUser.uid);
    switch (param.target.alt) {
      case "save username": {
        await updateDoc(userRef, {
          displayName: data.displayName,
        });
      }
      case "save about":
        {
          await updateDoc(userRef, {
            about: data.about,
          });
        }

        break;
    }
  };

  return (
    <Suspense fallback={<h1>Load</h1>}>
      <ProfileInfo
        showUserProfile={showUserProfile}
        data={data}
        setData={setData}
        editUsername={editUsername}
        setEditUsername={setEditUsername}
        editAbout={editAbout}
        setEditAbout={setEditAbout}
        handleEdit={handleEdit}
        handleChange={handleChange}
      />
    </Suspense>
  );
};

export default Profile;
