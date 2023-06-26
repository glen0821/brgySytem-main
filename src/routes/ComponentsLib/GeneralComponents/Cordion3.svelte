<script>
    import { fly, slide } from "svelte/transition";
    import Button from "../GeneralComponents/Button.svelte";
    import { cordionLogic } from "../BoundComponents/clickOutside";

    let showData = false;
    cordionLogic.subscribe(data => {
        showData = data
    })

    const toggleData = () => {
        showData = !showData;
    }

    export let cName = "Complete Name";
    export let address = "Complete Address";
    export let complaint = "What is the complaint?";
    export let location = "Location of incident";


</script>

<button class="w-full bg-blue-500 rounded-lg flex justify-center items-center"
on:click={toggleData}
>
    <p class="w-full text-left p-2 pl-5 text-white font-bold ">{cName}</p>
    <div class="mr-5">
        {#if !showData}
            <div class="w-4 h-4 border-b-4 border-r-4 border-black rotate-45" in:slide></div>
        {:else}
            <div class="w-4 h-4 border-t-4 border-l-4 border-black rotate-45" in:slide></div>
        {/if}
    </div>
</button>

{#if showData}
    <div class="bg-slate-300 rounded-lg m-2" in:slide>
        <div class="p-4">
            <p class="font-bold">Complete Name:</p>
            <p class="p-2" >{cName}</p>
            
            <p class="font-bold">Address:</p>
            <p class="p-2">{address}</p>
            
            <p class="font-bold">Complaint:</p>
            <p class="p-2">{complaint}</p>


            <p class="font-bold">Location of incident:</p>
            <p class="p-2">{location}</p>

        </div>
        <div class="flex gap-2 p-2">
            <Button TITLE="Delete" on:click/>
        </div>
        
    </div>
{/if}