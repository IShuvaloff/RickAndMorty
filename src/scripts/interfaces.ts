type TGender = 'Female' | 'Male' | 'Genderless' | 'unknown';
type TCharacterStatus = 'Alive' | 'Dead' | 'unknown';
type TCharacterType = string | null;

type TUrlLink = string;

interface ILink {
  name: string;
  url?: TUrlLink;
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

interface ICharacterInfo {
  count: number;
  pages: number;
  next?: TUrlLink;
  prev?: TUrlLink;
}

export interface ICharacterData {
  info: ICharacterInfo;
  results: [ICharacter];
}
