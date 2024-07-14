class PostSerializer < ActiveModel::Serializer
  attributes :id, :creature_name, :caption, :latitude, :longitude, :address, :discover_date
  belongs_to :user, serializer: UserSerializer
end
