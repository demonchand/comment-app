Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "user_comments#index"
  resources :user_comments, only: [:index, :create]
end
