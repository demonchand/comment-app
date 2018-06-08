class UserCommentsController < ApplicationController
  def index
    @user_comments = UserComment.comments
    @user_comment = UserComment.new
  end

  def create
    @user_comment = UserComment.new(user_comment_param)
    @user_comment.ip_address = request.remote_ip
    @user_comment.save
    @comments = UserComment.comments
  end

  private

  def user_comment_param
    params.require(:user_comment).permit(:body)
  end
end