// ** Invoice Add Components
import AddCard from './AddCard';
import AddActions from './AddActions';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/base/pages/app-invoice.scss';
import { addinvoicedata, fetchinvoicedata } from '../../../../requests/invoice/invoice';
import { useEffect, useState } from 'react';
import BreadCrumbs from '../../../../@core/components/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../shop/store';
import { setInvoiceListReducer } from '../store/reducer';
import { getUserData } from '../../../../auth/utils';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const InvoiceAdd = () => {
  const { mutate } = addinvoicedata();
  const [payUsing, setPayUsing] = useState([]);
  const history = useHistory();

  const [invoice, setinvoice] = useState({
    date: new Date(),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    // issuedDate: new Date(),
    totalAmount: 0,
    paidAmount:0,
    bank: {},
    items: [
      {
        itemId: '',
        description: '',
        rate: 0,
        quantity: 1
      }
    ],
    discount: 0,
    tax: 0,
    salesperson:getUserData()?.fullName,
    sendInvoice:true,
    note: 'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
  });

const clientStore = useSelector(state=>state.clientContact)
  const handlesubmit = async() => {
    
    let formData = new FormData();
    formData.append("customerId", invoice?.customerId);
    formData.append("date", invoice?.date);
    formData.append("dueDate", invoice?.dueDate);
    formData.append("discount", invoice?.discount);
    formData.append("tax", invoice?.tax);
    formData.append("note", invoice?.note);
    formData.append("items", JSON.stringify(invoice?.items));
    formData.append("salesperson", invoice?.salesperson);
    formData.append("bank", JSON.stringify(invoice?.bank));
    formData.append("alternatePhone", invoice?.alternatePhone);
    formData.append("phone", invoice?.phone);
    formData.append("companyAddress", JSON.stringify(invoice?.companyAddress));
    // formData.append("issuedDate", invoice?.issuedDate);
    formData.append("companyName", invoice?.companyName);
    formData.append("internalPaymentNote", invoice?.internalPaymentNote);
    formData.append("totalAmount", invoice?.totalAmount);
    formData.append("payNow", invoice?.payNow );
    formData.append("file", invoice?.file);
    formData.append("itemType", invoice?.itemType);
    formData.append("sendInvoice", invoice?.sendInvoice);

    if(invoice.sendInvoice === true){
      formData.append("recipient",clientStore?.contacts?.list?.find(x=>x._id===invoice.customerId).email );
    }
    
    mutate(formData);

    
  };

  const dispatch = useDispatch()
  const store = useSelector(state=>{return {...state.userInvoice,...state.shop}})
  const { data } = fetchinvoicedata();
  useEffect(()=>{
    dispatch(setInvoiceListReducer(data?.data))
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 0
      })
    );
  },[data,dispatch])

  return (
    <div className="invoice-add-wrapper">
      <BreadCrumbs
        breadCrumbTitle="Finance"
        breadCrumbParent="Finance"
        breadCrumbActive="Add invoice"
      />
      <Row className="invoice-add">
        <Col xl={9} md={8} sm={12}>
          <AddCard invoicedata={invoice} setinvoice={setinvoice} payUsing={payUsing} store={store} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <AddActions invoicedata={invoice} setPayUsing={setPayUsing} payUsing={payUsing} setinvoice={setinvoice} handlesubmit={handlesubmit} />
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceAdd;
