import Layout from '../../../../components/Layout'
import ProfileGallery from '../../../../components/Profile/ProfileGallery'
import ProfileTitle from '../../../../components/Profile/ProfileTitle'

const Gallery = () => {
   
  return (
    <div className='w-full min-h-screen flex flex-col'>
        <div className='w-[1000px] h-full bg-white rounded-md mx-auto mt-5'>
           <ProfileGallery/>
        </div>
    </div>
  )
}

export default Gallery

Gallery.getLayout = function PageLayout(page){
    return (
        <Layout>
            <div className='flex flex-col w-full min-h-screen'>
            <ProfileTitle/>
                <div>
                    {page}
                </div>
            </div>
        </Layout>
    )
}
    
