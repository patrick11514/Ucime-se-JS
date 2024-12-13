import Logger from './lib/logger';
//logger for main messages
const l = new Logger('Export Example', 'cyan');

import { NAME } from './lib/export';
l.log(NAME);
//NAME = 'Lucka';

import idk from './lib/default';
l.log(idk);
idk.name = 'Květoslav';
//idk = {};
l.log(idk);
//idk = "ahoj";

import { lol } from './idk/testing';
lol();

import * as importy from './lib/export';

importy.pokemon.name = 'ahoj';

import { lol as lol2 } from './idk/testing';

lol2();

import neco, { sum } from './lib/mixed';
l.log(neco);
l.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

async function load(path: string) {
    return await import(path);
}

load('./lib/mixed').then(console.log);

import type { Number, CoolType } from './lib/types';
const num: Number<25> = 25;
l.log(num);
const cool = 'Cool Pepa' as CoolType;
l.log(cool);

import { getPokemon, type Pokemon } from './lib/typeMix';

const pokemon = getPokemon('Bulbasaur', 'Water');
const ownPokemon = {
    name: 'Charmander',
    type: 'Fire'
} satisfies Pokemon<string, 'Fire'>;

l.log(pokemon);
l.log(ownPokemon);
