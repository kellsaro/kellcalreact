class AppointmentForm extends React.Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handleSubmit.bind(this);
    this.handleAptTime = this.handleAptTime.bind(this);
  }

  handleChange(e){
    let name = e.target.name;
    obj = {};
    obj[name]= e.target.value; 
    this.props.onUserInput(obj);
  }	

  handleSubmit(e){
    e.preventDefault();
    this.props.onFormSubmit();
  }

  handleAptTime(e){
    let name = 'apt_time';
    let obj = {};

    if(obj[name] = e.toDate()){
      this.props.onUserInput(obj);
    }
  }

  render(){
    let inputProps = {
      name: 'apt_time'
    };

    return (
      <div>
        <h2>Make a new appointment</h2>

	<Label label='Enter a title, date and time' />    

        <form onSubmit={ (e) => this.handleSubmit(e) } >
          <input name='title' 
                 type='text' 
                 placeholder='Appointment Title' 
                 value={this.props.title} 
                 onChange={ (e) => this.handleChange(e) } />
          
          <Datetime input={false}
                    open={true}
                    inputProps={inputProps} 
                    value={this.props.apt_time}
                    onChange={ (e) => this.handleAptTime(e) } />

          <input  type='submit' 
                  value='Make Appointment'
                  className='submit-button' />
        </form>	  
      </div>	  
    );
  }
}
