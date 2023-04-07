// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Components
import CardEventInfo from './CardEventInfo';
import CardHost from './CardHost';
import PreviewBody from './PreviewBody';

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getEventInfo } from '../store';
import CardEvent from '../CardEvent';
import SubmitReplyModal from './SubmitReplyModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaCheck,
  FaEnvelopeOpenText,
  FaMobileAlt,
  FaUserShield,
  FaUserPlus,
  FaMapMarkerAlt,
  FaRegEnvelope
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useMessage from '../../../../lib/useMessage';
import { CardBody, Card, Form, Label, Input } from 'reactstrap';

import { dayOfWeekAsString, monthAsString, formatTime } from '@src/utility/Utils';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
// ** Styles
import '@styles/react/libs/swiper/swiper.scss';

const NotAuthPreview = () => {
  const dispatch = useDispatch();
  const { eventId, guestId } = useParams();
  let guestInfo = {};
  if (guestId) guestInfo = JSON.parse(atob(guestId));
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const eventInfo = useSelector((state) => state.event.eventInfo);
  useEffect(() => {
    dispatch(getEventInfo(eventId));
    document.querySelector('body').classList.add('event-preview');
  }, []);

  // Submit part
  const { error, success } = useMessage();
  const [guestState, setGuestState] = useState({
    name: guestInfo?.guestName ? guestInfo.guestName : '',
    email: guestInfo?.guestEmail ? guestInfo.guestEmail : '',
    phone: '',
    status: 'yes'
  });

  const blockInvalidChar = (e) => ['+', '-'].includes(e.key) && e.preventDefault();

  // Get Radio Button Value
  const handleChange = (e) => {
    setGuestState((p) => ({
      ...p,
      status: document.querySelector('input[name="status"]:checked').value
    }));
  };

  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    let isNewEmployee = true;
    const { name, email, phone, status } = guestState;
    if (name === '') {
      error('full name must not be empty !');
      return;
    }
    if (
      email === '' ||
      (email !== undefined && email !== '' && email.length < 11) ||
      (email !== '' && email !== undefined && email.indexOf('@') == -1)
    ) {
      error('enter a valid email');
      return;
    }
    if (phone === '' || (phone != '' && phone != undefined && phone.length < 8) || !isNaN) {
      error('enter a valid phone number');
      return;
    }
    if (guestInfo.guestName !== undefined || guestInfo.guestInfo !== undefined)
      isNewEmployee = false;
    dispatch(addUpdateGuests({ _id: _id, guestData: guestState, isNewEmployee: isNewEmployee }));
    success('Your reply successfully sent!');
    setGuestState({
      name: '',
      email: '',
      phone: '',
      status: 'yes'
    });
    setModal(false);
  };

  // slider
  SwiperCore.use([]);

  const params = {
    className: 'swiper-responsive-breakpoints swiper-container px-4 py-2',
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      1600: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  };

  // Time Format
  const getEventStartTime = (event) => {
    const startTime = new Date(event.start);
    return startTime;
  };

  const getEventEndTime = (event) => {
    const endTime = new Date(event.end);
    return endTime;
  };

  const formatDate = (date) => {
    return (
      dayOfWeekAsString(date.getDay()) +
      ', ' +
      monthAsString(date.getMonth()) +
      ' ' +
      date.getDate() +
      ', ' +
      date.getFullYear() +
      ' ' +
      formatTime(date)
    );
  };

  return (
    <Fragment>
      <nav className="header-navbar navbar align-items-center floating-nav navbar-shadow navbar navbar-expand-lg navbar-light event-preview-navbar mt-0">
        <div className="container">
          <div className="navbar-container d-flex content">
            <Row className="w-100 mx-0">
              <Col md="3" className="d-flex align-items-center">
                <Link
                  className="brand-logo d-flex me-3 align-items-center"
                  to="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg viewBox="0 0 139 95" version="1.1" height="28">
                    <defs>
                      <linearGradient
                        x1="100%"
                        y1="10.5120544%"
                        x2="50%"
                        y2="89.4879456%"
                        id="linearGradient-1"
                      >
                        <stop stopColor="#000000" offset="0%"></stop>
                        <stop stopColor="#FFFFFF" offset="100%"></stop>
                      </linearGradient>
                      <linearGradient
                        x1="64.0437835%"
                        y1="46.3276743%"
                        x2="37.373316%"
                        y2="100%"
                        id="linearGradient-2"
                      >
                        <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                        <stop stopColor="#FFFFFF" offset="100%"></stop>
                      </linearGradient>
                    </defs>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                        <g id="Group" transform="translate(400.000000, 178.000000)">
                          <path
                            d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                            id="Path"
                            className="text-primary"
                            style={{ fill: 'currentColor' }}
                          ></path>
                          <path
                            d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                            id="Path"
                            fill="url(#linearGradient-1)"
                            opacity="0.2"
                          ></path>
                          <polygon
                            id="Path-2"
                            fill="#000000"
                            opacity="0.049999997"
                            points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                          ></polygon>
                          <polygon
                            id="Path-2"
                            fill="#000000"
                            opacity="0.099999994"
                            points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                          ></polygon>
                          <polygon
                            id="Path-3"
                            fill="url(#linearGradient-2)"
                            opacity="0.099999994"
                            points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                          ></polygon>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <h2 className="brand-text text-primary ms-1">My Manager</h2>
                </Link>
                {/* <Button onClick={toggle} color="primary" className="d-flex align-items-center"><FaEnvelopeOpenText size="15" className="me-1" />Reply Event</Button> */}
              </Col>
              <Col md="9" className="d-flex justify-content-end align-items-center">
                <h6 className="mb-0 me-auto font-medium-2 font-weight-bold">
                  This free event manager is powered by{' '}
                  <a href="https://mymanager.com">
                    <u>Manager.com</u>
                  </a>
                </h6>
                <Link to="/">
                  <Button color="primary" className="me-1 align-items-center d-flex ">
                    <FaUserShield size="15" className="me-1" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button color="primary" className="d-flex align-items-center">
                    <FaUserPlus size="15" className="me-1" />
                    Register
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </nav>
      <div className="header-navbar-shadow d-block" style={{ paddingTop: '6.2rem' }}></div>

      <div className="intro-banner">
        <img
          src="https://mymanager.com/assets/images/events/default.jpg"
          height="500"
          alt="Event Banner"
          className="w-100"
        />
      </div>
      <div className="container">
        <Row>
          <Col md="12">
            <h6 className="font-medium-5 mb-1 mt-5 text-center">Keep In Touch</h6>
            <h2 className="text-primary font-large-1 mb-3 text-center text-capitalize">
              {eventInfo.hostName} Event
            </h2>
            <div className="d-flex align-items-center justify-content-evenly mb-3">
              <div>
                <div className="d-flex mb-2">
                  <h6 className="mb-0">
                    <FaCheck size="25" color="#7367F0" className="me-1" />
                    Start: {formatDate(getEventStartTime(eventInfo))}
                  </h6>
                </div>
                <div className="d-flex">
                  <h6 className="mb-0">
                    <FaCheck size="25" color="#7367F0" className="me-1" />
                    End: {formatDate(getEventEndTime(eventInfo))}
                  </h6>
                </div>
              </div>
              <div>
                <div className="d-flex mb-2">
                  <h6 className="mb-0">
                    <FaCheck size="25" color="#7367F0" className="me-1" />
                    Available Tickets: {eventInfo.ticketAvailableQuantity}
                  </h6>
                </div>
                <div className="d-flex">
                  <h6 className="mb-0">
                    <FaCheck size="25" color="#7367F0" className="me-1" />
                    Ticket Fee: {eventInfo.ticketPrice != 0 ? eventInfo.ticketPrice : 'Free'}
                  </h6>
                </div>
              </div>
            </div>
            <Col md="12">
              <img
                src="https://mymanager.com/assets/images/events/event.jpg"
                height="500"
                alt="Event Banner"
                className="w-100 rounded-3"
              />
            </Col>
            <div className="mt-2 mb-1">
              <Swiper
                {...params}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={(slide) => {
                  console.log(slide.activeIndex);
                }}
                className=""
              >
                <SwiperSlide>
                  <div className="img-container">
                    <img
                      src="https://mymanager.com/assets/images/events/event-1.jpg"
                      alt="swiper 1"
                      className="img-detail w-100 rounded-3"
                      height="300px"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-container">
                    <img
                      src="https://mymanager.com/assets/images/events/event-2.jpg"
                      alt="swiper 1"
                      className="img-detail w-100 rounded-3"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-container">
                    <img
                      src="https://mymanager.com/assets/images/events/event-3.jpg"
                      alt="swiper 1"
                      className="img-detail w-100 rounded-3"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-container">
                    <img
                      src="https://mymanager.com/assets/images/events/event-4.jpg"
                      alt="swiper 1"
                      className="img-detail w-100 rounded-3"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="mb-5">
              <h2 className="text-primary font-medium-5 mb-2 mt-3 text-capitalize">
                About {eventInfo.ticketName}
              </h2>
              {/* <h6>{eventInfo.notes}</h6> */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna tate eu scelerisque felis. Vel pretium lectus
                quam id leo in vitae turpis massa. Nunc id cursus metus aliquam.Libero id faucibus
                nisl tinci Aliquam id diam maecenas ultricies mi eget mauris.
              </p>
            </div>
          </Col>
          <CardBody>
            <iframe
              scrolling="no"
              className="shadow-sm"
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                border: 'none',
                height: '400px',
                borderRadius: 10
              }}
              src={
                'https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik'
              }
            />
          </CardBody>
          <Col md="12" className="zindex-0">
            <div className="mx-6 bg-white ms-5 me-5 rounded-3">
              <Row style={{ marginTop: '-120px' }}>
                <Col
                  md="4"
                  className="p-3 vcol-md-4 d-flex justify-content-center align-items-center flex-column"
                >
                  <FaMapMarkerAlt size={50} color="#7367F0" />
                  <h6 className="mt-2 mb-2 font-large-1 text-body">Address</h6>
                  <p className="font-medium-5 text-body">{eventInfo.eventAddress}</p>
                </Col>
                <Col
                  md="4"
                  className="p-3 vcol-md-4 d-flex justify-content-center align-items-center flex-column"
                >
                  <FaMobileAlt size={50} color="#7367F0" />
                  <h6 className="mt-2 mb-2 font-large-1 text-body">Phone</h6>
                  <p className="font-medium-5 text-body">
                    {eventInfo.hostMobileNumber ? eventInfo.hostMobileNumber : '+1 234 4567890'}
                  </p>
                </Col>
                <Col
                  md="4"
                  className="p-3 vcol-md-4 d-flex justify-content-center align-items-center flex-column"
                >
                  <FaRegEnvelope size={50} color="#7367F0" />
                  <h6 className="mt-2 mb-2 font-large-1 text-body">E-mail</h6>
                  <p className="font-medium-5 text-body">
                    {eventInfo.hostEmail ? eventInfo.hostEmail : 'admin@mymanager.com'}
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md="12 mb-5">
            <h6 className="font-medium-5 mb-1 mt-5 text-center">LET'S TALK</h6>
            <h2 className="text-primary font-large-1 mb-3 text-center">GET IN TOUCH</h2>
            <div className="mb-1">
              <Form onSubmit={(e) => e.preventDefault()} className="text-left">
                <Row>
                  <Col md="6">
                    <Input
                      id="name"
                      name="name"
                      defaultValue={guestInfo.guestName ? guestInfo.guestName : ''}
                      disabled={guestInfo.guestName ? true : false}
                      placeholder="Name *"
                      onChange={(e) => {
                        setGuestState((p) => ({
                          ...p,
                          name: e.target.value
                        }));
                      }}
                    />
                  </Col>
                  <Col md="6">
                    <Input
                      id="email"
                      name="email"
                      defaultValue={guestInfo.guestEmail ? guestInfo.guestEmail : ''}
                      disabled={guestInfo.guestEmail ? true : false}
                      placeholder="E-Mail *"
                      onChange={(e) => {
                        setGuestState((p) => ({
                          ...p,
                          email: e.target.value
                        }));
                      }}
                    />
                  </Col>
                </Row>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone Number *"
                  onKeyDown={blockInvalidChar}
                  className="mt-1"
                  onChange={(e) => {
                    setGuestState((p) => ({
                      ...p,
                      phone: e.target.value
                    }));
                  }}
                />
                <div className="d-flex mt-2">
                  <input
                    type="radio"
                    id="yes"
                    name="status"
                    value="yes"
                    onChange={handleChange}
                    defaultChecked
                  />
                  <label htmlFor="yes" className="ps-50 pe-1">
                    Yes, I will attend
                  </label>
                  <input type="radio" id="no" name="status" value="no" onChange={handleChange} />
                  <label htmlFor="no" className="ps-50 pe-1">
                    No, I can't
                  </label>
                  <input
                    type="radio"
                    id="maybe"
                    name="status"
                    value="maybe"
                    onChange={handleChange}
                  />
                  <label htmlFor="maybe" className="ps-50 pe-1">
                    Maybe, Later
                  </label>
                </div>
              </Form>
              <Button className="mt-2 btn-lg px-5" color="primary" onClick={(e) => handleSubmit(e)}>
                Reply
              </Button>
            </div>
          </Col>

          <SubmitReplyModal
            modal={modal}
            setModal={setModal}
            toggle={toggle}
            _id={eventId}
            guestInfo={guestInfo}
          ></SubmitReplyModal>
        </Row>
      </div>
      <div className="footer p-2">
        <h2 className="text-primary font-medium-5 mb-0 text-center">
          Mymanager.com © 2023. All Rights Reserved
        </h2>
      </div>
    </Fragment>
  );
};

export default NotAuthPreview;
