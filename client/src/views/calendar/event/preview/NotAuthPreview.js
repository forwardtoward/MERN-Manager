// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Components
import CardEventInfo from './CardEventInfo';
import CardHost from './CardHost';
import PreviewBody from './PreviewBody';
import Avatar from '@components/avatar';

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

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { dayOfWeekAsString, monthAsString, formatTime } from '@src/utility/Utils';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// ** Styles
import '@styles/react/libs/swiper/swiper.scss';

import '@src/assets/styles/eventpreview/event-preview-public.scss';
import { Calendar } from 'react-feather';
import Footer from '@layouts/components/footer';
import GetTicketModal from './GetTicketModal';

const NotAuthPreview = () => {
  // ** Store variable
  const dispatch = useDispatch();
  const { eventId, guestId } = useParams();

  // ** State variable
  const [openGetTicket, setOpenGetTicket] = useState(false);

  let guestInfo = {};
  if (guestId) guestInfo = JSON.parse(atob(guestId));
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const eventInfo = useSelector((state) => state.event.eventInfo);
  useEffect(() => {
    dispatch(getEventInfo(eventId));
    document.querySelector('body').classList.add('event-preview-2');
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
    const startTime = event.start ? new Date(event.start) : new Date();
    return startTime;
  };

  const getEventEndTime = (event) => {
    const endTime = new Date(event.end);
    return endTime;
  };

  const formatDate = (date) => {
    if (!date) return '';
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
      {eventInfo && (
        <>
          <div className="bg-white event-preview-2">
            <nav className="navbar align-items-center floating-nav navbar-shadow navbar navbar-expand-lg navbar-light event-preview-navbar mt-0 justify-content-center">
              <div>
                <div className="navbar-container d-flex content">
                  <Row className="w-100 mx-0">
                    <Col md="3" className="d-flex align-items-center">
                      <Link
                        className="brand-logo d-flex align-items-center"
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
                          <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
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
            <div className="header-navbar-shadow d-block"></div>

            <div className="intro-banner">
              <img
                src={
                  eventInfo.eventBanner || 'https://mymanager.com/assets/images/events/default.jpg'
                }
                height="500"
                alt="Event Banner"
                className="w-100"
              />
            </div>
            <div className="container">
              <div className="event-details-wrapper">
                <div className="event-detail-main d-flex flex-column justify-content-start">
                  <div>
                    <p className="start-date">Mar 12</p>
                    <h1 className="event-title">{eventInfo.title}</h1>
                    <p className="summary">{eventInfo.notes}</p>
                  </div>
                  <div>
                    <h2>When and Where</h2>
                    <Row className="mt-2">
                      <Col md="6" className="datetime-heading d-flex flex-row ">
                        <div className="me-2">
                          <Avatar
                            className="rounded"
                            color="light-success"
                            icon={<Calendar size={24} />}
                          />
                        </div>
                        <div>
                          <h4 className="">Date and time</h4>
                          <p>
                            Sat, March 18, 2023,
                            <br /> 12:00 PM – 6:00 PM EDT
                          </p>
                        </div>
                      </Col>
                      <Col md="6" className="location-heading">
                        <div className="datetime-heading d-flex flex-row ">
                          <div className="me-2">
                            <Avatar
                              className="rounded"
                              color="light-success"
                              icon={<Calendar size={24} />}
                            />
                          </div>
                          <div>
                            <h4 className="">Location</h4>
                            <p>
                              <b>Best Bars in Hoboken Hoboken</b>(Various Venues) Hoboken, NJ 07030
                              United States
                            </p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
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
                    </Row>
                    <Row className="mt-2">
                      <h2>Refund Policy</h2>
                      <p>No Refund</p>
                    </Row>
                    <Row className="mt-2 mb-5">
                      <h2>About this event</h2>
                      <div dangerouslySetInnerHTML={{ __html: eventInfo.eventDetail }}></div>
                    </Row>
                  </div>
                </div>
                <div className="event-details-aside">
                  <div className="conversion-bar conversion-bar--checkout-opener eds-fx--slide-up d-flex flex-column justify-content-center text-center">
                    <p style={{ fontSize: '1rem' }}>${eventInfo.ticketPrice}</p>
                    <p>Fees and taxes included</p>
                    <Button color="danger" className="w-100" onClick={() => setOpenGetTicket(true)}>
                      {['product', 'membership'].includes(eventInfo.checkoutType) && 'Buy now'}
                      {eventInfo.checkoutType === 'course' && 'Register now'}
                      {eventInfo.checkoutType === 'ticket' && 'Get Tickets'}
                      {eventInfo.checkoutType === 'none' && 'RSVP'}
                      {!eventInfo.checkoutType && 'Get Tickets'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <GetTicketModal openGetTicket={openGetTicket} setOpenGetTicket={setOpenGetTicket} />
          </div>
          <Footer />
        </>
      )}
    </Fragment>
  );
};

export default NotAuthPreview;
