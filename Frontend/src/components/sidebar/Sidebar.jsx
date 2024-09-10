import React from "react";
import Searchinput from "./Searchinput";
import List_chats from "./List_chats";
import Footer_logout from "./Footer_logout";

const Sidebar = () => {
  return (
    <div>
      <div className="border-r border-slate-500 p-4 flex flex-col ">
        <Searchinput />
        <div className="divider px-3"></div>
        <List_chats />
        <Footer_logout />
      </div>
    </div>
  );
};

export default Sidebar;
