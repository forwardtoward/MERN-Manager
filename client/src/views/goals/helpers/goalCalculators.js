export const goalProgress = (item) => {
    if (item.length>0) {
        let count=0
        for(let i=0;i<item.length;i++)
        {
            const report= item[i].status;
            if(report==="Complete")
            {
                count=count+1
            }
        }
        return(count)
    }
    else
    {
        return("-")
    }
}
export const calculateScore=(item)=>
{
    if (item.length>0) {
        let count=0
        for(let i=0;i<item.length;i++)
        {
            const report= item[i].status;
            if(report==="Complete")
            {
                count=count+1
            }
        }
        return(count+"/"+item.length)
    }
    else
    {
        return("-")
    }
}
export const calculatePerGoal=(item,cat)=>
{
   try {
        if (item.length>0) {
            let count=0
            for(let i=0;i<item.length;i++)
            {
                const report= item[i].status;
                if(report==="Complete")
                {
                    count=count+1
                }
            }
            const per=(parseInt(count)/parseInt(item.length))*100
            const fPer=parseInt(per,10)
            if(cat==="chart")
            {
                return([fPer])
            }
            else
            {
                return(fPer)
            }
        }
        else
        {
            return("-")
        }
    }
    catch
    {
        if(cat==="chart")
        {
            return([0])
        }
        else
        {
            return("-")
        }
    }

}
