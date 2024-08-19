export type PostType = {
    id : number;
    creatureName: string;
    caption: string;
    latitude: number;
    longitude: number;
    address: string;
    discoverDate: string;
    imageUrl: string;
    user: {
        name: string
    }
}