function Appointment(props){
  return (
    <div className='appointment'>
      <h3>{props.appointment.title}</h3>
      <p>{formatedDate(props.appointment.apt_time)}</p>
    </div>
  );
}
