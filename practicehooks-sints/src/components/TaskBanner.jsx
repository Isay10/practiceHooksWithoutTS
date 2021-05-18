import React from "react";

export const TaskBanner = (props) => {
  return (
    <h4 className="bg-primary text-white text-center p-4">
      {props.userName}´s Task List {props.taskItems} tasks to do
    </h4>
    
  );
};