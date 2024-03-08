import React, { useEffect, useState } from 'react'

const RandomNumber = () => {
    const [number, setNumber] = useState(0);
    useEffect(()=>{
        setInterval(()=>{
            setNumber(number+1);
        },1000)
    },[])
  return (
    <div>{number}</div>
  )
}

export default RandomNumber