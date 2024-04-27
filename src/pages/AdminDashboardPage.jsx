import React, { useState, useEffect } from 'react';
import MkdSDK from '../utils/MkdSDK';
import AuthProvider, { AuthContext } from '../authContext';
import userIcon from '../utils/icons/usericon.png'
import { useNavigate } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DnD/DraggableItem';
import arrowIcon from '../utils/icons/upvote.png'
import { Bars } from 'react-loader-spinner'

function AdminDashboardPage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  async function fetchData(currentPage = 1) {
    let skd = new MkdSDK();
    try {
      const payload = {
        "payload": {},
        "page": currentPage,
        "limit": 10
      };
      const method = 'PAGINATE';
      const response = await skd.callRestAPI(payload, method);
      setData(response.list || []);
      setTotalPages(response.num_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(currentPage); // Pass currentPage as the page parameter
  }, [currentPage]);

  console.log(data);

  function handelLogout() {
    dispatch({ type: 'LOGOUT', payload: {} });
    navigate('/admin/login')
    console.log('logout');
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchData(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData(currentPage - 1);
    }
  }

  const isPreviousDisabled = currentPage


  return (
    <>

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
        {isLoading && (
          <div className="loading-container flex items-center justify-center">
            <Bars
              height="80"
              width="80"
              color="#a0fc04~"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true} />
          </div>
        )}
        <DndProvider backend={HTML5Backend}>
          <ul className='py-5'>
            {
              data.map((item, index) => (
                <DraggableItem key={item.id} item={item} index={index} moveItem={(fromIndex, toIndex) => {
                  const newData = [...data];
                  const itemToMove = newData[fromIndex];
                  newData.splice(fromIndex, 1);
                  newData.splice(toIndex, 0, itemToMove);
                  setData(newData);
                }} />
              ))}
          </ul>
        </DndProvider>
        <section className='pagination py-10 flex justify-center gap-10 items-center'>
          <button className=' bg-[#1D1D1D] border-[0.01px] border-[#a0fc04]  p-4 rounded-md' onClick={handlePreviousPage}>
            <img className='rotate-[-90deg]' src={arrowIcon} />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className=' bg-[#1D1D1D] border-[0.01px] border-[#a0fc04]  p-4 rounded-md' onClick={handleNextPage}>
            <img className='rotate-[90deg]' src={arrowIcon} />
          </button>
        </section>
      </div>

    </>
  );
}

export default AdminDashboardPage;
