import React from 'react'
//import moment from 'moment'
import { formatedDate } from './utils'
import PropTypes from 'prop-types'

export const Appointment = ({ appointment }) =>
  <div className='appointment'>
    <h3>{ appointment.title }</h3>
    <p>{ formatedDate(appointment.apt_time) }</p>
  </div>

Appointment.propTypes = {
  appointment: PropTypes.shape({
    title: PropTypes.string,
    apt_time: PropTypes.string
  }).isRequired
}
