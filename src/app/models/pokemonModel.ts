export type Stat = {
    base_stat: number,
    effort?: number,
    stat: {name: string,url?: string}
  };
  
  export type Ability = {
    ability: {name: string,url?: string},
    is_hidden?: boolean,
    slot?: number
  };
  
  export type Type = {
    slot?: number,
    type: {name: string,url?: string}
  };
  
  export type IPokemon = {
    name: string,
    id: number,
    sprites: {front_default: string,back_default: string,front_shiny: string;back_shiny: string},
    stats?: Stat[],
    abilities?: Ability[],
    weight?: number,
    height?: number,
    types: Type[]
  };

  export type IBasePkm = {
    name: string;
    url: string;
  }
  export interface PokemonRes {
    results: IBasePkm[];
  }