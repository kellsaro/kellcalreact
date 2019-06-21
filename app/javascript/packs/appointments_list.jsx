import React from 'react'
import { Appointment } from './appointment'
import PropTypes from 'prop-types'

export const AppointmentsList = ({appointments}) =>
  <div>
    { appointments.map(function(appointment, index){
        return (
          <Appointment key={index} appointment={appointment} />
        );
    })}
  </div>

AppointmentsList.propTypes = {
  appointments: PropTypes.array
}