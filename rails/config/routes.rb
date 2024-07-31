Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth",  controllers: {
        registrations: 'api/v1/auth/registrations', 
        sessions: 'api/v1/auth/sessions'
      }

      mount_devise_token_auth_for 'Admin', at: 'admin_auth', controllers: {
        registrations: 'api/v1/admins/auth/registrations',
        sessions: 'api/v1/admins/auth/sessions'
      }
      # as :admin do
      #   # Define routes for Admin within this block.
      # end

      resources :posts, only: [:show, :index]
      resource :map, only: [:show]
      namespace :current do
        resource :user, only: [:show] # current_userを返す
        resources :posts, only: [:create, :update, :destroy]
      end

      namespace :admins do
        resource :user, only: [:show] # current_adminを返す
        resources :posts, only: [:destroy]
      end
    end
  end
end
