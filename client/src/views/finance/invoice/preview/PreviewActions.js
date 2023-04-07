// ** React Imports
import jsPDF from 'jspdf';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';


// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap';
import EditDrawer from './EditDrawer';

const PreviewActions = ({ id, setSendSidebarOpen, setAddPaymentOpen ,handleDownload,data,setData}) => {
  const [openEditSidebar, setOpenEditSidebar] = useState(false);

  
  return (
    <Fragment>
      <Card className="invoice-action-wrapper">
        <CardBody>
          <Button color="primary" block className="mb-75" onClick={() => setSendSidebarOpen(true)}>
            Send Invoice
          </Button>
          <Button color="secondary" block outline className="mb-75" onClick={handleDownload}>
            Download
          </Button>
          <Button
            color="secondary"
            tag={Link}
            to={`/invoice/print/${id}`}
            target="_blank"
            block
            outline
            className="mb-75"
    
          >
            Print
          </Button>
         
          <Button
            // tag={Link}
            // to={`/invoice/preview/${id}`}
            onClick={() => setOpenEditSidebar(true)}
            color="secondary"
            block
            outline
            className="mb-75"
          >
            Edit
          </Button>
          <Button
             tag={Link}
            to={`/invoice-preview/${id}`}
            target="_blank"
            //onClick={() => setOpenEditSidebar(true)}
            color="primary"
            block
            outline
            className="mb-75"
          >
            Preview
          </Button>

        </CardBody>
      </Card>
      <EditDrawer openEditSidebar={openEditSidebar} setOpenEditSidebar={setOpenEditSidebar} data={data} setData={setData}/>
    </Fragment>
  );
};

export default PreviewActions;
