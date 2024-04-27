import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import upVoteIcon from '../../utils/icons/upvote.png';

const DraggableItem = ({ item, index, moveItem }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM',
        item: { id: item.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'ITEM',
        hover(itemToMove, monitor) {
            const fromIndex = itemToMove.index;
            const toIndex = index;

            if (fromIndex === toIndex) {
                return;
            }

            moveItem(fromIndex, toIndex);
            itemToMove.index = toIndex;
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className='flex px-5 justify-between items-center font-thin h-[96px] gap-5 mb-5 border-[1px] rounded-[25px] border-slate-400'
        >
            <div className='flex items-center justify-between gap-5'>
                <div className='px-5'>{item.id}</div>
                <img className='w-[118px] h-[64px] rounded-md' src={item.photo} />
                <div className='w-[364px] h-[56px] text-[20px] gap-5 leading-[28px]'>{item.title}</div>
            </div>

                <div>{item.username}</div>
            <div className=' flex items-center gap-2  text-[16px]'>{item.like}
                <img src={upVoteIcon} />
            </div>
        </div>
    );
};


export default DraggableItem;