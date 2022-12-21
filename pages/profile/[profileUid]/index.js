import ProfileSideBar from "../../../components/Profile/ProfileSideBar"
import ProfilePosts from "../../../components/Profile/ProfilePosts"
import { db } from "../../../firebase"
import ProfileTitle from "../../../components/Profile/ProfileTitle"
import Layout from "../../../components/Layout"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

export const getServerSideProps = async({query}) => {
    const { profileUid } = query
       
    const posts = await getDocs(collection(db,'users', profileUid, 'posts'))
        .then((doc)=>JSON.stringify(doc.docs.map((d)=>({...d.data(),id:d.id}))))
        .catch((err)=>console.log(err.message))
   
    
    return {
        props:{
            posts
        }
    }
}


const Profile = ({posts}) => {
    
    return(
        <>
        <div className="w-[1100px] mx-auto flex min-h-screen"> 
            <ProfileSideBar/>
            <ProfilePosts posts={JSON.parse(posts)}/>
        </div>
        </>
    )
}

export default Profile

Profile.getLayout = function PageLayout (page) {

    return (
        <Layout>
        <div className="flex flex-col w-full min-h-screen">
            <ProfileTitle/>
            <div>
                {page}
            </div>
        </div>
        </Layout>
    )
}    
