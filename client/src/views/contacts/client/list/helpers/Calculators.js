export const decideColor = (attendanceSchemes, item) => {
    let list = [];
    if (attendanceSchemes.length) {
        list = [...attendanceSchemes]
        const match = list.find(x => {
            const upperLimit = x.upperLimit;
            const lowerLimit = x.lowerLimit;
            if (item >= lowerLimit && item <= upperLimit) {
                return (x)
            }
        })
        if (match) {
            return (
                <div style={{ width: "30px", height: "30px", backgroundColor: match.colorCode }} className="d-flex justify-content-center align-items-center rounded-circle">
                    <span className="text-white">{item}</span>
                </div>
            )
        }
        else {
            return (
                <div style={{ width: "30px", height: "30px" }} className="d-flex justify-content-center align-items-center rounded-circle bg-light-warning">
                    <span>{item}</span>
                </div>
            )
        }
    }
    else
    {
        return (
            <div style={{ width: "30px", height: "30px" }} className="d-flex justify-content-center align-items-center rounded-circle bg-light-warning">
                <span>{item}</span>
            </div>
        )

    }
}