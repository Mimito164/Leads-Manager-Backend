import React, { Component } from "react";
import { connect, Connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../redux/slices/leads";
class Form extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  static porpTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = {
      name,
      email,
      message,
    };
    this.props.addLead(lead);
    this.setState({
      name: "",
      email: "",
      message: "",
    });
  };

  render() {
    const { name, email, message } = this.state;

    return (
      <div className='card card-body mt-4 mb-4'>
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='text'
              className='form-control'
              name='name'
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className='from-group'>
            <label>Email</label>
            <input
              type='email'
              className='form-control'
              name='email'
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className='form-group'>
            <label>Message</label>
            <textarea
              className='form-control'
              type='text'
              name='message'
              onChange={this.onChange}
              value={message}
            />
          </div>
          <div className='form-group mt-2'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
