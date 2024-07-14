class PostSerializer < ActiveModel::Serializer
  attributes :id, :creature_name, :caption, :latitude, :longitude, :address, :discover_date, :image_url # image_urlで画像urlを返す
  belongs_to :user, serializer: UserSerializer
end
