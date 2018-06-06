class UserComment < ApplicationRecord

  def self.comments
    comments = []
    UserComment.all.order("id desc").each do |comment|
      last_updated = comments.select { |x| x.ip_address == comment.ip_address }.last
      # Configured it for 10 sec
      comments << comment if last_updated.nil? or (last_updated.created_at - comment.created_at).to_i.abs > 10
    end
    comments
  end
end
