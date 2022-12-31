import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { auth, db, storage } from "../../firebase";

const SignUp = () => {
  const router = useRouter();

  const userSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              email,
              displayName,
              photoURL: res.user.photoURL,
            });
          });
          router.push("/");
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex w-full h-full items-center justify-center bg-slate-400">
      <form
        onSubmit={userSubmit}
        className="flex flex-col p-3 items-start bg-white w-96 min-h-[400px] justify-between shadow-lg"
      >
        <h2 className="text-xl font-semibold">Sign Up</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="h-12 px-2 w-full outline-none bg-slate-200"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="h-12 px-2 w-full outline-none bg-slate-200"
        />
        <input
          type="password"
          placeholder="Your Password"
          className="h-12 px-2 w-full outline-none bg-slate-200"
        />
        <input type="file" id="file" className="hidden" />
        <label htmlFor="file">Upload Image</label>
        <button className="py-2 px-3 rounded-md bg-slate-600 text-white">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
