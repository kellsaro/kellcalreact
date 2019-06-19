class Appointments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: 'Team standup meeting',
      apt_time: 'Tomorrow at 9am'
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

    $.post('/appointments', { appointment: appointment })
     .done(function(data){
       this.addNewAppointment(this.state.appointments, data);
     }.bind(this));  
  }

  addNewAppointment(appointments, appointment){
    //let appointments = React.addons.update(this.state.appointments, {$push: [appointment]});
    //this.setState({ appointments: appointments });
    //this.setState({ appointments: appointments.push(appointment)});
  }

  render() {
    return (
      <div>
        <AppointmentForm title={this.state.title} 
	                       apt_time={this.state.apt_time}
                         onUserInput={this.handleUserInput}
                         onFormSubmit={this.handleSubmit} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    );
  }
}
