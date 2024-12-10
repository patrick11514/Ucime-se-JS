import Logger from './lib/logger';
//logger for main messages
const l = new Logger('Export Example', 'cyan');

import { NAME, obj } from './lib/export';
l.log(NAME);
//NAME = 'lol'; //error

import JMENO from './lib/default';
l.log(JMENO);

l.log(obj);
obj.isReal = true;
l.log(obj);

import * as all from './lib/export';
l.log(all.NAME);
l.log(all.obj);

import DEFAULT, { sum } from './lib/mixed';
l.log(DEFAULT);
l.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

import type { Number, CoolType } from './lib/types';
const num: Number<25> = 25;
l.log(num);
const cool = 'Cool' as CoolType;
l.log(cool);

import { getPokemon, type Pokemon } from './lib/typeMix';

const pokemon = getPokemon('Bulbasaur', 'Water');
const ownPokemon = {
    name: 'Charmander',
    type: 'Fire'
} satisfies Pokemon<string, 'Fire'>;

l.log(pokemon);
l.log(ownPokemon);
