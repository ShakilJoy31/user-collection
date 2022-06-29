import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const DeleteUsers = () => {
    const [users, setUsers] = useState([]); 
    useEffect(()=>{
        fetch('http://localhost:4000/getuser')
    .then(res => res.json())
    .then(data => {
        setUsers(data); 
        console.log(data); 
    })
    },[])
    const handleDeleteUser = (id) =>{
        fetch(`http://localhost:4000/deleteUser/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            const restUser = users.filter(deletedUser => deletedUser._id !== id); 
            setUsers(restUser); 
            toast.error('User is deleted successfully'); 
        })
        
    }
    return (
        <div className='lg:mx-8 mx-4 mt-6'>
            <div class="overflow-x-auto w-full">
                <table class="table w-full">
                    <thead>
                        <tr>
                            
                            <th>User Name</th>
                            <th>Email</th>
                            <th>About User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        users.map(singleUser => <tbody>
                        
                            <tr>
                                
                                <td>
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-12 h-12">
                                                <img src={singleUser.hostedImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">{singleUser.name}</div>
                                            <div class="text-sm opacity-50">{singleUser.address}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{singleUser.email}</td>
                                <td>{singleUser.info}</td>
                                <th>
                                    <button onClick={()=>handleDeleteUser(singleUser._id)} class="btn btn-error btn-xs">Remove</button>
                                </th>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default DeleteUsers;