class Api::V1::FavoritesController < Api::V1::BaseController
    before_action :authenticate_user!, only: [:create, :destroy]

    def create
        post = Post.find(params[:post_id])

        # いいねが押されていないかチェック
        unless post.favorited_by?(current_user) then
            post.favorites.create!(user_id: current_user.id)
            render json: {message: "投稿にいいねをしました"}, status: :created #201
        else
            render json: {message: "すでにいいねをしています"}, status: :bad_request #400
        end
    end

    def destroy
        post = Post.find(params[:post_id])
        favorite = post.favorites.find_by(user_id: current_user.id)

        if favorite.present? then
            favorite.destroy!
            render status: :no_content #204
        else
            render json: {message: "この投稿にいいねしていません"}, status: :bad_request #400
        end
    end
end
