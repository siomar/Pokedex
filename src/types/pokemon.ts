export type PokemonList = {
  name: string;
  url: string;
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Pokemon = {
  id: number;
  name: string;
  abilities: Ability[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  species: PokemonList;
  weight: number;
  height: number;
};
