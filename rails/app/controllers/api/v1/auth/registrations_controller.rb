class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
    wrap_parameters false # registrationで囲まれるのを防ぐ
end
