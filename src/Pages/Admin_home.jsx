import React, { useEffect, useState } from "react";
import Header_admin from "../Components/Header_admin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetUserdata from "../Hooks/useGetUserdata";
import { admin_details_URLS } from "../Redux/Constants";
import useUpdateToken from "../Hooks/useUpdateToken";
import { addAdmin } from "../Redux/AdminSlice";
import UserModal from "../Components/UserAddModal";
import { useUser_delete } from "../Hooks/validator";

const Admin_home = () => {
  const admin_data = useSelector((state) => state.Admin_data.admin);
  const user_data = useSelector((state) => state.Admin_data.admin_details);
  const { RefreshToken } = useUpdateToken();
  console.log(user_data,"user data");
  const navigate = useNavigate();
  const { Get_data } = useGetUserdata();
  const [admin, setadmin] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const { user_delete } = useUser_delete();
  const [search_text,setSearch_text]=useState("")
  const [filteruser,setfilteruser]=useState([])

  useEffect(() => {
    if (loading) {
      RefreshToken(setLoading, loading, admin);
    }
    const fourminuts = 1000 * 60 * 4;
    const interval = setInterval(() => {
      RefreshToken(setLoading, loading, admin);
    }, fourminuts);

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  useEffect(() => {
    Get_data(admin_details_URLS, admin);
    
    if (!admin_data) {
      navigate("/Admin");
    } else if (!admin_data.role) {
      dispatch(addAdmin());
      navigate("/Admin");
    }
  }, []);



  const handleOpenModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveUser = (user) => {
    setUsers([...users, user]);
    setModalOpen(false);
  };

  const deleteUser = (e) => {
    user_delete(e);
  };
  const handleSearch = (e) => {

    setSearch_text(e.target.value)
    const filter_data = user_data.filter((res) =>
      res.username.toLowerCase().includes(search_text.toLowerCase())
    );
    setfilteruser(filter_data);

  };
  console.log(user_data,'user data')
  return (
    <div className="h-screen w-screen">
      <div className=" flex justify-center py-6 shadow-xl">
        <Header_admin />
      </div>
      <div className="flex items-center justify-center mt-20 ">
        <div className="w-full max-w-4xl">
          <h1 className="text-center mb-4 text-2xl font-medium">User List</h1>
          <div className="flex items-center justify-end mb-6">
            <input
              type="text"
              className="border p-2 rounded-lg border-r border-gray-400 rounded-e-none"
              placeholder="Search by username"
              onChange={handleSearch}
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-s-none rounded-lg border border-blue-500">Search</button>
          </div>
          <table className="min-w-full bg-gray-200 border border-gray-800">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-800">Username</th>
                <th className="py-2 px-4 border-b border-gray-800">Email</th>
                <th className="py-2 px-4 border-b border-gray-800">
                  Phone Number
                </th>
                <th className="py-2 px-4 border-b border-gray-800">Action</th>
              </tr>
            </thead>
            <tbody>
              {user_data.length > 0 ? (search_text ? filteruser:user_data).map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-10 border-b border-gray-400">
                    {user.username}
                  </td>
                  <td className="py-2 px-10 border-b border-gray-400">
                    {user.email}
                  </td>
                  <td className="py-2 px-10 border-b border-gray-400">
                    {user.phone}
                  </td>
                  <td className="py-2 px-10 border-b border-gray-400">
                    {/* <button
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={() => editUser(user.id)}
                    >
                      Edit
                    </button> */}
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )):null}
            </tbody>
          </table>
          <div className="w-full flex justify-end mt-6">
            <button
              onClick={handleOpenModal}
              className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default Admin_home;
