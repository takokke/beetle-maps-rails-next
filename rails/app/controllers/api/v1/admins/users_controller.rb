class Api::V1::Admins::UsersController < Api::V1::BaseController
    before_action: authenticate_admin!

    # 管理者の情報を取得
    def show
        render json: current_admin
    end

end