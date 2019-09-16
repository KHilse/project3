/// <reference types="react-scripts" />

export interface ImageTiles {
  image: string,
  artist: string
}

export interface ContentInt {
  refreshArtworks():void,
  user?: (string | null),
  artworks?: any[],
  current?: ({} | null),
}

export interface AppProps {
  user?: (string | null),
  artworks?: any[],
  current?: ({} | null),
  getArtworks?(): void,
  getUser?(): string
}

<<<<<<< HEAD
interface IPost {
  id: string;
  media_type: string;
  media_url: string;
  timestamp: string;
 }
=======
>>>>>>> f0cc07b5ab67d7da34c541ace257d94cec2a3118
export interface ITest {
  albumId: number,

}
