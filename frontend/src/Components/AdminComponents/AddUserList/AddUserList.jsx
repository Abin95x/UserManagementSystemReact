import React, { useState } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../../Redux/UserSlice/UserSlice';
import { AddUserDetails } from '../../../Api/adminApi';

const AddUserList = () => {
  const [value, setValue] = useState({
    name: null,
    mobile: null,
    email: null,
    password: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (value.name.trim() === '') {
        toast('Please enter your name');
      } else if (value.mobile.trim() === '') {
        toast('Please enter your number');
      } else if (value.email.trim() === '') {
        toast('Please enter your email');
      } else if (value.password.trim() === '') {
        toast('Please enter your password');
      } else {
        console.log(value,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        const response = await AddUserDetails(value);

        if (response.data.status) {
          const { _id, name, mobile, email, image, is_admin } = response.data.userData;
          localStorage.setItem('token', response.data.token);
          dispatch(
            setUserDetails({
              id: _id,
              name: name,
              email: email,
              mobile: mobile,
              image: image,
              is_admin: is_admin,
            })
          );
          navigate('/admin/dashboard');
        } else {
          toast(response.data.alert);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <AdminHeader />

      <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Type name"
                className="input input-bordered input-md w-full max-w-xs"
                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
              />

              <br />
              <br />

              <input
                type="text"
                name="mobile"
                placeholder="Type number"
                className="input input-bordered input-md w-full max-w-xs"
                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
              />

              <br />
              <br />

              <input
                type="email"
                name="email"
                placeholder="Type email"
                className="input input-bordered input-md w-full max-w-xs"
                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
              />

              <br />
              <br />

              <input
                type="password"
                name="password"
                placeholder="Type password"
                className="input input-bordered input-md w-full max-w-xs"
                onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
              />

              <br />
              <br />

              <button type="submit" className="btn">
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserList;
