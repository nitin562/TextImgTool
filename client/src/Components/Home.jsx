import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Nav from "./Nav";

import DisplayText from "./DisplayText";
import AskingBlocks from "./AskingBlocks";
import DisplayImage from "./DisplayImage";
export default function Home() {
  // States
  const [showModal, setshowModal] = useState(false);
  const [arr, setArr] = useState([]);
  const onBtnFirstClick = () => {
    setshowModal(true);
  };

  return (
    <div
      className="bg-black w-screen h-screen overflow-hidden flex flex-col"
      style={{
        justifyContent: arr.length!==0 ? "flex-start" : "center",
        alignItems: arr.length!==0 ? "flex-start" : "center",
      }}
    >
      {/* Center Btn */}
      {arr.length===0 && (
        <Button
          onClick={onBtnFirstClick}
          className="text-white w-fit border-2 text-2xl h-fit font-thin"
        >
          Add a Block
        </Button>
      )}
      {/* NavBar display */}
      {arr.length!==0 && <Nav showModal={setshowModal} setArr={setArr} />}
      {/* Block display */}

      {arr.length !== 0 && <div className="w-full flex-1 overflow-y-auto  p-4 scrollbar overflow-x-hidden">
        
          {arr.map((e, i) => {
            if (e.type === 0) {
              return <DisplayText key={i} index={i} data={e} setarr={setArr} />;
            } else {
              return (
                <DisplayImage key={i} index={i} url={e.url} setarr={setArr}/>
              );
            }
          })}
      </div>}
      <AskingBlocks arr={arr} setArr={setArr} setshowModal={setshowModal} showModal={showModal} />
    </div>
  );
}
