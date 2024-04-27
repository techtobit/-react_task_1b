import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../utils/icons/usericon.png'

const Home = () => {
    return (
        <div className='h-screen w-full flex flex-col gap-5 items-center justify-center '>
            <h1 className='text-5xl text-white'>WELCOOOOOM TO HOME</h1>
            <Link className='bg-[#a0fc04] text-[#050505] font-thin  w-[128px] h-[48px] flex gap-2 items-center justify-center  rounded rounded-full' to='admin/login' >
            <img src={userIcon} />
            <span> Login</span>
            </Link>
        </div>
    );
};

export default Home;