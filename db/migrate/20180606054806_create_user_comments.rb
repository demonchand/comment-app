class CreateUserComments < ActiveRecord::Migration[5.2]
  def change
    create_table :user_comments do |t|
      t.string :ip_address
      t.text :body

      t.timestamps
    end
  end
end
