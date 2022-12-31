import ProfileSideBar from "../../../components/Profile/ProfileSideBar";
import ProfilePosts from "../../../components/Profile/ProfilePosts";
import { db } from "../../../firebase";
import ProfileTitle from "../../../components/Profile/ProfileTitle";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getServerSideProps = async (context) => {
  const { profileUid } = context.query;

  const [profile, posts] = await Promise.all([
    getDoc(doc(db, "users", profileUid)).then((res) => res.data()),
    getDocs(collection(db, "users", profileUid, "posts"))
      .then((doc) =>
        JSON.stringify(doc.docs.map((d) => ({ ...d.data(), id: d.id })))
      )
      .catch((err) => console.log(err.message)),
  ]);
  return {
    props: {
      posts,
      profile,
    },
  };
};

const Profile = ({ posts, profile }) => {
  return (
    <div className="flex flex-col w-full">
      <ProfileTitle profile={profile} />
      <div className="w-[1100px] mx-auto flex min-h-screen">
        <ProfileSideBar profile={profile} />
        <ProfilePosts posts={JSON.parse(posts)} profile={profile} />
      </div>
    </div>
  );
};

export default Profile;
