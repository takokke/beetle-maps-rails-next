class PostSerializer < ActiveModel::Serializer
  attributes  :id, :creature_name, :caption, :latitude, :longitude, :address, :discover_date, :favorites_count, :image_url
  
  belongs_to :user, serializer: UserSerializer
  belongs_to :favorites, serializer: FavoriteSerializer
end
