type TGender = 'Female' | 'Male' | 'Genderless' | 'unknown';
type TCharacterStatus = 'Alive' | 'Dead' | 'unknown';
type TCharacterType = string | null;

export type TSortValue = 'asc' | 'desc' | 'none';
export type TUrlLink = string;

export interface ILink {
  name: string;
  url?: TUrlLink;
}

export function isILink(obj: any): obj is ILink {
  return obj.name !== 'undefined';
}

export interface ICharacter {
  id: number;
  name: string;
  status: TCharacterStatus;
  species: string;
  type: TCharacterType;
  gender: TGender;
  origin: ILink;
  location: ILink;
  image: TUrlLink;
  url: TUrlLink;
  created: string;
}

export interface ICharacterInfo {
  count: number;
  pages: number;
  next?: TUrlLink;
  prev?: TUrlLink;
}

export interface ICharacterData {
  info: ICharacterInfo;
  results: [ICharacter];
}

export interface ICharacterInfoExtended {
  characters: number;
  pages: number;
  pageCurrent: number;
  pageNextUrl: TUrlLink;
  pagePrevUrl: TUrlLink;
  error: boolean;
  errorText: string;
  loading: () => boolean;
  loadingState: () => number;
}

export interface ICharacterSorts {
  gender: TSortValue;
  name: TSortValue;
  origin: TSortValue;
}
