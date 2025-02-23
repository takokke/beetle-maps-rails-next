import { FavoriteType } from './Favorite'

export type PostType = {
  id: number
  creatureName: string
  caption: string
  latitude: number
  longitude: number
  address: string
  discoverDate: string
  imageUrl: string
  favorites: FavoriteType[]
  favoritesCount: number
  user: {
    id: number
    name: string
  }
}
