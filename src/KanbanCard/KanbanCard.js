import './KanbanCard.css'
// KanbanCard component for rendering a single ticket
const KanbanCard = ({ ticket }) => {
    return (
      <div className="kanban-card mt">
        <div className='flex justify-btw'>
            <div className='card-id-font gray-font'>{ticket.id}</div>
            <div className='user-icon flex justify-center align-center'>
              <div>{ticket.userId[0]}</div>
            </div>
        </div>
        <div className='kanban-card-title'>{ticket.title}</div>
        <div className='flex mt align-center'>
          <div className='wrap-content'>
            <img src='./icons_FEtask/3 dot menu.svg' className='icon-width'/>
          </div>
          
          &nbsp;
          <div className='flex align-center wrap-content'>
             <div className='dot'></div>
             &nbsp;
             <div className='gray-font'>{ticket.tag[0]}</div>
          </div>
        </div>
      </div>
    );
  };

  export default KanbanCard;