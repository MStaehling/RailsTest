class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  def angular
    render 'layouts/application'
end
  protect_from_forgery with: :exception
  respond_to :json
end
