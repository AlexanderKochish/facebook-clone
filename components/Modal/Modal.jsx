import React, { useContext, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import SaveSelectModal from "./SaveSelectModal";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Modal = ({ setProfilePhoto, uploadProfilePhoto, profile }) => {
  const [profileGallery, setProfileGallery] = useState([]);
  const [file, setFile] = useState(null);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const showModalProfilePhoto = () => {
    setProfilePhoto(!uploadProfilePhoto);
  };
  useEffect(() => {
    if (file !== null) {
      setOpenSaveModal(!openSaveModal);
      try {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (image) => {
              if (!currentUser) return;
              await updateProfile(currentUser, {
                photoURL: image,
              }),
                await updateDoc(doc(db, "users", currentUser?.uid), {
                  photoURL: image,
                });
              await setDoc(
                doc(db, "users", currentUser?.uid, "gallery", "profilePhoto"),
                {
                  images: arrayUnion({
                    id: uuidv4(),
                    createdAt: Timestamp.now(),
                    image,
                  }),
                },
                { merge: true }
              );
            });
          }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [file]);

  const handleSelectProfilePhoto = async (img) => {
    try {
      await updateProfile(currentUser, {
        photoURL: img,
      });
      await updateDoc(doc(db, "users", currentUser?.uid), {
        photoURL: img,
      });
      console.log(res);
      setProfilePhoto(!uploadProfilePhoto);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const getProfileGallery = async () => {
      const profileGalleryRef = doc(
        db,
        "users",
        currentUser.uid,
        "gallery",
        "profilePhoto"
      );
      const res = await getDoc(profileGalleryRef);
      setProfileGallery(res.data()?.images);
    };
    getProfileGallery();
  }, [currentUser]);

  return (
    <>
      {openSaveModal ? (
        <SaveSelectModal
          setProfilePhoto={setProfilePhoto}
          uploadProfilePhoto={uploadProfilePhoto}
          openSaveModal={openSaveModal}
          setOpenSaveModal={setOpenSaveModal}
          numIndex={profileGallery?.length}
          profile={profile}
        />
      ) : (
        <div className="fixed top-0 left-0 right-0 w-screen min-h-full flex items-center justify-center z-30 bg-white/80">
          <div className="bg-white min-w-[500px] p-5 min-h-[400px] rounded-lg drop-shadow-2xl absolute z-40">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="text-2xl font-bold">Update Profile Photo</h3>
              <button
                onClick={showModalProfilePhoto}
                className="bg-gray-200 hover:bg-slate-300 rounded-[50%] p-2"
              >
                <MdOutlineClose className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <ul className="flex flex-col w-full py-5">
              <li className="flex justify-center bg-slate-200 hover:bg-slate-300 w-full py-2 rounded-lg">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  id="upload_profile_photo"
                />
                <label
                  htmlFor="upload_profile_photo"
                  className="w-full h-full flex cursor-pointer justify-center items-center"
                >
                  <HiPlus className="mr-1" /> Upload photo{file?.name}
                </label>
              </li>
            </ul>
            <div>
              <h4 className="font-semibold py-1">Recomended Photo</h4>
              <ul className="flex flex-wrap">
                {profileGallery?.map(({ id, image }) => (
                  <li key={id} className="flex self-start">
                    <div
                      onClick={() => handleSelectProfilePhoto(image)}
                      className="relative w-36 h-40 m-1 cursor-pointer hover:scale-105 duration-300"
                    >
                      <Image
                        src={image}
                        fill
                        alt="profile"
                        className="object-cover rounded-md"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
