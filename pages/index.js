import { collection, doc, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import HomeContactFriendsList from "../components/Home/HomeContactFriendsList";
import HomePosts from "../components/Home/HomePosts";
import HomeSideBar from "../components/Home/HomeSideBar";
import ContactHomeFriendsListModal from "../components/Modal/ContactHomeFriendsListModal";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";


export default function Home() {
  const[user,setUser] = useState([])
  const[posts,setPosts] = useState([])
  const[openContactModal,setContactModal] = useState(false)
  const{ currentUser } = useContext(AuthContext)

  useEffect(() => {
    if(!currentUser) return;
    async function getUserUid() {
        const res1 = await getDocs(collection(db,'users',currentUser?.uid,'friends'))
        setUser(res1.docs.map((doc)=>({...doc.data(),id:doc.id})))
        const res = await getDocs(collection(db,'users',currentUser?.uid,'friends'))
        const data = res.docs.map((doc)=>({...doc.data(),id:doc.id}))
        const friendId = data.map(({user})=>user.id)

          const posts = friendId.map(async(uid)=>await getDocs(collection(db,'users',uid,'posts')))
          const allPost = posts.map((doc)=>doc.then((doc)=>doc.docs.map((doc)=>({...doc.data(),id:doc.id}))))
          const post = await Promise.all([...allPost.map((doc)=>doc.then((response)=>response))])
          const allFriendsPosts = [].concat(...post)

          setPosts(allFriendsPosts);  
    }

    getUserUid()
    return () => {
      
    }
  }, [currentUser?.uid])

  return (
    <div className="container mx-auto">
    <div className="flex items-center justify-center h-full w-full">
        <HomeSideBar/>
        <HomePosts posts={posts} user={user}/>
        <HomeContactFriendsList setContactModal={setContactModal} openContactModal={openContactModal}/>
        {openContactModal && <ContactHomeFriendsListModal setContactModal={setContactModal} openContactModal={openContactModal}/>}
    </div>
   </div>
  )
}
