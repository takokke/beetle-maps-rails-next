class Api::V1::Admins::PostsController < Api::V1::BaseController
  before_action :authenticate_admin!
  # 投稿を消すことができる

  def destroy
    post = Post.find(params[:id])
    post.destroy!
    render json: {message: "投稿を削除しました"}, status: :ok
  end

end
