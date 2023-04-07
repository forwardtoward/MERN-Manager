import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';
import moment from 'moment';

const Calendar = ({ toggleHabitRecord, task }) => {
    let data = task?.actionPlans || []

    const generateDates = () => {
        let datesArray = []
        for (let i = 0; i < task.repetition; i++) {
            const createdDate = new Date(task?.createdAt)
            createdDate.setDate(createdDate.getDate() + i)
            const superDate = moment(createdDate).format("MM-DD-YYYY")
            const matchedData = data.find(x => {
                const d = new Date(x.date)
                if (`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}` === `${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`) {
                    return x
                }
            })
            if (matchedData) {
                const matchedDate = new Date(matchedData.date)
                const foundDate = moment(matchedDate).format("MM-DD-YYYY")
                datesArray.push({ date: foundDate, status: 'done' })
            }
            else {
              
                if(superDate>=moment(new Date()).format("MM-DD-YYYY"))
                {
                    superDate===moment(new Date()).format("MM-DD-YYYY")?
                    datesArray.push({ date: superDate, status: 'today' }):
                    datesArray.push({ date: superDate, status: 'within' })
                }
                else
                {
                    datesArray.push({ date: superDate, status: 'missing' })
                }
               
            }
        }
        data = datesArray

    }
    task && generateDates()
 
    // ** State
    const [monthDate, setMonthDate] = useState(new Date())

    return (
        <>
            <CalendarHeader monthDate={monthDate} setMonthDate={setMonthDate} />
            <CalendarTable year={monthDate.getFullYear()} month={monthDate.getMonth()} data={data} toggleHabitRecord={toggleHabitRecord} task={task}/>
        </>
    )
}

export default Calendar;