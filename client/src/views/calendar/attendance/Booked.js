// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button, Label, CardHeader, CardTitle } from 'reactstrap';
import AsyncSelect from 'react-select/async';
//** third party imports */
import Flatpickr from 'react-flatpickr';
// ** Custom Components

// ** Utils
import { selectThemeColors } from '@utils';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

// ** Events Actions Import
import BookList from './BookList';
import { bookClass, getClassbooking } from './store';

import { getUserData } from '../../../auth/utils';

const Booked = (props) => {
  const { contacts } = props;

  // ** Store  vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.attendance);

  const selectedClass = store?.selectedClass;

  //**Fake data */
  // const selectedClass =
  // const store = useSelector((state) => state.event)
  const [contact, setContact] = useState({});
  // ** States

  useEffect(() => {
    if (selectedClass?._id !== undefined && selectedClass?._id !== '') {
      dispatch(getClassbooking(selectedClass?._id));
    }
  }, [selectedClass?._id]);

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterContacts(inputValue));
      }, 200);
    });
  };

  const filterContacts = (inputValue) => {
    const filterData = contacts?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filterData;
  };

  const handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, '');
    return val;
  };

  const handleContactChange = (contact) => {
    setContact(contact);
  };

  const handleSubmit = () => {
    const payloadData = {
      image: contact?.photo,
      rankImg: contact?.photo,
      fullName: contact?.fullName,
      email: contact?.email,
      //rankName: contact?.ranks,
      rankName: '',
      progression: 10,
      className: selectedClass?.classTitle,
      userId: getUserData().id,
      classId: selectedClass?._id,
      contactId: contact?._id
    };
    dispatch(bookClass(payloadData));
  };

  return (
    <Fragment>
      <Row>
        <Col md="12" sm="12">
          <Row>
            <Col>
              <Card>
                {selectedClass.classTitle && (
                  <CardHeader className="border-bottom py-1">
                    <CardTitle>{selectedClass.classTitle}</CardTitle>
                  </CardHeader>
                )}
                <CardBody>
                  <div className="d-flex justify-content-around pt-2 gap-1 align-items-center">
                    <div className="w-75">
                      <Label className="form-label" for="studentId">
                        Search Contact
                      </Label>
                      <AsyncSelect
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        loadOptions={promiseOptions}
                        onChange={handleContactChange}
                        onInputChange={handleInputChange}
                        theme={selectThemeColors}
                        cacheOptions
                        defaultOptions={contacts}
                        placeholder="Type name here"
                      />
                    </div>
                    <div className="mt-2">
                      <Button onClick={() => handleSubmit()} color="primary">
                        Book
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {<BookList selectedClass={selectedClass} />}
        </Col>
      </Row>
    </Fragment>
  );
};
export default Booked;
