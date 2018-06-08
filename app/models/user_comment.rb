class UserComment < ApplicationRecord
  def self.comments
    comments = []
    UserComment.all.order('created_at desc').group_by { |x| x.ip_address }.each do |k, v|
      user_comments = [v.first]
      v.each { |comment| user_comments << comment if (user_comments.last.created_at - comment.created_at).to_i.abs > 10 }
      comments << user_comments
    end
    comments.flatten
  end
end
