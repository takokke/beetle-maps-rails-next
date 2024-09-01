class Api::V1::PostsController < ApplicationController
    include Pagination

    def show
        post = Post.find(params[:id])
        render json: post
    end

    def index
        posts = Post.all.page(params[:page] || 1).per(6)
        render json: posts, meta: pagination(posts), adapter: :json
    end
    
end
