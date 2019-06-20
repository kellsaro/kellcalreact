const Appointment = ({appointment}) =>
  <div className='appointment'>
    <h3>{appointment.title}</h3>
    <p>{formatedDate(appointment.apt_time)}</p>
  </div>

