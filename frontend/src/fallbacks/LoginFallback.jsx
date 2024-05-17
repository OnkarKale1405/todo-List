import React from 'react'

const LoginFallback = () => {
    return (
        <div className='h-screen w-full bg-[#BED5EB] text-[#323232] flex justify-center items-center shadow-lg'>
            <div className='container w-[75%] h-[90%] bg-[#FCFCFC] rounded-3xl flex'>
                <div className="h-full w-1/2 text-[#323232] rounded-3xl flex justify-center items-center"></div>
                <div className='h-full w-1/2 bg-gray-200 rounded-3xl'></div>
            </div>
        </div>
    )
}

export default LoginFallback
