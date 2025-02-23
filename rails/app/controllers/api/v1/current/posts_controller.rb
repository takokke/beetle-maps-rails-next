class Api::V1::Current::PostsController < Api::V1::BaseController
    before_action :authenticate_user!, only: [:create, :destroy]

    def create
        post = current_user.posts.create!(create_post_params)
        render json: post, status: :ok
    end

    def update
        post = current_user.posts.find(params[:id])
        post.update!(update_post_params)
        render json: post, status: :ok
    end

    def destroy
        post = current_user.posts.find(params[:id])
        post.destroy!
        render status: :no_content #204
    end

    private

    # Postモデルのストロングパラメータ
    def create_post_params
        params.require(:post).permit(:creature_name, :caption, :image, :address, :latitude, :longitude, :discover_date)
    end

    def update_post_params
        params.require(:post).permit(:creature_name, :caption, :address, :latitude, :longitude)
    end
end
