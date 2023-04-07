export const generateDate = (date,adder) => {
    const d = new Date(date) 
    d.setDate(d.getDate()+parseInt(adder,10))

    return (
      <span>
        {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
      </span>
    );
  };