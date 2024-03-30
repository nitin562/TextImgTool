import React, { useCallback, useEffect, useState } from "react";
import { Button, Drawer, Input } from "antd";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function Drawer1({
  open,
  setopen,
  setarr,
  textfunc = null,
  index,
  CustomText = null,
}) {

  const [count, setcount] = useState(250);
  const [quill, setquill] = useState(null);
  let prevCount = 0;  //saving previous count in same namespace
  // On change text check word limit
  const onChangeText = (delta, oldDelta, source) => {
    if (source === "api") {
      return;
    }
    const text = quill.getText().trim();
    const wordCount = text.split(/\s+/).length;
    if (wordCount > 250) {
      // Remove excess text
      let appendText = text.split(/\s+/).slice(prevCount, 250).join(" ");
      oldDelta["ops"].push({ insert: appendText });
      quill.setContents(oldDelta);
      setcount(0);
      prevCount = 250;
      return;
    }
    setcount((prev) => {
      return 250 - wordCount;
    });
    prevCount = wordCount;
  };
  // Insert the text block
  const onInsert = () => {
    //if custom func is given then invoke
    if (textfunc !== null && index !== null && quill) {
      textfunc(index, quill.getContents(), quill.root.innerHTML, setarr);
      setopen(-1);
      return;
    }
    setarr((prev) => {
      return [
        ...prev,
        { type: 0, content: quill.getContents(), html: quill.root.innerHTML },
      ];
    });
    setopen(-1);
  };
  // oncancel
  const onCancel = () => {
    setopen(-1);
  };
  // Quill editor creation
  const RefTextEditor = useCallback((wrap) => {
    if (wrap === null) {
      console.log(open);
      return;
    }
    const textEditor = new Quill(wrap, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    
          ["clean"],
        ],
      },
    
    });
    setquill(textEditor);
    if(CustomText){
      textEditor.setContents(CustomText)
    }
    textEditor.root.style.background = "#fff";
    textEditor.root.style.fontSize = "1rem";
    textEditor.root.style.color = "#000";
  }, []);
  useEffect(() => {
    if (quill === null) {
      return;
    }
    quill.on("text-change", onChangeText);
  }, [quill]);
  useEffect(() => {
  
    if (open && quill) {
      if(CustomText){
        quill.setContents(CustomText)
      }
      else{
        quill.root.innerHTML=""
      }
    }
    
  }, [open,CustomText]);
  return (
    <div>
      <Drawer
      
        className="p-2 bg-slate-800/20"
        
        footer={[
          <Button
            danger={true}
            className="float-right ml-4"
            key={2}
            onClick={onCancel}
          >
            Cancel
          </Button>,
          <Button
            className="float-right ml-4"
            disabled={count === 250}
            key={1}
            onClick={onInsert}
          >
            Insert
          </Button>,
        ]}
        closable={false}
        placement="bottom"
        open={open}
        title="Enter Text Block"
      >
        <div ref={RefTextEditor}></div>
        
        <p className="text-red-500">Max Count is {count} characters</p>
      </Drawer>
    </div>
  );
}
