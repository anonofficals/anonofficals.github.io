export interface CountryName {
  common: string;
  official: string;
}

export interface ISO {
  alpha2: string;
  alpha3: string;
  numeric: string;
}

export interface Flag {
  emoji: string;
  svg: string;
}

export interface Currency {
  name: string;
  code: string;
  symbol: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Country {
  name: CountryName;
  iso: ISO;
  flag: Flag;
  currency: Currency;
  callingCode: string;
  region: string;
  subregion: string;
  languages: string[];
  coordinates: Coordinates;
}

declare const countries: Country[];
export default countries;

