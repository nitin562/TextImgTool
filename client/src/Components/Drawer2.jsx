import React, { useEffect, useRef, useState } from "react";
import { Drawer, Button, Spin } from "antd";
import inbox from "/inbox.png";
import DeleteIcon from "/delete.png"
export default function Drawer2({ open, setopen, setarr,imgFunc=null }) {
  
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgName, setimgName] = useState(imgFunc?"Select new Image":"No Image Selected");
  const inputRef = useRef();
  const onInsert = () => {
    if(imgFunc){
      imgFunc(imgUrl)
      setopen(-1)
      return
    }
    setarr(prev=>{
      return [...prev,{type:1,url:imgUrl}]
    })
    setopen(-1)
  };
  const onCancel = () => {
    setopen(-1)
  };
  const clickOnDragAndDrop = () => {
    inputRef.current.click();
  };
  const parseImage = (e) => {
    setImgUrl(null)
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];

      setimgName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      // Here you can handle the dropped file
    } else {
      setimgName("No File Selected, Try again");
    }
    setLoading(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setLoading(true);
    const files = e.dataTransfer.files;
    const fileTarget={target:{files}}
    parseImage(fileTarget)
  };
  const ondelete = () => {
    setImgUrl(null);
    setimgName("No File Selected");
  };
  return (
    <Drawer
      open={open}
      placement="bottom"
      className="p-2"
      footer={[
        <Button
          danger={true}
          className="float-right ml-4"
          key={2}
          onClick={onCancel}
        >
          Cancel
        </Button>,
        <Button type="primary" className="text-black float-right ml-4" disabled={!imgUrl} key={1} onClick={onInsert}>
          Insert
        </Button>,
      ]}
      title="Add Picture Block"
      closable={false}
    >
      <div
        className="w-full border-2 border-black hover:border-blue-400 h-[10rem] flex flex-col justify-center items-center p-6 hover:bg-sky-400/20 cursor-pointer rounded-lg"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={clickOnDragAndDrop}
      >
        <img src={inbox} className="h-full aspect-square" alt="icon" />
        <p className="text-md hover:text-emerald-600">
          Drag and drop here or select the picture
        </p>
      </div>
      {loading && <Spin />}
      {!loading && (
        <div className="my-1 text-md text-red-400 flex-wrap flex justify-between ">
          <p>{imgName}</p>
          {imgUrl && (
            <p
              className="rounded-lg p-1 hover:bg-red-400 hover:text-white cursor-pointer"
              onClick={ondelete}
            >
              <img src={DeleteIcon} alt="delete" className="p-1 w-[2rem] aspect-square" />
            </p>
          )}
        </div>
      )}
      <input ref={inputRef} onChange={parseImage} className="hidden" type="file" accept="image/*" />
    </Drawer>
  );
}
