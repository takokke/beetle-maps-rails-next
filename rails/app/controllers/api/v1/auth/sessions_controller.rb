class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
    wrap_parameters false # sessionで囲まれるのを防ぐ
end
