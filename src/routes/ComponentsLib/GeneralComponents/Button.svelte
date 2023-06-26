<svelte:options accessors />
<script>
    export let TITLE = "Overide title";
    export let LOADING = false;
    export let COLOR = "bg-btnColor";
</script>


<button class="w-full p-2 {COLOR} active:bg-blue-300 transition-all hover:scale-95 active:scale-110 rounded-lg text-white font-bold"
on:click
>
    {#if LOADING}
        <div class="flex justify-center items-center gap-2">
            <div class="w-4 h-4 border-4 border-l-white border-r-white rounded-full animate-spin"></div>
            <div class="">Logging</div>
        </div>
        
    {:else}
        {TITLE}
    {/if}
</button>