class Api::V1::PostsController < ApplicationController
    def show
        post = Post.find(params[:id])
        render json: post, methods: [:image_url]
    end


    private

    def posts_parameter
        
    end
end
