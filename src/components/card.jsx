import {useEffect} from "react";

const Card = () => {

    useEffect(() => {
        return () => {
            localStorage.removeItem('name')
        }
    },[])

    return <div>Card</div>
}

export default Card
