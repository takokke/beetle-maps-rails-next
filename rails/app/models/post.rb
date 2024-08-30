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

    # 画像をリサイズする
    def image_url
        if image.attached?
            image_variant = image.variant(resize_to_limit: [700, nil]).processed
            url_for(image_variant)
        else
            nil
        end
    end
end
