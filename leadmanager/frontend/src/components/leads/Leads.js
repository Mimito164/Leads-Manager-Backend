import React, { Component, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLead, getLeads } from "../../redux/slices/leads";
import { createMessage } from "../../redux/slices/messages";
// import PropTypes from "prop-types";
// import { getLeads } from "../../actions/leads";

export default function Leads() {
  const leads = useSelector((state) => state.leads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeads());
  }, []);

  function handleDeleteLead(id) {
    dispatch(createMessage({ message: "Lead has been deleted" }));
    dispatch(deleteLead(id));
  }

  return (
    <Fragment>
      <h2>Leads</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th />
            {/* <th /> */}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.message}</td>
              <td>
                <button
                  onClick={() => handleDeleteLead(lead.id)}
                  className='btn btn-danger btn-sm'
                >
                  Delete
                </button>
              </td>
              {/* <th /> */}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
