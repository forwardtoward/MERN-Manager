import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, Col, Input, Row } from 'reactstrap';
import Profile from '../../../../assets/images/profile/post-media/2.jpg';
// import banner1 from '../../../../assets/images/banner/banner-2.jpg';
import banner1 from '../../../../assets/images/banner/default.png';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiFillDelete, AiOutlineDown } from 'react-icons/ai';

import { AiOutlineCheckCircle, AiOutlineArrowDown } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import Moment from 'react-moment';
import '../../../../assets/styles/socialconnect.scss';
import {
  addComment,
  commentByPost,
  createFacebookPagePost,
  deleteComment,
  deleteCompose,
  editComposePost,
  editWorkSpace,
  getComposePost,
  refreshPageTokenFb,
  refreshTokenFb,
  viewOneWorkspace
} from '../../../../requests/Planable';
import { Tooltip } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
const MySwal = withReactContent(Swal);

const FeedView = (args) => {
  const [active, setActive] = useState(null);
  const [activecheck, setActivecheck] = useState(null);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [comment, setcomment] = useState([]);
  const [Id, setid] = useState('');
  const [viewOne, setViewOne] = useState({});
  const [ShowComment, setShowComment] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOp, setTooltipOp] = useState(false);
  const [loader, setLoader] = useState(false);
  const [index, setindex] = useState('');
  const [DateTime, setDateTime] = useState('');
  const [DateShow, setDateShow] = useState(false);

  const params = useParams();
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const togglesecond = () => setTooltipOp(!tooltipOp);

  const onChange = (value, dateString) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    // console.log('onOk: ', value);
  };

  const handlePost = (e, id) => {
    e.preventDefault();
    const post = {
      post: id,
      userid: '63e3a492f49ead238773ef08',
      comment: text
    };
    if (text) {
      addComment(post).then((response) => {
        setText('');
      });
      getOneComment(Id, index);
    }
    const accesstoken =
      'EAABzV3iosiIBAErn5xmRX5IbInvC4crYDgP27fZAJItZCgsACroeLsRXC78CVcKpAvZBCoZAkSGwsZCsj253IGYtXeAyitSNa5qq1s7Tf1Oni3m10K0s6gG9oZBSQBKwZA0CenMOWKGZAwl2J8TID2KnVxyhzQzCXaa2ZCU6nT3wrNF5gqthlkyDNZBujxVfb6gGSlIqakorjn8wZDZD';
    const fbpost = {
      access_token: accesstoken,
      message: text,
      page_id: 113684288326422
    };
    createFacebookPagePost(fbpost).then((response) => {});
  };
  const GetOneWorkSpace = async () => {
    setLoader(true);
    await viewOneWorkspace(params.id).then((response) => {
      // EditWorkSpace(response);
      if (response?.facebookData.length > 0) {
        setLoader(false);
        setViewOne(response?.facebookData[0]);
      } else if (response?.googleData.length > 0) {
        setLoader(false);
        setViewOne(response.googleData[0]);
      }
    });
  };
  const EditWorkSpace = (value) => {
    // console.log(value);
    let accesstoken = value.facebookData[0].accessToken;
    let pageId = value.facebookData[0].pageId;
    const refreshtoken = {
      access_token: accesstoken,
      page_id: pageId
    };
    refreshPageTokenFb(refreshtoken).then((res) => {
      // console.log(res);
    });
    // console.log(accesstoken, pageId);

    let payload = {
      facebookData: [
        {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk0ZTIyODc3YTM4MmU0MmI1MzAyYTkiLCJ1c2VyIjp7InR5cGUiOiJzdXBlci1hZG1pbiIsImVtcGxveWVlSWQiOm51bGx9LCJpYXQiOjE2Nzg5NjA5NjQsImV4cCI6MTY3OTA0NzM2NH0.4pN06a8ifCc4jgracp9ndaaxavokyFpfqDSwK_e_X_E'
        }
      ]
    };
  };
  const handleSetDateTime = (e) => {
    const date = new Date(e.target.value);
    const newdate = date.toISOString().split('T');
    // setDateTime(newdate);
    // console.log(newdate[0]);
    // console.log('time', newdate[1].split('.')[0]);
  };

  const HandleEditCompose = (value) => {
    let payload = {
      date: DateTime[0],
      time: DateTime[1].split('.')[0]
    };

    editComposePost(value._id, payload).then((response) => {
      // console.log(response);
      getComposePost();
    });
  };
  const handleSyncNow = (value) => {
    // sync api here to fb on basis of time
    // console.log(value);
  };
  const handlePostNow = (value) => {
    // console.log(value);
    // direct post to fb api here
    // console.log(DateTime[0]);
    // console.log(DateTime[1].split('.')[0]);
  };

  const handleDeletePost = (id) => {
    deleteCompose(id).then((res) => {
      getComposePost();
    });
  };
  const handleDelete = async (id) => {
    await deleteComment(id).then((res) => {
      getOneComment(Id, index);
    });
  };

  const getOneComment = async (id, i) => {
    setcomment('');
    setid(id);
    setindex(i);
    await commentByPost(id).then((resp) => {
      setcomment(resp);
    });
  };

  const getCompose = async () => {
    await getComposePost().then((resp) => {
      // console.log(resp);
      setData(resp);
    });
  };
  useEffect(() => {
    const CurrentTime = new Date().toLocaleString();
    // console.log(CurrentTime);

    getCompose();
    GetOneWorkSpace();
  }, [params]);

  return (
    <>
      {loader === true ? (
        <>
          <h3>Loading...</h3>
        </>
      ) : (
        <div className="userimageworkspce">
          <Row className="userimagemainrow">
            <Col sm={3} md={3} lg={3} className="text-center">
              <Card className="cardmainuserfeed">
                <CardBody className="userimagemain">
                  <img
                    className="mb-1"
                    alt="profile"
                    src={viewOne?.profileImg}
                    style={{
                      border: '1px solid',
                      borderRadius: '50%',
                      width: '134px',
                      height: '125px'
                    }}
                  />
                  <span className="useremail">{viewOne?.email}</span>
                  <h5 className="usernamefeed">{viewOne?.profileName}</h5>
                  <h5 className="usrpagename">{viewOne?.pageName}</h5>
                </CardBody>
              </Card>
            </Col>
            <Col sm={9} md={9} lg={9}>
              <Card>
                <CardBody>
                  <div>
                    <img
                      alt="banner"
                      className="headerimage_user"
                      src={banner1}
                      style={{ height: '200px', width: '100%' }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            {data?.map((value, i) => (
              <>
                <Col key={value} lg="3" className="mt-14">
                  <Row>
                    <Col lg="8"></Col>
                    <Col lg="4" md="4" sm="4" className="mt-1">
                      <Row>
                        <span className=" d-flex justify-content-right">
                          <div
                            target="_blank"
                            rel="noreferrer"
                            id="TooltipExample"
                            placement="left"
                            onClick={() => {
                              setActivecheck(value, i);
                              handleSyncNow(value);
                            }}
                            onDoubleClick={() => setActivecheck(null)}
                            className="circle-bx"
                          >
                            <AiOutlineCheckCircle
                              fill={activecheck === value ? 'blue' : 'grey'}
                              size="23px"
                            />
                            <Tooltip
                              {...args}
                              placement="left"
                              isOpen={tooltipOpen}
                              target="TooltipExample"
                              toggle={toggle}
                            >
                              Sync Now
                            </Tooltip>
                          </div>
                        </span>
                      </Row>
                      <Row>
                        <span className=" d-flex justify-content-right mt-1">
                          <div
                            target="_blank"
                            placement="left"
                            rel="noreferre"
                            id="TooltipExamp"
                            onClick={() => {
                              setActive(value, i);
                              handlePostNow(value);
                            }}
                            onDoubleClick={() => setActive(null)}
                            className="circle-bx"
                          >
                            <Tooltip
                              {...args}
                              placement="left"
                              isOpen={tooltipOp}
                              target="TooltipExamp"
                              toggle={togglesecond}
                            >
                              Post Now
                            </Tooltip>
                            <BsFacebook fill={active === value ? 'blue' : 'grey'} size="22px" />
                          </div>
                        </span>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col sm={5} md={5} lg={5} className="mt-1">
                  <div className="post-main" key={value.id}>
                    <Card>
                      <CardBody>
                        <div className="post-box">
                          <Row>
                            <Col lg="7">
                              {value?.time === '' ? (
                                <>
                                  <span className="d-flex justify-content-start calnderinputcustom"></span>
                                  {/* <span
                                    className="headingcustomdate"
                                    onClick={() => setDateShow(true)}
                                  >
                                    Select date and time
                                    <span className="customearrow">
                                      <AiOutlineArrowDown size="10px" />{' '}
                                    </span>
                                  </span> */}

                                  {/* {DateShow == true ? (
                                    <>
                                      <div className="calender_heading">
                                        <span className="d-flex justify-content-start calnderinputcustom">
                                          <Input
                                            size="sm"
                                            id="customcalenderdta"
                                            min="2023-03-07T00:00"
                                            max="2023-04-28T00:00"
                                            className="form-control customedatatime mt-1"
                                            placeholder="time placeholder"
                                            type="datetime-local"
                                            onChange={handleSetDateTime}
                                          />
                                        </span>
                                        <Badge
                                          className="badgecustomcalender"
                                          onClick={() => {
                                            if (DateTime !== '') {
                                              setDateShow(false);
                                              HandleEditCompose(value);
                                            } else toast.error('Select Date & Time');
                                          }}
                                          color="primary"
                                        >
                                          submit
                                        </Badge>
                                        <Badge
                                          className=" badgecustomcalender mx-1"
                                          onClick={() => {
                                            setDateShow(false);
                                          }}
                                          color="secondary"
                                        >
                                          Cancel
                                        </Badge>
                                      </div>
                                    </>
                                  ) : null} */}
                                </>
                              ) : null}
                            </Col>
                            <Col lg="5" className="d-flex justify-content-end">
                              <span className="">
                                <AiFillDelete
                                  onClick={() => handleDeletePost(value?._id)}
                                  fill="red"
                                  size="20px"
                                />
                              </span>
                            </Col>
                          </Row>
                          <div className="post-header ">
                            <div className="d-flex">
                              {value?.media_img?.length == 0 ? null : (
                                <>
                                  <img
                                    className="mb-1"
                                    alt="profile"
                                    src={viewOne?.profileImg}
                                    // src={value?.media_img[0]}
                                    style={{
                                      border: '1px solid',
                                      borderRadius: '50%',
                                      width: '40px',
                                      height: '40px'
                                    }}
                                  />
                                </>
                              )}

                              <h5 className="ml-2">
                                {viewOne?.profileName}
                                <p className="font-s momentdate">
                                  <Moment format="DD/MM/YYYY">{value?.createdAt}</Moment>
                                </p>
                              </h5>
                            </div>

                            <p style={{ fontSize: '18px' }}>{value?.desc?.slice(0, 35)}</p>
                          </div>
                          <div className="post-content">
                            {value?.media_img.length > 0 ? (
                              <>
                                <img
                                  className="mb-1"
                                  alt=""
                                  src={value?.media_img[0]}
                                  style={{
                                    width: '100%'
                                  }}
                                />
                              </>
                            ) : (
                              <></>
                            )}

                            {/* <div className=" comments">
                              <a
                                onClick={() => {
                                  setShowComment(true);
                                  getOneComment(value?._id, i);
                                }}
                                className="commenttext"
                              >
                                Comments
                              </a>
                            </div>
                            <Col key={value?._id}>
                              {ShowComment === true ? (
                                <>
                                  {comment !== '' && index == i ? (
                                    <>
                                      <div>
                                        <Card>
                                          <CardBody className="comment textbox">
                                            <div className="comment-box ">
                                              <div className="comt-list">
                                                <ul>
                                                  <div className="comt-form">
                                                    <h6>Comment:</h6>
                                                    <textarea
                                                      value={text}
                                                      onChange={(e) => setText(e.target.value)}
                                                      className="form-control"
                                                      placeholder="Comment...."
                                                    ></textarea>
                                                    <button
                                                      onClick={(e) => handlePost(e, value?._id)}
                                                      className="btn btn-primary mt-2 mr-2"
                                                    >
                                                      Post
                                                    </button>
                                                  </div>
                                                  {comment.map((data) => (
                                                    <li key={data?._id}>
                                                      <div className=" d-flex justify-content-end deletecoment">
                                                        <div className="deletecoment">
                                                          <AiFillDelete
                                                            onClick={() => handleDelete(data?._id)}
                                                            fill="red"
                                                            size="15px"
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="d-flex">
                                                        <img
                                                          className="mb-1"
                                                          alt="profile"
                                                          src={Profile}
                                                          style={{
                                                            border: '1px solid',
                                                            borderRadius: '50%',
                                                            width: '30px',
                                                            height: '30px'
                                                          }}
                                                        />
                                                        <h5 className="mr-1">You</h5>
                                                        <p
                                                          className="ml-3"
                                                          style={{ fontSize: 12 }}
                                                        ></p>
                                                      </div>
                                                      <div className="commet-msg">
                                                        {data?.comment}
                                                      </div>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            </div>
                                          </CardBody>
                                        </Card>
                                      </div>
                                    </>
                                  ) : null}
                                </>
                              ) : null}
                            </Col> */}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </Col>
                <Col key={value?._id} sm={4} md={4} lg={4} className="mt-1">
                  <Col key={value?._id}>
                    <Card>
                      <div className="mt-1 mb-1 comments">
                        <a
                          onClick={() => {
                            setShowComment(true);
                            getOneComment(value?._id, i);
                          }}
                          className="commenttext"
                        >
                          <img
                            className="customcommetimage"
                            alt="profile"
                            src={viewOne?.profileImg}
                            style={{
                              border: '1px solid',
                              borderRadius: '50%',
                              width: '25px',
                              height: '25px'
                            }}
                          />
                          <span className=""> Comments</span>
                        </a>
                      </div>
                      {ShowComment === true ? (
                        <>
                          {comment !== '' && index == i ? (
                            <>
                              <div>
                                <Card>
                                  <CardBody className="comment textbox">
                                    <div className="comment-box ">
                                      <div className="comt-list">
                                        <ul>
                                          <div className="comt-form">
                                            <h6>Comment:</h6>
                                            <textarea
                                              value={text}
                                              onChange={(e) => setText(e.target.value)}
                                              className="form-control"
                                              placeholder="Comment...."
                                            ></textarea>
                                            {text.length > 1 ? (
                                              <>
                                                <button
                                                  size="sm"
                                                  onClick={(e) => handlePost(e, value?._id)}
                                                  className="btn btn-primary mt-2 mr-2"
                                                >
                                                  Post
                                                </button>
                                              </>
                                            ) : (
                                              <>
                                                <Button
                                                  className="secondary mt-2 mr-2"
                                                  // onClick={(e) => handlePost(e, value?._id)}
                                                  // className="btn btn-primary mt-2 mr-2"
                                                >
                                                  Post
                                                </Button>
                                              </>
                                            )}
                                          </div>
                                          {comment.map((data) => (
                                            <li key={data?._id}>
                                              <div className=" d-flex justify-content-end deletecoment">
                                                <div className="deletecoment">
                                                  <AiFillDelete
                                                    onClick={() => handleDelete(data?._id)}
                                                    fill="red"
                                                    size="15px"
                                                  />
                                                </div>
                                              </div>
                                              <div className="d-flex">
                                                <img
                                                  className="mb-1"
                                                  alt="profile"
                                                  src={Profile}
                                                  style={{
                                                    border: '1px solid',
                                                    borderRadius: '50%',
                                                    width: '30px',
                                                    height: '30px'
                                                  }}
                                                />
                                                <h5 className="mr-1">You</h5>
                                                <p className="ml-3" style={{ fontSize: 12 }}></p>
                                              </div>
                                              <div className="commet-msg">{data?.comment}</div>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </CardBody>
                                </Card>
                              </div>
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </Card>
                  </Col>
                </Col>
              </>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};
export default FeedView;
