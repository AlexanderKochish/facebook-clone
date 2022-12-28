import ProfileSideBar from "../../../components/Profile/ProfileSideBar"
import ProfilePosts from "../../../components/Profile/ProfilePosts"
import { db } from "../../../firebase"
import ProfileTitle from "../../../components/Profile/ProfileTitle"
import Layout from "../../../components/Layout"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useEffect } from "react"
import { data } from "autoprefixer"

export const getServerSideProps = async(context) => {
    const { profileUid } = context.query
    
       const[profile,posts]= await Promise.all([
        getDoc(doc(db,'users', profileUid))
        .then((res)=>res.data()),
        getDocs(collection(db,'users', profileUid, 'posts'))
        .then((doc)=>JSON.stringify(doc.docs.map((d)=>({...d.data(),id:d.id}))))
        .catch((err)=>console.log(err.message))
   
])
    return {
        props:{
            posts,
            profile
        }
    }
}


const Profile = ({posts,profile}) => {
   console.log(profile);
    // useEffect(()=>{
    //     const getUsr = async()=>{
    //     const res = await getDoc(doc(db,'users', 'pojR6RN9jZTGMEso2rQX6dvsAPY2'))
    //     const data = res.data()
    //     console.log(data);
    //     return data
    // }
    // getUsr()
    
    // },[])

   return(
        <div className="flex flex-col w-full">
         <ProfileTitle profile={profile}/>
        <div className="w-[1100px] mx-auto flex min-h-screen"> 
            <ProfileSideBar profile={profile}/>
            <ProfilePosts posts={JSON.parse(posts)} profile={profile}/>
        </div>
        </div>
    )
}

export default Profile

// Profile.getLayout = function PageLayout (page) {

//     return (
//         <Layout>
//         <div className="flex flex-col w-full min-h-screen">
           
//             <div>
//                 {page}
//             </div>
//         </div>
//         </Layout>
//     )
// }    
