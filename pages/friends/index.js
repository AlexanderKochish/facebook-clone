import { collection,getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import Users from "../../components/Users/Users"
import UsersSideBar from '../../components/Users/UsersSideBar'

export const getServerSideProps = async() => {
    const usersRef = collection(db, 'users')
    const res = await getDocs(usersRef)
    const users = res.docs.map((doc)=>({...doc.data(),id:doc.id}))

    return {
        props:{
            users
        }
    }
}

const UsersPage = ({users}) => {
  return (
    <div>
      <div className="flex">
        <div>
          <UsersSideBar/>
          </div>
          <div className="flex flex-col p-5 pt-16">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold ml-2 my-5">You may know them?</h2>
              <span className='text-sky-500 text-lg'>All</span>
            </div>
            <Users users={users}/>
          </div>
      </div>
    </div>
  )
}

export default UsersPage