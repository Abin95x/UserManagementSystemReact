import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Header from '../../../Components/Header/Header'

import { userImage } from '../../../Api/userApi';
import { setUserDetails } from '../../../Redux/UserSlice/UserSlice';



const Profile = () => {

    const [photo,setPhoto] = useState(null)
    const dispatch = useDispatch()
    const { id, name, email, mobile, image } = useSelector((state) => state.user);
    
    const handleUpdateImage = async () =>{
        try{
            const response = await userImage(id,photo)
            if (response.data.updated) {
                const { _id, name, email, image, mobile, is_admin } = response.data.data;
                dispatch(
                  setUserDetails({
                    id: _id,
                    name: name,
                    mobile: mobile,
                    email: email,
                    image: image,
                    is_admin: is_admin,
                  })
                );
              }
        }catch(error){
            console.log(error.message);
        }
    }
    const cardImageStyle = {
        maxWidth: "100%",
        maxHeight: "200px",
        objectFit: "cover",
      };
      
      return (
        
        <div>
          <Header/>
        <div className="bg-black rounded-lg shadow-md p-6">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src={
                image
                  ? `/images/${image}`
                  : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
              }
              alt="card-image"
              style={cardImageStyle}
            />
            <div>
              <h1 className="text-5xl font-bold">Name: {name}</h1>
              <h3 className="text-2xl font-bold">Email: {email}</h3>
              <h3 className="text-2xl font-bold">Mobile: {mobile}</h3>
      
              <div className="pt-0 flex flex-col gap-5">
                <br />
      
                <input
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  type="file"
                  className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                />
                <br />
              </div>
              {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
              <button onClick={handleUpdateImage} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

        </div>

      
      )
       
      
      
      
}

export default Profile