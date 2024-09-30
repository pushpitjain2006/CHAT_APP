import React from "react";

const Message = () => {
  return (
    <div
      className={`chat 
 ${"chatClassName"} chat-end
    `}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="DP"
            // src={}
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white 
                ${"bubbleBgColor"} 
                ${"shakeClass"} 
                pb-2`}
      >
        {/* {message.message} */}YO BOy
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {/* {formattedTime} */}
        time
      </div>
    </div>
  );
};

export default Message;
