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
