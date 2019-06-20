const AppointmentsList = ({appointments}) =>
  <div>
    { appointments.map(function(appointment, index){
        return (
          <Appointment key={index} appointment={appointment} />
        );
    })}
  </div>

