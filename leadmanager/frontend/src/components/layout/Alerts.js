import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Alerts() {
  const stateErrors = useSelector((state) => state.errors);
  const stateMessages = useSelector((state) => state.messages);
  useEffect(() => {
    if (stateErrors.msg.name) toast(`Name: ${stateErrors.msg.name}`);
    if (stateErrors.msg.email) toast(`Email: ${stateErrors.msg.email}`);
  }, [stateErrors]);

  useEffect(() => {
    if (stateMessages.leadAdded) toast(`${stateMessages.leadAdded}`);
    if (stateMessages.leadDeleted) toast(`${stateMessages.leadDeleted}`);
  }, [stateMessages]);

  return <Toaster />;
}
