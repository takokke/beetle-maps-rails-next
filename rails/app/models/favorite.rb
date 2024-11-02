class Favorite < ApplicationRecord
    belongs_to :post, counter_cache: true
    belongs_to :user

    # ユーザーは１つの投稿に、１つしかいいねを作成できない
    validates :user_id, uniqueness: { scope: :post_id }
end
