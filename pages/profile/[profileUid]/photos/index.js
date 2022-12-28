import { doc, getDoc } from 'firebase/firestore'
import Layout from '../../../../components/Layout'
import ProfileGallery from '../../../../components/Profile/ProfileGallery'
import ProfileTitle from '../../../../components/Profile/ProfileTitle'
import { db } from '../../../../firebase'

export const getServerSideProps = async(context) => {
    const { profileUid } = context.query
    
    const[profile]= await Promise.all([
    getDoc(doc(db,'users', profileUid))
    .then((res)=>res.data()), 
])
    return {
        props:{
            profile
        }
    }
}

const Gallery = ({profile}) => {
   
  return (
    <div className='w-full min-h-screen flex flex-col'>
        <ProfileTitle profile={profile}/>
        <div className='w-[1000px] h-full bg-white rounded-md mx-auto mt-5'>
           <ProfileGallery profile={profile}/>
        </div>
    </div>
  )
}

export default Gallery

// Gallery.getLayout = function PageLayout(page){
//     return (
//         <Layout>
//             <div className='flex flex-col w-full min-h-screen'>
            
//                 <div>
//                     {page}
//                 </div>
//             </div>
//         </Layout>
//     )
// }
    
