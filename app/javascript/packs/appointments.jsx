import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AppointmentForm from './appointment_form';
import { AppointmentsList } from './appointments_list';
import update from 'immutability-helper';
import { FormErrors } from './form_errors';
import { Messages } from 'primereact/messages';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import moment from 'moment';

export default class Appointments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: { value: '', valid: false },
      apt_time: { value: '', valid: false },
      formValid: false
    }
  }
 
  handleUserInput = (fieldName, fieldValue) => {

    const newFieldValue = update(this.state[fieldName], 
                                  { value: {$set: fieldValue},
                                    valid: {$set: this.isValidField(fieldName, fieldValue) }
                                  });

    this.setState({ [fieldName]: newFieldValue }, this.validateForm);
  }

  isValidField = (fieldName, fieldValue) => {
    let validField = false;

    switch(fieldName){
      case 'title':
        validField = (fieldValue !== null && fieldValue.trim().length > 2); 
      break;
      case 'apt_time':
        validField = (moment(fieldValue).isValid() && moment(fieldValue).isAfter());
      break;
      default:
      break;
    }
    
    return validField;
  }

  validateForm = () => {
    this.setState({ formValid: (this.state.title.valid && this.state.apt_time.valid) })
  }

  handleSubmit = () => {
    const appointment = {
      title: this.state.title.value,
      apt_time: this.state.apt_time.value
    }

    const messages = []
    let typeOfMessage = '';

    $.post('/appointments', { appointment: appointment })
     .done( (data) => {
       this.addNewAppointment(data);
       messages.push("Appointment added succesfully");
       typeOfMessage = 'success';
     })
     .fail( (response) => { 
       const formErrors = response.responseJSON

       Object.keys(formErrors)
             .map((formErrorField) => {
               formErrors[formErrorField].map((error) => {
                 messages.push(formErrorField + ": " + error)    
               })
             })
       typeOfMessage = 'error';
     });

     this.displayMessages(messages, typeOfMessage);  
  }

  displayMessages = (messages, severity) => {
    for(let i in messages){
      this.messages.show({
        severity: severity, 
        summary: severity[0].toUpperCase().concat(severity.slice(1)), 
        detail: messages[i],
        closeable: false,
        sticky: true});
    }
  }

  addNewAppointment = (appointment) => {
    const appointments = update(this.state.appointments, { $push: [appointment] });
    this.setState({ 
      appointments: appointments,
      title: { value: '', valid: false },
      apt_time: { value: '', valid: false },
      formValid: false
    });
  }

  render = () => {
    return (
      <div>
        <h2>Make a new appointment</h2>
        <Messages ref={(el) => this.messages = el}></Messages>
        <AppointmentForm title={this.state.title.value} 
	                       apt_time={this.state.apt_time.value}
                         onUserInput={this.handleUserInput}
                         onFormSubmit={this.handleSubmit}
                         formValid={this.state.formValid} />

        <h2>Appointments</h2>                 
        <AppointmentsList appointments={ this.state.appointments.sort((a, b) => new Date(a.apt_time) - new Date(b.apt_time)) } />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('appointments_data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <Appointments appointments={data} />,
    document.body.appendChild(document.createElement('div'))
  )
})
