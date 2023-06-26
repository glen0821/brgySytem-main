<svelte:options accessors />

<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import logo from "../Images/logo.png";
    import { showSlider, navSelections } from './clickOutside.js'

    import dashboardIcon from "../Images/SVGs/dashb.svg";
    import listIcon from "../Images/SVGs/ListIcon.svg";
    import brgyID from "../Images/SVGs/brgyID.svg";
    import bgryCert from "../Images/SVGs/brgyCert.svg";
    import brgyClear from "../Images/SVGs/brgyClear.svg";
    import complaints from "../Images/SVGs/complaints.svg";

    import Button from "../GeneralComponents/Button.svelte";

    //slider list of menu
    let selections = ["Dashboard", "List of registered voters", "Barangay ID", "Barangay Certificate", "Barangay Clearance", "Complaints"];
    
    let newSelections = [
        {
            svg:  dashboardIcon,
            nav: "Dashboard" 
        },

        {
            svg: listIcon,
            nav: "List of registered voters"
        },

        {
            svg: brgyID,
            nav: "Barangay ID"
        },

        {
            svg: bgryCert,
            nav: "Barangay Certificate"
        },

        {
            svg: brgyClear,
            nav: "Barangay Clearance"
        },

        {
            svg: complaints,
            nav: "Complaints"
        }
    ]

    //value grabber from menu
    const getValue = (data) => {
        navSelections.set(data);
        showSlider.set(false);
    }

    //close slider
    const back = () => {
        showSlider.set(false);
    }  


</script>
{#if $showSlider}
    <div class="bg-guiColor absolute min-w-[20vw] top-0 bottom-0 border-slate-400 border-2" in:fly={{x:-200, duration:1000}}>
        
        <div class="p-4 flex justify-center items-center">
            <img src={logo} alt="loading" class="w-40"/>
        </div>

        <div class="flex justify-center">
            <p id="title" class="text-2xl text-white italic pb-10">SN3 Appointment System</p>
        </div>

        <div class="flex justify-center">
            <p class="text-white font-bold text-3xl p-4">Hello, CAPITAN</p>
        </div>

        <div class="border-2 m-2">
        {#each newSelections as value}
        <div class="p-2">
            <button class="flex gap-2 items-center w-full p-2 transition-all hover:scale-95 hover:bg-[#414339] active:scale-105"
            class:active={$navSelections === value.nav}
            on:click={() => {getValue(value.nav)}}
            >
                <img src={value.svg} alt="loading" class="w-5" />
                <p class="text-white font-semibold text-2xl">{value.nav}</p>
            </button>
        </div>
        {/each}
        </div>
        <div class="mt-5">
            <Button TITLE="Close" on:click={back}/>
        </div>
        
    </div>

    
{/if}

<style>
    .active{
        background-color: #414339;
    }
    #title{
        font-family: cursive;
    }
</style>