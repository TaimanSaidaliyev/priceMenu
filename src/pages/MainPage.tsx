import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  let navigate = useNavigate();

  const myArray = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" }
  ];

  const jsonArray = JSON.stringify(myArray);
  const url = `https://example.com/page?data=${encodeURIComponent(jsonArray)}`;
  
  const queryParams = new URLSearchParams(url);
  const jsonData = queryParams.get('data');
  // const parsedArray = JSON.parse(jsonData);
  useEffect(()=>{
    navigate("/login");
  },[])
  
  return (
    <div>
      {/* {parsedArray} */}
    </div>
  )
}
