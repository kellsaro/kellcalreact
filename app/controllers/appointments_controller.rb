# Controller for base route /appointments/...
class AppointmentsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    find_appointments
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new(appointment_params)

    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocesable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:title, :apt_time)
  end

  def find_appointments
    @appointments = Appointment.order('apt_time ASC')
  end
end
