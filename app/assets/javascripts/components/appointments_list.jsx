function AppointmentsList(props){
  return (
    <div>
      { props.appointments.map(function(appointment, index){
          return (
            <Appointment key={index} appointment={appointment} />
          );
      })}
    </div>
  );
}
