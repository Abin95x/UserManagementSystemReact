import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { UserListDetails,DeleteUser } from '../../../Api/adminApi'
import AdminHeader from '../AdminHeader/AdminHeader';

const UserList = () => {

    const [user,setUser] = useState([])
    const [search,setSearch] = useState("")
    const navigate = useNavigate();


    useEffect(()=>{
        UserListDetails().then((response)=>{
            const userData = response.data.userData
            setUser(userData)
        }).catch((err)=>console.log(err))
    },[])

    const handleDelete =  async (userId) => {
        try{
            await DeleteUser(userId).then(() => {
              setUser(user.filter((user) => user._id !== userId));
            })
            .catch((err) => console.log(err));

        }catch(error){
            console.log(error.message);
        }
    }

    const handleSearch = (e) =>{
         setSearch(e.target.value)
         console.log(search)
    }

    const userData = user.filter((user) => {
        const searchInputLower = search.toLowerCase();
        const emailMatch = user.email.toLowerCase().includes(searchInputLower);
        const nameMatch = user.name.toLowerCase().includes(searchInputLower);
        const mobMatch = user.mobile.toString().includes(searchInputLower);
    
        return emailMatch || nameMatch || mobMatch;
      });
    


  return (
<div>
  <AdminHeader />
  <input
    onChange={handleSearch}
    type="text"
    placeholder="search user"
    className="input input-bordered input-sm w-full max-w-xs"
  />
  <br />
  <br />
  <div style={{ width: '100%', height: '100%' }}>
    <table className="w-full border-collapse" style={{ backgroundColor: 'gray' }}>
      <thead className="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">No</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Number</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
          <th className="p-3 text-sm font-semibold tracking-wide text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {userData.length > 0 ? (
          userData.map((values, index) => {
            return (
              <tr key={values._id} className="bg-gray-100 border-b border-gray-200">
                <td className="p-3 text-sm text-gray-800 text-left">{index + 1}</td>
                <td className="p-3 text-sm text-gray-800 text-left">{values.name}</td>
                <td className="p-3 text-sm text-gray-800 text-left">{values.mobile}</td>
                <td className="p-3 text-sm text-gray-800 text-left">{values.email}</td>
                <td className="p-3 text-sm text-gray-800 text-center space-x-2">
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() => navigate(`/admin/edituser/${values._id}`)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-outline btn-error" onClick={() => handleDelete(values._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>No Users</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default UserList