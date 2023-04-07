import { useState } from "react";
import { Card, CardHeader, CardTitle } from "reactstrap";
import Select from 'react-select';
import Chart from "react-apexcharts";

// ** Utils
import { selectThemeColors } from '@utils';
import ReactApexChart from "react-apexcharts";

const LTVChart = () => {
    const [currentRange, setCurrentRange] = useState({
        value: 'allmonths',
        label: 'All Months'
    });

    const rangeOptions = [
        { value: 'allmonths', label: 'All Months' },
        { value: 'thisyear', label: 'This year' },
        { value: 'lastyear', label: 'Last year' }
    ]

    const series = {
        lastyear: [
            {
                name: "Customer Lifetime Value",
                type: "column",
                data: [5000, 6800, 7840, 9654, 5480, 9000, 4857, 7289, 8108, 7899, 11140, 13559]
            },
            {
                name: "Average Contacts Lifetime Value",
                type: "line",
                data: [4857, 7289, 8108, 7899, 11140, 13559, 5000, 6800, 7840, 9654, 5480, 9000]
            }
        ],
        thisyear: [
            {
                name: "Customer Lifetime Value",
                type: "column",
                data: [3000, 5000, 6000, 7840, 9654, 5480, 9000, 4857, 7289, 8108, 7899, 4582]
            },
            {
                name: "Average Contacts Lifetime Value",
                type: "line",
                data: [3000, 8000, 2000, 3000, 5000, 6000, 7840, 9654, 5480, 9000, 4857, 7289]
            }
        ],
        allmonths: [
            {
                name: "Customer Lifetime Value",
                type: "column",
                data: [5480, 9000, 4857, 7289, 8108, 7899, 4582, 3000, 3000, 5000, 6000, 7840, 9654, 5480, 9000, 4857, 7289, 8108, 7899, 4582]
            },
            {
                name: "Average Contacts Lifetime Value",
                type: "line",
                data: [5000, 6000, 7840, 9654, 5480, 9000, 4857, 7289, 3000, 8000, 2000, 3000, 5000, 6000, 7840, 9654, 5480, 9000, 4857, 7289]
            }
        ]
    }
    const options = {
        chart: {
            height: 350,
            type: "line",
            parentHeightOffset: 30,
            toolbar: {
                show: false
            }
        },
        stroke: {
            width: [0, 4],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '30%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
        ],
        xaxis: {
            type: "category",
            title: {
                text: "Months",
                style: {
                    fontSize: '14px',
                    fontWeight: 500
                }
            },
        },
        yaxis:
        {
            seriesName: "Customer Lifetime",
            title: {
                text: "Amount",
                style: {
                    fontSize: '14px',
                    fontWeight: 500
                }
            },
            labels: {
                formatter: (value) => {
                    return "$" + value;
                }
            }
        },
        tooltip: {
            shared: true
        }
    }

    return (
        <Card className="pb-2 px-1">
            <CardHeader className="border-bottom">
                <CardTitle>
                    <h4>
                        Customer Lifetime Value
                    </h4>
                </CardTitle>
                <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={rangeOptions}
                    value={currentRange}
                    onChange={(data) => {
                        setCurrentRange(data);
                    }}
                />
            </CardHeader>
            <div className="d-flex text-center justify-content-around align-items-center pt-1">
                <div>
                    <h2>20 Months</h2>
                    <p>Customer Lifetime</p>
                </div>
                <div>
                    <h2>$25114.01</h2>
                    <p>Lifetime Value</p>
                </div>
            </div>
            <ReactApexChart
                options={options}
                series={series[currentRange.value]}
                type="line"
                height={350}
            />
        </Card>
    );
};

export default LTVChart;
