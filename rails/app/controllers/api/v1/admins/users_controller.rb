class Api::V1::Admins::UsersController < Api::V1::BaseController

    def show 
        render json: current_admin
    end

end