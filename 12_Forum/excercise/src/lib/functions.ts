import type { UserState } from '$/types/types';
import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import Swal, { type SweetAlertOptions } from 'sweetalert2';

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const SwalAlert = (data: SweetAlertOptions) => {
    if (!browser) {
        return {
            isConfirmed: false
        };
    }

    return Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 2000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
        ...data
    });
};

export const setUserState = (userState: UserState) => {
    setContext('userState', writable(userState));
};

export const getUserState = () => {
    return getContext<Writable<UserState>>('userState');
};
