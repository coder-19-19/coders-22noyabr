import {useEffect, useState} from "react";

const Countdown = () => {
    const [value, setValue] = useState(5)
    const [isOpen,setIsOpen] = useState(false)

    useEffect(() => {
        if(isOpen) {
            const interval = setInterval(() => {
                setValue((prev) => {
                    if(prev === 1) {
                        clearInterval(interval)
                    }
                    return prev - 1
                })
            },1000)
        }
    },[isOpen])

    return (
        <div>
            <div>Time : {value}</div>
            <button onClick={() => setIsOpen(true)}>Start</button>
        </div>
    )
}

export default Countdown
