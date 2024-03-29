import { Button, Image, Popover } from "antd";
import React, { useEffect, useRef, useState } from "react";
import SpaceTile from "./SpaceTile";
import Drawer2 from "./Drawer2";
import leftIcon from "/left.png";
import centerIcon from "/center.png";
import rightIcon from "/right.png";

export default function DisplayImage({ index, url, setarr }) {
  const [open, setopen] = useState(-1);
 
  const [alignment, setalignment] = useState("center") //alignment for img
  // drag event
  const handleDrag = (e) => {
    e.preventDefault();
    sessionStorage.setItem("currIndex", index);
  };
  //open drawer
  const handleChange = () => {
    setopen(1);
  };
  // change image
  const handleImage = (url) => {
    setarr((prev) => {
      let newArr = [...prev];

      newArr[index].url = url;

      return newArr;
    });
  };
  //delete img
  const handleDelete = () => {
    setarr((prev) => {
      return prev.filter((e, i) => {
        return i !== index;
      });
    });
  };
  //footer content
  const content = (
    <div className="w-fit flex justify-between">
      <Button onClick={handleChange} className="border-black">Change</Button>
      <div className="px-2 mx-2 flex border-r-2 border-l-2 border-gray-500">
        <Button onClick={()=>setalignment("flex-start")}>
          <img
            className="h-full"
            src={leftIcon}
            alt="left"
            title="align-left"
          />
        </Button>
        <Button onClick={()=>setalignment("center")}>
          <img
            className="h-full"
            src={centerIcon}
            alt="left"
            title="align-left"
          />
        </Button>
        <Button onClick={()=>setalignment("flex-end")}>
          <img
            className="h-full"
            src={rightIcon}
            alt="left"
            title="align-left"
          />
        </Button>
      </div>
      <Button onClick={handleDelete} danger="true">
        Delete
      </Button>
    </div>
  );


  return (
    <>
      <SpaceTile index={index} setarr={setarr} />

      <div className="flex w-full border-[1px] overflow-hidden border-transparent hover:bg-slate-500/20 hover:border-white" style={{justifyContent:alignment}} onDrag={handleDrag} draggable>
        <Popover content={content} title="Customize Image Block">
          <div
            className="w-1/4 "
           
          >
            <Image src={url} className="border-2" />
          </div>
        </Popover>
      </div>
      <SpaceTile index={index + 1} setarr={setarr} />
      <Drawer2
        open={open === 1}
        setopen={setopen}
        setarr={setarr}
        imgFunc={handleImage}
      />
    </>
  );
}
