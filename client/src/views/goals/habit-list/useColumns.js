import { useState } from 'react';
import { Edit2, Plus, Trash } from 'react-feather';
import { Badge, Button, Progress } from 'reactstrap';
import { convertDate } from '../helpers/converters';
import { renderStatus, renderProgress } from '../helpers/renderProgressData';

const useColumns = (
  { toggleHabitDetails },
  { handleOpenAddSubHabit },
  { handleOpenEdit },
  { handleOpenDelete }
) => {
  // ** STATES
  const [hoveredRow, setHoveredRow] = useState(null);
  // ** TOGGLERS
  const handleShowButtons = (rowId) => {
    setHoveredRow(rowId);
  };
  const handleNoButtons = () => {
    setHoveredRow('');
  };
  // ** FUNCTIONS
  const columns = [
    {
      name: 'GOAL NAME',
      sortable: true,
      width: '18%',
      sortField: 'name',
      selector: (row) => row.name,
      cell: (row) => (
        <div
          className="w-100"
          style={{ cursor: 'pointer' }}
          onClick={() => toggleHabitDetails(row)}
        >
          <div
            className="d-flex  justify-content-between"
            onMouseEnter={() => handleShowButtons(row._id)}
            onMouseLeave={handleNoButtons}
          >
            <div className="d-flex align-items-center">
              <span className="fw-bolder ">{row.name}</span>
              <small className="text-truncate text-muted mb-0">{row.target}</small>
            </div>
            <div
              className={`  ${hoveredRow === row._id ? '' : 'd-none'
                }`}
            >
              {row?.type === 'target' &&
                row?.progressType != "CurrentProgress" &&
                <Button
                  color="link"
                  className="px-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAddSubHabit(row, 'sub');
                  }}
                >
                  <Badge color="primary">
                    <Plus size={14} />
                  </Badge>
                </Button>}
              <Button
                color="link"
                className="px-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDelete(row);
                }}
              >
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
      name: 'TYPE',
      maxWidth: '12%',
      selector: (row) => row.type,
      cell: (row) => <div style={{ padding: '6px' }} className="d-flex justify-content-center align-items-center text-center rounded bg-light-warning"><span className="text-center fw-bolder">{row.type.toUpperCase()}</span></div>
    },
    {
      name: 'Sub Goals',
      maxWidth: '15%',
      selector: (row) => row.subGoals,
      cell: (row) => <span >{(row.type!="habit"&&row.progressType!="CurrentProgress")&&(row?.status||0)+" goals"} </span>
    },
    {
      name: 'START ',
      sortable: true,
      width: '12%',
      sortField: 'startDate',
      selector: (row) => row.startDate,
      cell: (row) => <span>{row?.type === "target" ? convertDate(row.startDate) : convertDate(row.createdAt)}</span>
    },
    // {
    //   name: 'END ',
    //   sortable: true,
    //   minWidth: '110px',
    //   sortField: 'endDate',
    //   selector: (row) => row.endDate,
    //   cell: (row) => <span>{convertDate(row.endDate)}</span>
    // },
    {
      name: 'Progress',
      width: '25%',
      sortable: true,

      sortField: 'progress',
      selector: (row) => row.progress,
      cell: (row) => (
        // <div style={{backgroundColor:"#d8d8e5",height:'20px'}} className="position-relative w-100 ">
        //   <div className={`position-absolute top-50 translate-middle-y start-0 ${renderStatus(row)==="Completed"?"bg-success":"bg-warning"}`} style={{ width: renderProgress(row), height: "20px"}}>
        //   </div>
        // </div>
        <div className="w-100">
          {row.type === "target" && row.progressType === "CurrentProgress" &&
            <>
              <span className='text-center d-block'>{row?.currentProgress + "/" + row?.measureTo + " " + row?.measureLabel}</span>
              <Progress className="w-100" value={parseInt(row.currentProgress, 10)} max={row.measureTo} />
            </>
          }
          {
            row.type === 'habit' &&
            <>
              <span className='text-center d-block'>{renderProgress(row, "toStr")}%</span>
              <Progress className="w-100" value={renderProgress(row, "toNum")} max={100} />
            </>
          }
        </div>
      )
    },
    {
      name: 'Status',
      width: '15%',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.status,
      cell: (row) => (
        // <div className='w-100'>
        //   <span className='d-block text-center'> {row?.type === "target" ? row?.measureTo : row?.repetition
        //   } days</span>
        //   <Progress className="w-100" value={row?.type === "target" ?row.currentProgress:row?.actionPlans.length} max={row?.type === "target" ?row.measureTo:row.repetition}>
        //     {row.currentProgress} days
        //   </Progress>
        // </div>

        <div className={`d-flex justify-content-center align-items-center ${renderStatus(row) === "Completed" ? "bg-success" : "bg-warning"} `} style={{ height: "40px", width: " 100%" }}>
          <span className="fw-bolder text-white p-1">{renderStatus(row) || "Pending"}</span></div>


      )
    },
    // {
    //   name: 'STATUS',
    //   width: '10%',
    //   // center: true,
    //   selector: (row) => row.tags,
    //   cell: (row) =>
    //     row?.tags &&
    //     row?.tags?.map((x, i) => (
    //       <Badge key={i + 1} pill color="light-primary">
    //         {x}
    //       </Badge>
    //     ))
    // },
    // {
    //   name: 'RECORD',
    //   width: '14%',
    //   // center: true,
    //   selector: (row) => row.progress,
    //   cell: (row) =>
    //     <Button color="primary" size="sm" onClick={() => toggleHabitDetails(row)}>
    //       <span className="text-small" style={{ fontSize: '11px' }}>
    //         RECORD
    //       </span>
    //     </Button>
    // }
  ];
  return {
    columns
  };
};
export default useColumns;
