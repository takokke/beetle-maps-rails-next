class ApplicationController < ActionController::API

        include DeviseTokenAuth::Concerns::SetUserByToken
        include DeviseHackFakeSession

        # devise_controllerの時のみ、configure_permitted_parametersを実行する
        before_action :configure_permitted_parameters, if: :devise_controller?

        protected

        def configure_permitted_parameters
                devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
        end
end
