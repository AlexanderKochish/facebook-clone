import React, { useContext, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import userPhoto from "../../public/user-icon.png";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Image from "next/image";
import { updateProfile } from "firebase/auth";
import CancelProfilePhotoModal from "./CancelProfilePhotoModal";
import { AuthContext } from "../../context/AuthContext";

const SaveSelectModal = ({
  numIndex,
  setOpenSaveModal,
  setProfilePhoto,
  uploadProfilePhoto,
  openSaveModal,
  profile,
}) => {
  const [profileGallery, setProfileGallery] = useState([]);
  const [openCancelModal, setCancelModal] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const resetSavePhoto = async () => {
    const resetLastPhoto = doc(
      db,
      "users",
      currentUser?.uid,
      "gallery",
      "profilePhoto"
    );
    await updateDoc(resetLastPhoto, {
      images: arrayRemove(profileGallery[numIndex]),
    });
    setOpenSaveModal(!openSaveModal);
    setProfilePhoto();
  };

  const saveProfilePhoto = async () => {
    await updateProfile(currentUser, {
      photoURL: profileGallery[numIndex]?.image,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        console.log(error.message);
      });
    setOpenSaveModal(!openSaveModal);
    setProfilePhoto(!uploadProfilePhoto);
  };
  useEffect(() => {
    if (!profile) return;
    const getProfileLastPhoto = async () => {
      const unsub = onSnapshot(
        doc(db, "users", profile.uid, "gallery", "profilePhoto"),
        (doc) => {
          setProfileGallery(doc.data()?.images);
        }
      );
      return () => unsub();
    };
    getProfileLastPhoto();

    return () => {
      getProfileLastPhoto();
    };
  }, [profile]);

  useEffect(() => {
    if (!profile) return;
    const getProfileLastPhoto = async () => {
      const profileGalleryRef = doc(
        db,
        "users",
        profile.uid,
        "gallery",
        "profilePhoto"
      );
      const res = await getDoc(profileGalleryRef);
      setProfileGallery(res.data()?.images);
    };
    getProfileLastPhoto();
  }, [profile]);

  return (
    <>
      {openCancelModal ? (
        <CancelProfilePhotoModal
          image={numIndex}
          setProfilePhoto={setProfilePhoto}
          openCancelModal={openCancelModal}
          setCancelModal={setCancelModal}
          openSaveModal={openSaveModal}
          setOpenSaveModal={setOpenSaveModal}
          profileGallery={profileGallery}
          profile={profile}
        />
      ) : (
        <div className="fixed top-0 left-0 right-0 w-screen min-h-full flex items-center justify-center z-20 bg-white/80">
          <div className="bg-white min-w-[500px] p-5 min-h-[400px] rounded-lg drop-shadow-2xl absolute z-30">
            <div className="flex items-center justify-between border-b-2 border-gray-300 p-3">
              <h3 className="text-2xl font-bold">Update Profile Photo</h3>
              <button
                onClick={() => setCancelModal(!openCancelModal)}
                className="bg-gray-200 hover:bg-slate-300 rounded-[50%] p-2"
              >
                <MdOutlineClose className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <div>
              <ul className="flex justify-center items-center my-5">
                <li>
                  <div className="relative w-60 h-72 m-1">
                    <Image
                      src={profileGallery[numIndex]?.image || userPhoto}
                      fill
                      alt="profile"
                      className="object-cover"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex space-x-2 items-center justify-end border-t-2 border-gray-300 pt-2 mt-2">
              <button
                onClick={resetSavePhoto}
                className="text-sky-600 hover:bg-sky-100 px-8 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveProfilePhoto}
                className="text-white bg-sky-600 hover:bg-sky-700 px-8 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveSelectModal;
