// ** Custom Components
import Avatar from '@components/avatar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Icons Imports
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from 'reactstrap';
import AddExpense from './AddExpense';

import { ExpenseFetchAction, TotalCategoriesAction } from "../store/actions"

const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
};
const filtersRadio = [
  { label: 'Events', id: 'events', defaultChecked: true },
  { label: 'Appointments', id: 'appointments' },
  { label: 'Booking', id: 'booking' },
  { label: 'Attendance', id: 'attendance' }
];

const monthNames = [
  { key: 0, name: 'January', year: 2010 },
  { key: 1, name: 'February', year: 2011 },
  { key: 2, name: 'March', year: 2012 },
  { key: 3, name: 'April', year: 2013 },
  { key: 4, name: 'May', year: 2014 },
  { key: 5, name: 'June', year: 2015 },
  { key: 6, name: 'July', year: 2016 },
  { key: 7, name: 'August', year: 2017 },
  { key: 8, name: 'September', year: 2018 },
  { key: 9, name: 'October', year: 2019 },
  { key: 10, name: 'November', year: 2020 },
  { key: 11, name: 'December', year: 2021 }
];

const CardTransactions = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [activeFilter, setActiveFilter] = useState(filtersRadio[0]?.label);
  const [id, setid] = useState();

  const transactionsArr = [
    {
      title: 'Wallet',
      color: 'light-primary',
      subtitle: 'Recurring',
      amount: '$74',
      Icon: Icon['Pocket']
      // down: true
    },
    {
      title: 'Bank Transfer',
      color: 'light-success',
      subtitle: 'Add Money',
      amount: '$480',
      Icon: Icon['Check']
    },
    {
      title: 'Paypal',
      color: 'light-danger',
      subtitle: 'One Time',
      amount: '+ $590',
      Icon: Icon['DollarSign']
    },
    {
      title: 'Mastercard',
      color: 'light-warning',
      subtitle: 'Ordered Food',
      amount: '$12',
      Icon: Icon['CreditCard']
      // down: true
    },
    {
      title: 'Transfer',
      color: 'light-info',
      subtitle: 'Refund',
      amount: '$98',
      Icon: Icon['TrendingUp']
    }
  ];

  const dispatch = useDispatch();
  const allCategoryLists = useSelector((state) => state.finance.categoryList ?? []);
  const expenseList = useSelector((state) => state.finance.expenseList ?? []);
  const filtered_expenseList = expenseList.filter((item) => new Date(item.date).getFullYear() == year && new Date(item.date).getMonth() == currentMonth);
  const allCategoryByExpense = allCategoryLists.filter((ca) => ca.type === "expense").map((item) => {
    if (filtered_expenseList.filter((li) => li.categoryId._id === item._id).length) {
      return  { ...item, amount: filtered_expenseList.filter((li) => li.categoryId._id === item._id)
        .map((list) => list.amount)
        .reduce((prev, current) => {
        return prev + current;
      }, 0)}
    }
    return { ...item, amount: 0}
  });
  const totalExpense = allCategoryByExpense.length ? allCategoryByExpense.map((item) => item.amount).reduce((prev, current) => (prev + current)) : 0;
  useEffect(() => {
    dispatch(ExpenseFetchAction());
    dispatch(TotalCategoriesAction());
  },[]);

  const renderTransactions = () => {
    return allCategoryByExpense.map((item) => {
      return (
        <div key={item.title} className="transaction-item">
          <div className="d-flex">
            {/* <Avatar className="rounded" color={item.color} icon={<item.Icon size={18} />} /> */}
            <Avatar className="rounded" color={item.labelColor} icon={<Icon.DollarSign size={18} />}/>
            <div>
              <h6 className="transaction-title">{item.title}</h6>
              {/* <small>{item.subtitle}</small> */}
            </div>
          </div>
          <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>
          $ {item.amount}
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <div>
          <CardTitle tag="h5">{monthNames[currentMonth].name + " " + year}</CardTitle>
          <div>Expense by Type</div>
        </div>
        <div className="d-flex">
          <div className="d-flex">
            <div>
              <Input id="exampleSelect" name="select" type="select" value={monthNames[currentMonth].name} onChange={(e) => setCurrentMonth(monthNames.filter((item) => item.name === e.target.value)[0].key)}>
                {monthNames.map((item) => {
                  return <option>{item?.name}</option>;
                })}
              </Input>
            </div>
          </div>
          <AddExpense
            filtersRadio={filtersRadio}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
      </CardHeader>
      <CardBody>
        <div className="pb-2 border-bottom">{renderTransactions()}</div>
        <div className="pt-2">
          <div key={transactionsArr[2].title} className="transaction-item">
            <div className="d-flex">
              <Avatar
                className="rounded"
                color={transactionsArr[2].color}
                icon={<Icon.TrendingUp size={18} />}
              />
              <div>
                <h6 className="transaction-title">Total Expense</h6>
                {/* <small>{transactionsArr[2].subtitle}</small> */}
              </div>
            </div>
            <div
              className={`fw-bolder ${transactionsArr[2].down ? 'text-danger' : 'text-success'}`}
            >
              $ {totalExpense}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardTransactions;
