import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 } from "uuid";
import Post from "./Posts/Post";
import PostInput from "./Posts/PostInput";

const ProfilePosts = ({ posts, profile }) => {
  const [file, setFile] = useState(null);
  const [postText, setPostText] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    const postRef = collection(db, "users", profile?.uid, "posts");
    const storageRef = ref(storage, `images/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(
              postRef,
              {
                id: v4(),
                createdAt: Timestamp.now(),
                text: postText,
                image: downloadURL,
              },
              { merge: true }
            );
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
    setPostText("");
  };

  return (
    <div className="flex flex-col w-full min-h-screen self-start">
      <PostInput
        setFile={setFile}
        postText={postText}
        setPostText={setPostText}
        createPost={createPost}
        profile={profile}
      />
      {posts?.map((post) => (
        <Post key={post.id} post={post} profile={profile} />
      ))}
    </div>
  );
};

export default ProfilePosts;
