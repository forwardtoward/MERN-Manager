// ** React Imports
import React, { Fragment, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Edit2, Trash2, User } from 'react-feather';
import Avatar from '@components/avatar';
import { progressionFetchAction } from '../../../settings/tabs/progressiontab/store/actions';
import { promotClientAction, progressionListAction, promotedListAction } from '../../store/actions';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Form, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as api from '../../store/api';

const RankTable = (props) => {
  const dispatch = useDispatch();
  const clientStore = useSelector((state) => state.clientContact);

  const [clientProgressionData, setClientProgressionData] = useState([]);

  const progressionList = useSelector((state) => state.progression?.progressionList);
  const progressionListSecond = useSelector(
    (state) => state.totalContacts.progressionListClientData
  );

  // console.log('progressionList', progressionList);
  // console.log('progressionListSecond', progressionListSecond);

  const [clientProgressionsIds, setClientProgress] = useState([]);
  const [clientValue, setVClientValue] = useState('');
  const [clientProgressionsMainId, setClientProgressionsMainId] = useState({
    clientProgressions: []
  });
  const [clientId, setClientId] = useState([]);
  // let clientProgressionsMainId = {
  //   "clientProgressions" : []
  // }
  let categoriesArray = [];
  for (let i = 0; i < progressionList?.length; i++) {
    for (let j = 0; j < progressionList[i]?.categoryId.length; j++) {
      categoriesArray.push({
        name: progressionList[i]?.progressionName,
        progressionId: progressionList[i]?._id,
        list: progressionList[i]?.categoryId[j],
        categoryId: progressionList[i]?.categoryId[j]?._id
      });
    }
  }
  const [enablePromote, setEnablePromote] = useState(false);
  const handleRowSelected = ({ selectedRows }) => {
    setClientProgressionsMainId({
      clientProgressions: selectedRows.map((x) => {
        return {
          clientId: x.clientId,
          _id: x._id
        };
      })
    });

    selectedRows.length > 0 ? setEnablePromote(true) : setEnablePromote(false);
  };

  const changeProgression = (e) => {
    let progressionIdOne = e.target.value.split(',')[0];
    setVClientValue(e.target.value);
    if (clientValue !== '') {
      let value = JSON.parse(clientValue);

      if (clientProgressionsMainId?.clientProgressions?.length > 0) {
        setClientProgressionsMainId({
          clientProgressions: [
            ...clientProgressionsMainId.clientProgressions.map((item, i) => {
              if (item._id == JSON.parse(e.target.value).id) {
                return {
                  progressionId: JSON.parse(e.target.value).progressionId,
                  categoryId: JSON.parse(e.target.value).categoryId,
                  ...item
                };
              } else {
                return item;
              }
              // setVClientValue('')
            })
          ]
        });
      }
    } else {
      setClientProgressionsMainId({
        clientProgressions: clientProgressionsMainId.clientProgressions.map((item, i) => {
          if (JSON.parse(e.target.value).id === item._id) {
            return {
              progressionId: JSON.parse(e.target.value).progressionId,
              categoryId: JSON.parse(e.target.value).categoryId,
              ...item
            };
          } else {
            return item;
          }

          // setVClientValue('')
        })
      });
    }
  };

  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row.clientName
    },
    {
      name: 'Progression',
      sortable: true,
      grow: 2,

      selector: (row) => (
        <Input
          key={row._id}
          id="exampleSelect"
          name="progressionName"
          type="select"
          onChange={changeProgression}
          // value={clientValue}
        >
          <option value="">Select Progression</option>
          {categoriesArray?.map((progressionItem, i) => {
            let newId = {
              categoryId: progressionItem.categoryId,
              progressionId: progressionItem.progressionId
            };
            {
              /* value = {[progressionItem.categoryId,progressionItem.progressionId] */
            }
            return (
              <option
                value={JSON.stringify({
                  categoryId: progressionItem.categoryId,
                  progressionId: progressionItem.progressionId,
                  id: row?.clientId
                })}
                key={i}
              >
                {progressionItem?.list?.categoryName + ' (' + progressionItem?.name + ')'}
              </option>
            );
          })}
        </Input>
      )
    },
    {
      name: 'Rank',
      sortable: true,
      selector: (row) => {
        // console.log('row',row)
        return (
          <div className="d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center me-1"
              // style={{
              //   height: '40px',
              //   width: '40px',
              //   backgroundColor: '#de9f7a',
              //   borderRadius: '50%'
              // }}
            >
              {row?.currentRankImage ? (
                <Avatar className="me-1" img={row?.currentRankImage} imgWidth="42" imgHeight="42" />
              ) : (
                <Avatar
                  className="me-1"
                  img={
                    'https://storage.googleapis.com/mymember-storage/All-Images/744c5092-0cab-4418-9e72-c0a1036cf88e-No%20Belt.png'
                  }
                  imgWidth="45"
                  imgHeight="45"
                />
              )}
            </div>
            {row.name}
          </div>
        );
      }
    },
    {
      name: 'Next Rank',
      sortable: true,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-1"
            style={
              {
                // height: '40px',
                // width: '40px',
                // backgroundColor: '#94f564',
                // borderRadius: '50%'
              }
            }
          >
            {/* {row?.nextRankOrder ==0 ? "N/A": row?.nextRankOrder} */}
            {row?.nextRankImage ? (
              <Avatar className="me-1" img={row?.nextRankImage} imgWidth="42" imgHeight="42" />
            ) : (
              <Avatar
                className="me-1"
                img={
                  'https://storage.googleapis.com/mymember-storage/All-Images/744c5092-0cab-4418-9e72-c0a1036cf88e-No%20Belt.png'
                }
                imgWidth="45"
                imgHeight="45"
              />
            )}
          </div>
        </div>
      )
    },
    {
      name: 'Last Promoted',
      sortable: true,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-1"
            style={
              {
                // height: '40px',
                // width: '40px',
                // backgroundColor: '#f0f564',
                // borderRadius: '50%'
              }
            }
          >
            {row?.lastPromoteRankImage ? (
              <Avatar
                className="me-1"
                img={row?.lastPromoteRankImage}
                imgWidth="42"
                imgHeight="42"
              />
            ) : (
              <Avatar
                className="me-1"
                img={
                  'https://storage.googleapis.com/mymember-storage/All-Images/744c5092-0cab-4418-9e72-c0a1036cf88e-No%20Belt.png'
                }
                imgWidth="45"
                imgHeight="45"
              />
            )}
            {/* {row?.lastPromoteRankOrder  ==0 ? "N/A": row.lastPromoteRankOrder} */}
          </div>
          {row.name}
        </div>
      )
    },

    {
      name: 'Actions',
      allowOverflow: true,
      cell: (row) => (
        <div className="d-flex">
          <Edit2 size={16} />
          <Trash2 size={16} className="ms-1" />
        </div>
      )
    }
  ];

  const { stepper } = props;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const promotClient = () => {
    setPendingSign(true);
    // dispatch(promotClientAction(clientProgressionsMainId));
    api
      .promoteClientProgressionApi(clientProgressionsMainId)
      .then((value) => {
        if (value?.data?.updatedClientRanks?.length > 0) {
          setPendingSign(false);
          dispatch(promotedListAction());
          toast.success('client is   promoted');
          stepper.next();
        } else {
          setPendingSign(false);
          dispatch(promotedListAction());
          toast.error('client is  not  promoted');
        }
      })
      .catch((err) => {
        setPendingSign(false);
        dispatch(promotedListAction());
        toast.error('client is  not  promoted');
        // console.log(err);
      });

    // dispatch(clientValue)
    //  skipPage ? stepper.next()   : null;
    // console.log("clientProgressionsMainId",clientProgressionsMainId);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(clientProgressionData.length / 7) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );
  useEffect(() => {
    dispatch(progressionFetchAction());
    dispatch(progressionListAction());
  }, []);

  return (
    <Fragment>
      <Form></Form>
      <div className="react-dataTable mt-2">
        <DataTable
          noHeader
          pagination
          columns={columns}
          // paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={progressionListSecond ? progressionListSecond : []}
          onSelectedRowsChange={handleRowSelected}
          selectableRows
          // selectableRowsComponent={BootstrapCheckbox}
          // selectableRows
        />
      </div>
      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        {/* () => stepper.next() */}
        <Button
          color="primary"
          disabled={!enablePromote}
          className="btn-next"
          onClick={promotClient}
        >
          <span className="align-middle d-sm-inline-block d-none">
            {pendingSign ? 'Promoting...' : 'promote'}
          </span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default RankTable;
