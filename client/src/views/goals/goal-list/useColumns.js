import { useEffect, useState } from 'react';
import { Edit2, Plus, Trash } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Badge, Button, Progress } from 'reactstrap';
import { setGoalsReducer } from '../store/reducer';


const useColumns = ({ toggleHabitDetails },
  { handleOpenAddSubHabit },
  { handleOpenEdit },
  { handleOpenDelete }, { handleAccomplishClicked }, { toggleRecordProgress }) => {
  // ** STATES

  const [hoveredRow, setHoveredRow] = useState(null);

  // ** TOGGLERS
  const handleShowButtons = (rowId) => {
    setHoveredRow(rowId);
  };
  const handleNoButtons = () => {
    setHoveredRow('');
  };

  const checker = (goal) => {
    if (goal.progressType === "CompletedTasks" || goal.progressType === "SubGoals") {
      return (false)
    }
    if (goal.progressType === "AllTasks" || goal.progressType === "CurrentProgress") {
      return (true)
    }
    return(null)
  }

  // ** FUNCTIONS
  const convertDate = (date) => {
    const d = new Date(date);
    return (
      <span>
        {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
      </span>
    );
  };


  const columns = [
    {
      name: 'GOAL',
      sortable: true,
      width: '20%',
      sortField: 'name',
      selector: (row) => row.name,
      cell: (row) => (
        <div className="w-100" style={{ cursor: "pointer" }} >
          <div
            className="d-flex  justify-content-between"
            onMouseEnter={() => handleShowButtons(row._id)}
            onMouseLeave={handleNoButtons}
          >
            <div className="d-flex align-items-center">
              <span className="fw-bolder d-block">{row.name}</span>
              <small className="text-truncate text-muted mb-0">{row.target}</small>
            </div>

            <div
              className={` ${hoveredRow === row._id ? '' : 'd-none'
                }`}
            >
              {/* <Button color="link" className="px-0" onClick={(e)=>{e.stopPropagation(); handleOpenAddSubHabit(row,'sub')}}>
                <Badge color="primary">
                  <Plus size={14} />
                </Badge>
              </Button> */}

              <Button color="link" className="px-0" onClick={(e) => { e.stopPropagation(); handleOpenDelete(row) }}>
                <Badge color="danger">
                  <Trash size={14} />
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'START ',
      sortable: true,
      width: '18%',
      sortField: 'startDate',
      selector: (row) => row.startDate,
      cell: (row) => <span>{convertDate(row.startDate)}</span>
    },
    {
      name: 'PROGRESS',
      width: '27%',
      sortable: true,
      sortField: 'progress',
      selector: (row) => row.progress,
      cell: (row) => (
        <div className='w-100'>
          {row.progressType === "CurrentProgress" ?
            <>
              <span className='text-center d-block'>{row?.currentProgress+"/"+row?.measureTo+" "+row?.measureLabel}</span>
              <Progress className="w-100" value={parseInt(row.currentProgress, 10)} max={row.measureTo} />
            </>
            :
            <>
              <span className='text-center d-block'>{row.status === 'Complete' ? 100 : 0} %</span>
              <Progress className="w-100" value={row.status === 'Complete' ? 100 : 0} max={100} />
            </>
          }
        </div>
      )
    },
    {
      name: 'ACCOMPLISH',
      width: '24%',
      // center: true,
      selector: (row) => row.status,
      cell: (row) =>
        row && checker(row) ? (

          <Button color="warning" disabled={parseInt(row?.currentProgress)>=parseInt(row?.measureTo)} size="sm" onClick={() => toggleRecordProgress(row)}>
            <span className="text-small" style={{ fontSize: '11px' }}>
              {parseInt(row?.currentProgress)>=parseInt(row?.measureTo)?"Completed":"Record"}
            </span>
          </Button>
        ) : (
          <Button disabled={row?.status === "Complete"} color="primary" size="sm" onClick={() => toggleRecordProgress(row)}>
            <span style={{ fontSize: '11px' }}>{row?.status === "Complete"?"Completed":"Complete"}</span>
          </Button>
        )
    }
  ];
  return {
    columns
  };
};
export default useColumns;
