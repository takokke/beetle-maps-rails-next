import { FavoriteType } from './Favorite'

export type PostCardProps = {
  id: number
  imageUrl: string
  creatureName: string
  address: string
  discoverDate: string
  onDelete: (id: number) => void
  favoritesCount: number
  favorites: FavoriteType[]
  user: {
    id: number
    name: string
  }
}
