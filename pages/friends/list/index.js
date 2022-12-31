import ProfileTitle from "../../../components/Profile/ProfileTitle";
import FriendsList from "../../../components/Users/Friends/FriendsList";

const FriendsListPage = () => {
  return (
    <div className="flex items-center w-full">
      <FriendsList />
      {/* <ProfileTitle/> */}
    </div>
  );
};

export default FriendsListPage;
