import React from "react";
import Header_name from "./header_name";
import Footer_send from "./footer_send";
import Chats_body from "./chats_body";

const Message_container = () => {
  const no_chat_selected = false;
  if (no_chat_selected) {
    return <No_chat_selected />;
  }
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <Header_name />
      <Chats_body />
      <Footer_send />
    </div>
  );
};

export default Message_container;

const No_chat_selected = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-2xl">Select a chat to start messaging</p>
    </div>
  );
};
