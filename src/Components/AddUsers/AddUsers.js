import React, { useState } from 'react';

const AddUsers = () => {
    const [image, setImage] = useState(''); 
    const [modal, setModal] = useState(false); 
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
                setModal(true); 
            })
            console.log(modal); 
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
                                <label className='btn modal-button block w-full max-w-lg mx-auto mt-2 text-xl text-white btn-info' for="my-modal-3"><input type='submit' value='Add to Database'
                                    /></label>
                                    
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {
            modal && <div>
                <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal">
              <div class="modal-box relative">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-lg font-bold text-green-400 flex justify-center">Congratulations!</h3>
                <p class="py-4 flex justify-center text-red-400">User added to the database successfully</p>
              </div>
            </div>
            </div>
        }

    </div>
    );
};

export default AddUsers;