class Post < ApplicationRecord
    include Rails.application.routes.url_helpers

    has_one_attached :image # 画像つき
    belongs_to :user

    validates :creature_name, presence: true
    validates :image, presence: true
    validates :address, presence: true
    validates :latitude, presence: true
    validates :longitude, presence: true
    validates :discover_date, presence: true

    def image_url
        # 紐づいている画像のURLを取得する
        image.attached? ? url_for(image) : nil
    end
end
