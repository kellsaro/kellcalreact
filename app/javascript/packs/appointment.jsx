import React from 'react'
//import moment from 'moment'
import { formatedDate } from './utils'

export const Appointment = ({ appointment }) =>
  <div className='appointment'>
    <h3>{ appointment.title }</h3>
    <p>{ formatedDate(appointment.apt_time) }</p>
  </div>

