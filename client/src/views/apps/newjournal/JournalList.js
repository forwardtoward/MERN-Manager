import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import Moment from 'react-moment';
import HtmlParser from 'react-html-parser';
import { getJournalListById } from '../../../requests/myJournal/getMyJournal';
import '../../../../src/assets/styles/jaornal.scss';
import JournalCalender from './JournalCalender';

export default function JournalList(props) {
  const ViewId = props.viewoneId;
  const [viewType, setViewType] = useState('List View');
  const [JournallistData, setJournalData] = useState([]);
  const [active, setActive] = useState(0);
  const handleViewType = (e) => {
    setViewType(e.target.value);
  };
  let GetOne = localStorage.getItem('viewSidebarId');
  useEffect(() => {
    async function fetchData() {
      await getJournalListById(ViewId ? ViewId : props?.selectedItem?._id).then((response) => {
        setJournalData(response);
        if (response.length > 0) {
          props.setDetailsSelectedItem(response[0]);
        }
        props.setSideBarUpdateData(false);
      });
    }
    fetchData();
  }, [GetOne, ViewId ? ViewId : props?.selectedItem?._id, props.sideBarUpdateData === true]);

  let formattedDate = new Date(JournallistData[0]?.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
  if (JournallistData.length < 1) {
    props.setStatusOpen('close');
  }
  return (
    <>
      <div>
        <Input type="select" onChange={handleViewType} value={viewType} className="rtt-slt">
          <option value="List View">List View</option>
          <option value="Calendar View">Calendar View</option>
        </Input>
        <h4 className="mt-1">{formattedDate === 'Invalid Date' ? '' : formattedDate}</h4>
        {viewType === 'List View' ? (
          JournallistData.length < 1 ? (
            'Please create a list'
          ) : (
            JournallistData?.map((data, i) => (
              <>
                <div
                  style={{ cursor: 'pointer' }}
                  key={i}
                  onClick={() => {
                    props.setViewDetailsId(data?._id);
                    props.setStatusOpen('open');
                    setActive(i);
                  }}
                  className={`d-flex jour-1 list-item ${active == i && 'active'}`}
                >
                  <div className={`jour-lf ${active == i && 'active'}`}>
                    <p className="dayofcard">
                      <Moment format="dd ">{data?.createdAt}</Moment>
                    </p>
                    <h1 className="dateincard font-weight-bold">
                      <Moment format=" D ">{data?.createdAt}</Moment>
                    </h1>
                  </div>
                  <div className="jour-md">
                    <p className="customhmlyext">{HtmlParser(data?.desc?.slice(0, 35))}</p>
                    <p className="timeincard">{new Date(data?.updatedAt).toLocaleTimeString()}</p>
                  </div>
                  <div className="jour-rg">
                    <img src={data?.jrnl_img} className="app-img" alt="" />
                  </div>
                </div>
              </>
            ))
          )
        ) : (
          <>
            {/* <Flatpickr
              render={({ defaultValue, value, ...props }, ref) => {
                return (
                  <CustomInput
                    defaultValue={defaultValue}
                    inputRef={ref}
                    className="form-control"
                    placeholder="Select Date"
                  />
                );
              }}
            /> */}
            <JournalCalender setViewType={setViewType} setJournalData={setJournalData} />
          </>
        )}
      </div>
    </>
  );
}
