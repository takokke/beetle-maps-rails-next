class ApplicationController < ActionController::API

        # wrap_parameters false # registrationやsessionで囲まれるのを防ぐ

        include DeviseTokenAuth::Concerns::SetUserByToken
        include DeviseHackFakeSession
end
