import { writable } from "svelte/store";


    let currentDate = new Date();

    // Get the individual components of the current date
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // January is 0, so we add 1
    let day = currentDate.getDate();

    // Format the date as desired (e.g., YYYY-MM-DD)
    export let formattedDate = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

//list of voters
export const showPrintModel = writable(false);

