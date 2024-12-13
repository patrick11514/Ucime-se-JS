type PokemonType = 'Grass' | 'Fire' | 'Hypnotic' | 'Void' | 'Water';
export type Pokemon<$Name, $Type extends PokemonType> = {
    name: $Name;
    type: $Type;
};

export const getPokemon = <$Name extends string, $Type extends PokemonType>(name: $Name, type: $Type): Pokemon<$Name, $Type> => {
    return {
        name,
        type
    };
};
