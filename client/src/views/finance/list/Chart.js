// ** Third Party Components
import Chart from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, Input } from 'reactstrap';

const ApexBarChart = ({ info, direction, heading, subheading }) => {
  // ** Chart Options
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
        borderRadius: [10]
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: ['#00bd54', '#DA291A', '#00800000'],
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      intersect: false
    },

    xaxis: {
      categories: [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER'
      ]
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  };

  const years = ['Year', 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  // ** Chart Series
  const series = [
    {
      name: 'Gross',
      data: [600, 350, 480, 600, 210, 550, 150, 20, 100, 120, 30, 500]
    },
    {
      name: 'Expense',
      data: [600, 350, 480, 600, 210, 550, 150, 20, 100, 120, 30, 500]
    },
    {
      name: 'Profit',
      data: [600, 350, 480, 600, 210, 550, 150, 20, 100, 120, 30, 500]
    }
  ];

  return (
    <Card>
      {/* <div>
          <CardSubtitle className="text-muted mb-25">{heading}</CardSubtitle>
          <CardTitle className="fw-bolder" tag="h5">
            {subheading}
          </CardTitle>
        </div> */}
      <div className="d-flex align-items-center justify-content-between p-1">
        <h5>{subheading}</h5>
        <Input type="select" style={{ height: '35px', width: '100px' }}>
          {years.map((item) => {
            return <option>{item}</option>;
          })}
        </Input>
      </div>
      <div>
        <Chart options={options} series={series} type="bar" height={450} />
      </div>
    </Card>
  );
};

export default ApexBarChart;
