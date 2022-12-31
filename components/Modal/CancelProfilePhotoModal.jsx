import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { MdOutlineClose } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";

const CancelProfilePhotoModal = ({
  image,
  profile,
  profileGallery,
  openCancelModal,
  setCancelModal,
  setProfilePhoto,
  setOpenSaveModal,
  openSaveModal,
}) => {
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
      images: arrayRemove(profileGallery[image]),
    });
  };

  const closeModalAndCancelPhoto = () => {
    resetSavePhoto();
    setCancelModal(!openCancelModal);
    setOpenSaveModal(!openSaveModal);
    setProfilePhoto();
  };

  return (
    <div className="fixed top-0 left-0 w-screen min-h-full flex items-center justify-center z-40 bg-white/80">
      <div className="bg-white min-w-[500px] p-5 min-h-[100px] rounded-lg drop-shadow-2xl absolute z-30">
        <div className="flex items-center justify-between border-b-2 border-gray-300 p-3">
          <h3 className="text-2xl font-bold">Cancel changes</h3>
          <button
            onClick={closeModalAndCancelPhoto}
            className="bg-gray-200 hover:bg-slate-300 rounded-[50%] p-2"
          >
            <MdOutlineClose className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <div className="my-4 text-slate-600 font-semibold text-lg">
          <p>Are you sure you want to undo the changes?</p>
        </div>
        <div className="flex space-x-2 items-center justify-end border-t-2 border-gray-300 pt-2 mt-2">
          <button
            onClick={() => setCancelModal(!openCancelModal)}
            className="text-sky-600 hover:bg-sky-100 px-8 py-2 rounded-md"
          >
            Cancellation
          </button>
          <button
            onClick={() => setCancelModal(!openCancelModal)}
            className="text-white bg-sky-600 hover:bg-sky-700 px-8 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelProfilePhotoModal;
