import React, { useState, useEffect } from 'react';
import MkdSDK from '../utils/MkdSDK';
import AuthProvider, { AuthContext } from '../authContext';
import userIcon from '../utils/icons/usericon.png'

function AdminDashboardPage() {
  const [data, setData] = useState([]);
  const { dispatch } = React.useContext(AuthContext);

  async function fetchData() {
    let skd = new MkdSDK();
    try {
      const payload = {
        "payload": {},
        "page": 1,
        "limit": 10
      };
      const method = 'PAGINATE';
      const response = await skd.callRestAPI(payload, method);
      setData(response.list || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  function handelLogout(){
    dispatch({type:'LOGOUT', payload:{}});
    console.log('logout');
  }


  return (
    <div className='px-20  h-screen text-white'>
      <section className='Header flex justify-between items-center'>
        <h2 className='text-4xl font-black text-white '>APP</h2>
        <button onClick={handelLogout} className='bg-[#a0fc04] text-[#050505] font-thin  w-[128px] h-[48px] flex gap-2 items-center justify-center  rounded rounded-full'>
          <img src={userIcon} />
          <span> Logout</span>
        </button>
      </section>
      <section className='Header flex justify-between pt-20'>
        <h2 className='text-4xl font-thin text-white'>Today’s leaderboard</h2>
        <div className='w-[418px] h-[56px] flex bg-[#1D1D1D] items-center justify-between px-5 rounded-[15px]'>
          <p className='font-thin '>30 May 2022</p>
          <button className='bg-[#a0fc04] text-[#050505] font-thin h-[25px] px-4 uppercase rounded rounded-full'>Submissions OPEN</button>
          <p className='font-thin '>11:34</p>
        </div>
      </section>

      <ul className='py-5'>
        {data.map((item, index) => (
          <div className='flex items-center h-[96px] gap-5 mb-5 border-[1px] rounded-[25px] border-slate-400'>
            <li key={index} className='pl-8 pr-5'>{item.id}</li>
            <img key={index} className=' w-[118px] h-[64px] rounded-md' src={item.photo} />
            <li key={index} className=' w-[364px] h-[56px]  text-[20px] font-thin lading-[28px]'>{item.title}</li>
            <li key={index}>{item.username}</li>
            <li key={index} className=''>{item.like}</li>
          </div>
        ))}
      </ul>
    </div>

  );
}

export default AdminDashboardPage;
