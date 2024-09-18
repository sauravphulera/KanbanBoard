import React, { useEffect, useState } from 'react'
import './TaskBlock.module.css'
import KanbanCard from '../KanbanCard/KanbanCard'

export const TaskBlock = ({tickets, heading, order}) => {

  const [currenttickets, setTickets] = useState([...tickets]);

  useEffect(() => {
    console.log(order)
    if(order === 'priority') {
      tickets = tickets.sort((a,b) => b.priority - a.priority);
      setTickets([...tickets])
    } else {
      tickets = tickets.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      setTickets([...tickets])
    }
  }, [order])
  return (
    <div className='w-20 p'>
        <h1 className='flex justify-btw align-center'>
          <div className='flex align-center'>
            {/* <object
              type="image/png"
              data={"./icons_FEtask/"+heading+'.svg'}
              aria-label="This image should exist, but alas it does not"
            >
              <img src="/path/to/3 dot menu.svg" alt="Fallback image" />
            </object> */}
            <img
              src={"./icons_FEtask/"+heading+'.svg'}
              alt="This image should exist, but alas it does not"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="./icons_FEtask/3 dot menu.svg";
              }}
            />
            &nbsp;
            {heading} &nbsp; <div className='gray-font'>{tickets.length}</div>
          </div>
          <div>
              <img src='./icons_FEtask/add.svg' />
                &nbsp;
              <img src='./icons_FEtask/3 dot menu.svg'/>
          </div>
        </h1>
        <div className='mt-2'>
            {
              currenttickets.map((ticket) => {
                return <KanbanCard ticket={ticket} key={ticket.id}/>
              })
            }
        </div>
    </div>
  )
}
