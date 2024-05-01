import React, {useEffect, useRef} from "react";

export default function Input() {
  const elementRef = useRef(null);

    const postData = () => {
        console.log(elementRef.current?.value)
    }

    useEffect(() => {
        console.log(elementRef.current?.value)
    },[elementRef.current])

  return (
    <div>
        <button onClick={postData}>Request Api</button>
        <input type="text" ref={elementRef}/>
    </div>
  );
}
