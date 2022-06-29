import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const AddUsers = () => {
    const [image, setImage] = useState(''); 
    const [hostedImage, setHostedImage] = useState(''); 
    const handleChange = (e) =>{
        setImage(e.target.files[0]); 
    }
    
    const handleSignUp = (event) => {
        event.preventDefault(); 
        const name = event.target.name.value;  
        const email = event.target.email.value; 
        const address = event.target.address.value; 
        const info = event.target.info.value;
            const imageStorageKey = '94a65109650a1be14f24d43dd19fd874'; 
            const formData = new FormData(); 
            formData.append('image', image); 
            const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
            fetch(url, {
                method: 'POST', 
                body: formData
            })
            .then(res => res.json())
            .then(result => {
                setHostedImage(result?.data?.display_url); 
            })
            const usersInfo = { name, email, address, info, hostedImage}
            
                fetch('http://localhost:4000/users', {
                method: 'POST', 
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(usersInfo)
            })
            .then(res => res.json())
            .then(data => {
                toast.success('User is added to the database'); 
                console.log(data); 
            })
            
        }
    return (
        <div>
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row">
                <div className='w-full max-w-lg'>
                    <div class="card flex-shrink-0 w-full shadow-2xl">
                        <h1 class="text-5xl font-bold mb-2 mt-4 flex justify-center text-info lg:ml-8 lg:mr-8">Add an User!</h1>
                        <div class="card-body">
                            <form onSubmit={handleSignUp}>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text text-white">Full Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="Your Full Name" class="input input-bordered input-info w-full max-w-lg" />
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text text-white">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="Your Email" class="input input-bordered input-info w-full max-w-lg" required />
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text text-white">Your Address</span>
                                    </label>
                                    <input type="text" name='address' placeholder="Where do you live in?" class="input input-bordered input-info w-full max-w-lg" required />
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text text-white">Upload Image</span>
                                    </label>
                                    <input onChange={handleChange} type="file" class="input input-bordered input-info w-full max-w-lg" />
                                </div>



                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text text-white">About yourself</span>
                                    </label>
                                    <input type="text" placeholder="Something About Yourself" name='info' class="input input-bordered input-lg w-full input-info max-w-lg" />
                                </div>
                                <div class="form-control mt-6">
                               
                                    <input class="btn modal-button block w-full max-w-lg mx-auto mt-2 text-xl text-white btn-info" type='submit' value='Add to Database'
                                    />
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer></ToastContainer>
    </div>
    );
};

export default AddUsers;