import {useState} from "react";
import Card from "./card.jsx";

const CustomButton = () => {
  const [isOpen, setIsOpen] = useState(false)


  const toggle = () => {
    setIsOpen(!isOpen)
  }


  return <div>
    <button onClick={toggle}>Toggle collapse</button>
    {isOpen && <Card/>}
  </div>
};

export default CustomButton;
