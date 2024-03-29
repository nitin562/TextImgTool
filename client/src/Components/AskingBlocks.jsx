import React, { useState } from "react";
import Modal1 from "./Modal1";
import Drawer1 from "./Drawer1";
import Drawer2 from "./Drawer2";
export default function AskingBlocks({arr=null,setArr,showModal,setshowModal,insertTextFunc=null,insertImgFunc=null,index=null}) {
    const [blockType, setBlockType] = useState(-1)
  return (
    <>
      <Modal1
        open={showModal}
        setopen={setshowModal}
        length={arr?.length||1}
        setBlockType={setBlockType}
      />
      <Drawer1 open={blockType === 0} textfunc={insertTextFunc} setopen={setBlockType} setarr={setArr} index={index} />
      <Drawer2 open={blockType === 1} setopen={setBlockType} setarr={setArr} imgFunc={insertImgFunc} />
    </>
  );
}
