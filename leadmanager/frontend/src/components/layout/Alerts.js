import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Alerts() {
  const stateErrors = useSelector((state) => state.errors);
  const stateMessages = useSelector((state) => state.messages);
  useEffect(() => {
    if (stateErrors.msg.name) toast(`Name: ${stateErrors.msg.name}`);
    if (stateErrors.msg.email) toast(`Email: ${stateErrors.msg.email}`);
    if (stateErrors.msg.non_field_errors)
      toast(`${stateErrors.msg.non_field_errors}`);
    if (stateErrors.msg.username)
      toast(`Username: ${stateErrors.msg.username}`);
    if (stateErrors.msg.password)
      toast(`Password: ${stateErrors.msg.password}`);
  }, [stateErrors]);

  useEffect(() => {
    if (stateMessages.leadAdded) toast(`${stateMessages.leadAdded}`);
    if (stateMessages.leadDeleted) toast(`${stateMessages.leadDeleted}`);
    if (stateMessages.passwordNotMach)
      toast(`${stateMessages.passwordNotMach}`);
  }, [stateMessages]);

  return <Toaster />;
}
