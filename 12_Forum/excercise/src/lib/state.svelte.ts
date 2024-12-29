import type { UserState } from '$/types/types';
import { getContext, setContext } from 'svelte';

type State = {
    userState: UserState;
};

let _state = $state<State>();

export const setState = (userState: UserState) => {
    _state = {
        userState
    };
    setContext('state', _state);
};

export const getState = () => {
    return getContext<State>('state');
};
