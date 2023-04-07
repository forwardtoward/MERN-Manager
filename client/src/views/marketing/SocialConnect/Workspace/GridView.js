import React, { Fragment, useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'react-feather';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import { getComposePost } from '../../../../requests/Planable';
import '../../../../assets/styles/socialconnect.scss';

const GridView = () => {
  const [data, setData] = useState([]);

  const getCompose = async () => {
    await getComposePost().then((response) => {
      // console.log(response);
      setData(response);
    });
  };

  useEffect(() => {
    getCompose();
  }, []);

  return (
    <Fragment>
      <Row>
        {data ? (
          <>
            {data?.map((value, i) => (
              <Col sm={3} md={3} lg={3}>
                <Card className="p-1">
                  <Row>
                    <Col lg="6" md="6" sm="6">
                      <h4 className="gridview">{value?.desc?.slice(0, 10)}</h4>
                    </Col>
                    <Col lg="6" md="6" sm="6">
                      <h4 className=" datashow">
                        {value.date !== '' && value.time !== '' ? (
                          <>
                            {value?.date}-{value?.time}
                          </>
                        ) : null}
                      </h4>
                    </Col>
                  </Row>

                  <div className="">
                    <div className="gd-view">
                      {value?.media_img.length > 0 ? (
                        <>
                          <img
                            width="250px"
                            height="230px"
                            src={value?.media_img[0]}
                            alt="post4"
                            // width="100%"
                          />
                        </>
                      ) : null}
                    </div>
                    <div className="grid-icon">
                      {/* <CheckCircle className="me-1" />
                      <Clock /> */}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </>
        ) : (
          <>
            <h3>Loading...</h3>
          </>
        )}
      </Row>
    </Fragment>
  );
};
export default GridView;
