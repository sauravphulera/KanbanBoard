import React, { useEffect, useRef,useState } from 'react';
import { TaskBlock } from '../TaskBlock/TaskBlock';
import './KanbanBoard.css';

import { createMapFromObject } from '../Utility/commonUtility';

const MAPS = {
    STATUS: {
        Todo: 'Todo',
        'In progress': 'In Progress',
        Backlog: 'Backlog',
        Done: 'Done',
        Cancelled: 'Cancelled'
    },
    PRIORITY:  {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No priority'
    },
    USERID: {

    }
}





export const KanbanBoard = ({ tickets, users }) => {

    const [group, setGroup] = useState({});
    const popupRef = useRef(null);
    const DisplayBtnRef = useRef(null);
    const [isOpenDisplay, setIsOpenDisplay] = useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState('status'); 
    const [selectedOrdering, setSelectedOrdering] = useState('priority'); 

    useEffect(() => {
        MAPS.USERID = createMapFromObject(users);
        const grouping = localStorage.getItem('grouping');
        const ordering = localStorage.getItem('ordering');
        if(grouping) setSelectedGrouping(grouping);
        if(ordering) setSelectedOrdering(ordering);
    }, [])


    useEffect(() => {
        const result = groupTickets(tickets, selectedGrouping);
        if(selectedGrouping !== 'userId') {
           let obj =  Object.keys(MAPS[selectedGrouping.toLocaleUpperCase()]) || [];
           // make sure all headings are ther in case data is not present
           for(let el of obj) {
                if(!result[el]) {
                    result[el] = []
                }
           }
        }
        setGroup({...result});
    }, [selectedGrouping])

    useEffect(() => {
        function handleClickOutside(event) {
          // Check if the click is outside the popup window and the button
          if (popupRef.current && !popupRef.current.contains(event.target) && DisplayBtnRef.current && !DisplayBtnRef.current.contains(event.target)) {
            setIsOpenDisplay(false); // Close the popup if clicked outside
          }
        }
    
        // Add the event listener to detect clicks outside
        if (isOpenDisplay) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        // Cleanup the event listener when the component unmounts or when `isOpen` changes
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpenDisplay]);


    // Group tickets by status, user, or priority
    const groupTickets = (tickets, grouping) => {
        
        return tickets.reduce((groups, ticket) => {
            let key;
            if (grouping === "status") {
                key = ticket.status;
            } else if (grouping === "userId") {
                key = ticket.userId || "Unassigned";
            } else if (grouping === "priority") {
                key = ticket.priority;
            }
        
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(ticket);
            return groups;
        }, {});
    };

    const toggleDisplayBtn = () => {
        setIsOpenDisplay(!isOpenDisplay);
    };


    // Handle the change in select
    const handleSelectChange = (event) => {
        setSelectedGrouping(event.target.value); // Update state with selected value
        localStorage.setItem('grouping', event.target.value);
    };

    // handle change in ordering
    const handleSelectOrderingChange = (event) => {
        setSelectedOrdering(event.target.value);
        localStorage.setItem('ordering', event.target.value);
    }

  return (
    <div>
        <div className='py px-2 display-btn-container'>
           <div className='flex align-center justify-btw display-btn' onClick={toggleDisplayBtn} ref={DisplayBtnRef}>
                <img src='./icons_FEtask/Display.svg' />
                <div>Display</div>
                <img src='./icons_FEtask/down.svg' />
           </div>
           {isOpenDisplay && (
                <div className="popup-filter" ref={popupRef}>
                    <div className='flex align-center justify-btw'>
                        Grouping  
                            {/* Select dropdown */}
                            <select value={selectedGrouping} onChange={handleSelectChange}>
                                <option value="userId">User</option>
                                <option value="status">Status</option>
                                <option value="priority">Priority</option>
                            </select>
                    </div>
                    <div className='flex align-center justify-btw mt'>
                        Ordering 
                            {/* Select dropdown */}
                            <select value={selectedOrdering} onChange={handleSelectOrderingChange}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                    </div>
                    <div></div>
                </div>
            )}
        </div>
        <div className='flex py px-2'>
            {
                [...Object.keys(group)].map((status) => {

                    
                    return <TaskBlock key={status} tickets = {group[status]} heading={MAPS[selectedGrouping.toLocaleUpperCase()][status]} order={selectedOrdering} />
                })
            }
        </div>
    </div>
  )
}

{/* <div className="App">
<h1>Kanban Board</h1>
<div className="kanban-board">
  {tickets.map((ticket) => (
    <KanbanCard key={ticket.id} ticket={ticket} />
  ))}
</div>
</div> */}