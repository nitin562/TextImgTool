import React, { useEffect, useRef, useState } from "react";
import { Button, Popover } from "antd";
import Modal1 from "./Modal1";
import AskingBlocks from "./AskingBlocks";
export default function SpaceTile({ index, setarr }) {
  const [open, setopen] = useState(false);
  const onBtnClick = () => {
    setopen(true);
  };

  // Footer for popup
  const hoverContent = (
    <Button onClick={onBtnClick} className="text-white bg-slate-800/40">
      Insert
    </Button>
  );
  // Custom Insertion at new index
  const insertTextFunc = (index, content,html, setarr,count) => {
    setarr((prev) => {
      if (index === prev.length) {
        return [...prev, { type: 0, content,html,words:count }];
      }
      let newarr = [];

      for (let idx = 0; idx < prev.length; idx++) {
        if (idx === index) {
          newarr.push({ type: 0, content,html });
        }
        newarr.push(prev[idx]);
      }

      return newarr;
    });
  };
  // Insert img at index idx
  const insertImgFunc=(url)=>{
    setarr(prev=>{
      let newArr=[]
      if(index===prev.length){
        newArr=[...prev,{type:1,url}]
        return newArr
      }
      for(let idx=0;idx<prev.length;idx++){
        if(idx===index){
          newArr.push({type:1,url})
        }
        newArr.push(prev[idx])
      }
      return newArr
    })
  }
 
  return (
    <>
      <Popover
        content={hoverContent}
        title="Add New Block here"
        color="rgb(110 231 183)"
      >
        <div
          className="w-full h-4 cursor-pointer"
        >
          {/* hover space */}
        </div>
      </Popover>
      <AskingBlocks
        setArr={setarr}
        showModal={open}
        setshowModal={setopen}
        insertTextFunc={insertTextFunc}
        index={index}
        insertImgFunc={insertImgFunc}
        
      />
    </>
  );
}
