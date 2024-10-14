class Api::V1::PostsController < Api::V1::BaseController
    include Pagination
    before_action :authenticate_user!, only: [:index_for_signed_in_user]

    def show
        post = Post.find(params[:id])
        render json: post
    end

    def index
        posts = Post.all.page(params[:page] || 1).per(6).includes(:user, :favorites).with_attached_image
        render json: posts, meta: pagination(posts), adapter: :json
    end

end
