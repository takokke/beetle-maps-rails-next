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

    # image_urlで画像URLを返す
    def image_url
        image.attached? ? url_for(resized_image_variant) : nil
    end

    private

    # 画像の横幅を最大700pxに制限する
    def resized_image_variant
        image.variant(resize_to_limit: [700, nil]).processed
    end
end
