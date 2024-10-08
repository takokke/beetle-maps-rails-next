class Api::V1::Current::UsersController < Api::V1::BaseController
    before_action :authenticate_user!

    # next.jsのCurrentUserFetchコンポーネントで使う
    def show
        render json: current_user
    end
end
