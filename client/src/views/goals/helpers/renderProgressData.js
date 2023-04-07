export const renderStatus = (row) =>
{
    if (row.type === "habit") {
        if (row.actionPlans.length >= row.repetition) {
            return ("Completed")
        }
        return (row.actionPlans.length + "/" + row.repetition)
    }
    if (row.type === "target") {
        if (row.progressType==="CurrentProgress")
        {
            if(row.measureTo<=row.currentProgress)
            {
                return("Completed")
            }
            else
            {
                return(row.currentProgress+"/"+row.measureTo+" "+row.measureLabel)
            }
            
        }
   }
}

export const renderProgress = (row,type) => {
    try {
        if (row.type === "habit") {
            const upperValue = parseInt(row.repetition);
            const lowerValue = parseInt(row.actionPlans.length);
            const per = parseInt((lowerValue / upperValue) * 100);
            if (per === 0) {
                return (0)
            }
            if (per > 100) {
                return (100)
            }
            else {
                return (per)
            }
        }
        if (row.type === "target") {
            if (row.progressType==="CurrentProgress")
            { 
                const lowervalue= parseInt(row.currentProgress);
                const uppervalue= parseInt(row.measureTo);
                const per=parseInt((lowervalue/uppervalue)*100);

                return(per)
            }
       }
    }
    catch (error) {

        return (0)
    }
}