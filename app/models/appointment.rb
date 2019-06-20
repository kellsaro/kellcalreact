class Appointment < ApplicationRecord
  validates_presence_of :title, :apt_time
  validate length: { minimum: 3 }
  validate :apt_time_cannot_be_in_the_past

  private

  def apt_time_cannot_be_in_the_past
    if appt_time.present? && appt_time < Time.now
      errors.add(:appt_time, "can't be in the past")
    end
  end
end
