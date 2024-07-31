class Api::V1::Admins::Auth::SessionsController < DeviseTokenAuth::SessionsController
    wrap_parameters false # sessionで囲まれるのを防ぐ
end
