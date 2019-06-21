import React from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime'
import { Label } from './label'

export default class AppointmentForm extends React.Component {

  handleChange = (e) => {
    const fieldName = 'title';
    const fieldValue = e.target.value;
    this.props.onUserInput(fieldName, fieldValue);
  }	

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  handleAptTime = (e) => {
    const fieldName = 'apt_time';
    const fieldValue = e.toDate();
    this.props.onUserInput(fieldName, fieldValue);
  }

  render(){
    let inputProps = {
      name: 'apt_time'
    };

    return (
      <div>
        
	      <Label label='Enter a title, date and time' />    

        <form onSubmit={ this.handleSubmit } >
          <input name='title' 
                 type='text' 
                 placeholder='Appointment Title' 
                 value={this.props.title.value} 
                 onChange={ this.handleChange } />
          
          <Datetime input={false}
                    open={true}
                    inputProps={inputProps} 
                    value={this.props.apt_time.value}
                    onChange={ this.handleAptTime } />

          <input  type='submit' 
                  value='Make Appointment'
                  className='submit-button'
                  disabled={!this.props.formValid} />
        </form>	  
      </div>	  
    );
  }
}
