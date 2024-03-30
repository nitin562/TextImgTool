import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Popover } from "antd";
import SpaceTile from "./SpaceTile";
import Drawer1 from "./Drawer1";
import { useDrag, useDrop } from "react-dnd";
export default function DisplayText({ data, index, setarr }) {
  const refCard = useRef();
  // const refDrag=useRef()
  // const [isDragging, setisDragging] = useState(false)
  const [popOverVisible, setPopOverVisible] = useState(true);
  const [{ isDragging }, refDrag] = useDrag(
    () => ({
      type: "Card",
      item: { index },
      collect: (monitor) => {
        return { isDragging: monitor.isDragging() };
      },
    }),
    [index]
  );
  const [{ isOver }, refDrop] = useDrop(() => {
    return {
      accept: "Card",
      drop: (item, monitor) => {
        moveCard(item.index);
      },
      collect: (monitor) => {
        return { isOver: monitor.isOver() };
      },
    };
  });
  const HandleMouseEnter = () => {
    if (isDragging) {
      setPopOverVisible(false);
    } else {
      setPopOverVisible(true);
    }
  };
  const HandleMouseOut = () => {
    setPopOverVisible(true);
  };
  const moveCard = (draggedIndex) => {
    setarr((prev) => {
      let Data = prev[draggedIndex];
      let newArr = [];
      for (let idx = 0; idx < prev.length; idx++) {
        if (idx === index) {
          newArr.push(Data);
        }
        if (idx === draggedIndex) {
          continue;
        }
        newArr.push(prev[idx]);
      }

      return newArr;
    });
  };

  const [open, setopen] = useState(-1);

  const onEdit = () => {
    setopen(1);
  };
  // Custom edit and save
  const CustomEdit = (index, content, html, ChangeArr) => {
    //data-text string
    console.log(content, html);
    ChangeArr((prev) => {
      let newArr = [...prev];

      newArr[index].content = content;
      newArr[index].html = html;
      console.log(newArr);

      return newArr;
    });
  };
  // Delete text block
  const onDelete = () => {
    setarr((prev) => {
      return prev.filter((element, idx) => {
        return idx !== index;
      });
    });
  };
  // Footer content
  const HoverContent = (
    <div className="w-full flex justify-between">
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete} danger={true}>
        Delete
      </Button>
    </div>
  );

  useEffect(() => {
    refCard.current.innerHTML = data.html;
  }, [data.html,popOverVisible]);
  return (
    <div className="w-full ">
      <SpaceTile index={index} setarr={setarr} />
      <div
        className="w-full"
        onDrag={() => setPopOverVisible(false)}
        onMouseEnter={HandleMouseEnter}
        ref={(node) => refDrag(refDrop(node))}
        onMouseDown={HandleMouseOut}
      >
        {popOverVisible && (
          <Popover content={HoverContent} title="Customize Text Block">
            <Card
              className=" cursor-pointer bg-transparent border-[1px] rounded-lg border-transparent hover:bg-slate-500/20 text-lg  text-white"
              style={{
                opacity: isDragging ? 0.5 : 1,
                border: isOver ? "0.1rem dashed #fff" : "",
                fontFamily: "Times new Roman",
              }}
            >
              {/* <p className='break-words text-wrap'>{data.data}</p> */}
              <span
                style={{
                  userSelect: "none",
                  textShadow: isOver ? "0 0 0.5rem rgb(255,255,255,0.9)" : "",
                }}
                ref={refCard}
              ></span>
            </Card>
          </Popover>
        )}
        {!popOverVisible && (
          <Card
            className=" cursor-pointer bg-transparent border-[1px] rounded-lg border-transparent hover:bg-slate-500/20 text-lg  text-white"
            style={{
              opacity: isDragging ? 0.5 : 1,
              border: isOver ? "0.1rem dashed #fff" : "",
              fontFamily: "Times new Roman",
            }}
          >
            {/* <p className='break-words text-wrap'>{data.data}</p> */}
            <span
              style={{
                userSelect: "none",
                textShadow: isOver ? "0 0 0.5rem rgb(255,255,255,0.9)" : "",
              }}
              ref={refCard}
            ></span>
          </Card>
        )}
      </div>
      <SpaceTile index={index + 1} setarr={setarr} />
      <Drawer1
        key={index}
        index={index}
        setarr={setarr}
        open={open != -1}
        setopen={setopen}
        textfunc={CustomEdit}
        CustomText={data.content}
      />
    </div>
  );
}
