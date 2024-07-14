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
      resources :posts, only: [:show]
    end
  end
end
