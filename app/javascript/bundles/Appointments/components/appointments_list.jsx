import React from 'react'
import { Appointment } from './appointment'

export const AppointmentsList = ({appointments}) =>
  <div>
    { appointments.map(function(appointment, index){
        return (
          <Appointment key={index} appointment={appointment} />
        );
    })}
  </div>

