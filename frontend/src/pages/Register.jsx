import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import videoMP4 from "../assets/bubbles.mp4"

// First Step Component
const StepOne = ({ formData, onNext, onChange }) => {

    const navigate = useNavigate();
    const handleRegister = async () => {

        const finalFormData = new FormData();

        const fullName = `${formData.firstName} ${formData.lastName}`;
        // Set the fullName field in the formData
        finalFormData.append('fullName', fullName);

        try {
            const response = await fetch('http://localhost:8000/v1/api/users/register', {
                method: 'POST',
                credentials: 'include',
                body: finalFormData
            });
            const result = await response.json();
            console.log(result);
            navigate("/login");
        } catch (error) {
            console.log('Error sending data to backend:');
            console.error(error);
        }
    };

    return (
        <div className='form-control w-[60%] h-[60%] text-[#323232]'>
            <div className='my-2'>
                <h2 className='text-3xl font-bold text-center'>Welcome</h2>
                <p className='text-sm font-semibold text-center'>Please enter your details</p>
            </div>
            {/* Your form fields */}
            <form onSubmit={onNext} className='mt-5'>
                <div className='flex justify-evenly'>
                    <div className="mr-1">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-[#323232]">First name</label>
                        <div className="mt-0">
                            <input type="text" name="firstName" id="first-name" autoComplete="given-name" value={formData.firstName} onChange={onChange} className="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="ml-1">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#323232]">Last name</label>
                        <div className="mt-0">
                            <input type="text" name="lastName" id="last-name" autoComplete="family-name" value={formData.lastName} onChange={onChange} className="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-[#323232]">Username</label>
                    <div className="mt-0">
                        <input id="username" name="username" type="text" autoComplete="username" value={formData.username} onChange={onChange} className="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#323232]">Email</label>
                    <div className="mt-0">
                        <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={onChange} className="block w-full rounded-md border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#323232]">Password</label>
                </div>
                <div className="mt-0">
                    <input id="password" name="password" type="password" value={formData.password} onChange={onChange} autoComplete="current-password" className="block w-full rounded-lg border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                </div>

                <div className="flex items-center justify-between">
                    <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-[#323232]">Confirm password</label>
                </div>
                <div className="mt-0">
                    <input id="confirm-password" name="confirm-password" type="password" autoComplete="current-password" className="block w-full rounded-lg border-0 py-1 text-[#323232] shadow-sm ring-1 ring-inset ring-[#BED5EB] placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                </div>

                <div className='mt-8'>
                    <button onClick={handleRegister} className="flex w-full justify-center rounded-md bg-[#666585] px-3 py-1.5 my-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#444363] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Sign Up</button>
                </div>
            </form>
            <p className="my-2 text-center text-sm font-semibold text-[#383838]">
                Already have an account? <NavLink to='/login' className="font-bold leading-6 text-indigo-600 hover:text-indigo-500 mx-1">Login</NavLink>
            </p>
        </div>
    );
};

// Register
const Register = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        // avatar: '',
        password: '',
        user: 'Teacher'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleAvatarChange = (e) => {
        // const { value, files } = e.target;
        // // If it's a file input, set the value to the file data
        // const fileValue = files ? files[0] : value;
        // setFormData({
        //     ...formData,
        //     avatar: fileValue,
        // });
        console.log("avatar");
    };

    return (
        <div className='h-screen w-full bg-[#BED5EB] text-[#323232] flex justify-center items-center shadow-lg'>
            <div className='container w-[75%] h-[90%] bg-[#FCFCFC] rounded-3xl flex'>
                <div className='h-full w-1/2 bg-gray-200 rounded-3xl'>
                    <video src={videoMP4} autoPlay loop muted className="object-cover w-full h-full rounded-3xl"></video>
                </div>
                <div className="h-full w-1/2 text-[#323232] rounded-3xl flex justify-center items-start mt-16">
                    <StepOne formData={formData} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default Register;