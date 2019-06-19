Rails.application.routes.draw do
  root 'appointments#index'
  resource :appointments, only: %i(index create)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
