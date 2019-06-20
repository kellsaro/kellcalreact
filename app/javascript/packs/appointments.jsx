import React from 'react'
import ReactDOM from 'react-dom'
import AppointmentForm from './appointment_form'
import { AppointmentsList } from './appointments_list'
import update from 'immutability-helper'
import { FormErrors } from './form_errors';
import { Messages } from 'primereact/messages';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Appointments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: '',
      apt_time: '',
      formErrors: {}
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleUserInput(obj){
    this.setState(obj);
  }

  handleSubmit(){
    const appointment = {
      title: this.state.title,
      apt_time: this.state.apt_time
    }

    this.messages.clear();

    $.post('/appointments', { appointment: appointment })
     .done( (data) => this.addNewAppointment(data) )
     .fail( (response) => { 
       const formErrors = response.responseJSON
       console.log(formErrors); 
       this.setState({ formErrors: formErrors })

       const messages = []

       Object.keys(formErrors)
             .map((formErrorField) => {
               formErrors[formErrorField].map((error) => {
                 messages.push(formErrorField + ": " + error)    
               })
             })

       this.displayMessages(messages);
     });  
  }

  displayMessages(messages){
    for(let i in messages){
      this.messages.show({
        severity: 'error', 
        summary: 'Error', 
        detail: messages[i],
        closeable: false,
        sticky: true});
    }
  }

  addNewAppointment(appointment){
    const appointments = update(this.state.appointments, { $push: [appointment] });
    this.setState({ appointments: appointments });
  }

  render() {
    return (
      <div>
        <h2>Make a new appointment</h2>
        
        <Messages ref={(el) => this.messages = el}></Messages>
        <AppointmentForm title={this.state.title} 
	                       apt_time={this.state.apt_time}
                         onUserInput={this.handleUserInput}
                         onFormSubmit={this.handleSubmit} />

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

