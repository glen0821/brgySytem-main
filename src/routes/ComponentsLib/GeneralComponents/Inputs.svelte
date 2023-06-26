<svelte:options accessors />

<script>


    export let PLACEHOLDER = "Overide placeholder";
    export let BINDTHIS = "";
    export let TITLE = "Overide title";
    export let TYPE = "text";
    export let COLOR = "black";

</script>


{#if TYPE === "text"}
    <p class="p-2 font-bold text-{COLOR}">{TITLE}</p>
    <input type="text" placeholder={PLACEHOLDER} bind:value={BINDTHIS} 
    class="w-full h-10 bg-slate-100 p-2 focus:outline-none "/>

{:else if TYPE === "email"}
    <p class="p-2 font-bold text-{COLOR}">{TITLE}</p>
    <input type="email" placeholder={PLACEHOLDER} bind:value={BINDTHIS} 
    class="w-full h-10 bg-slate-100 p-2 focus:outline-none "/>

{:else if TYPE === "password"}
    <p class="p-2 font-bold text-{COLOR}">{TITLE}</p>
    <input type="password" placeholder={PLACEHOLDER} bind:value={BINDTHIS} 
    class="w-full h-10 bg-slate-100 p-2 focus:outline-none "/>

{:else if TYPE === "number"}
<p class="p-2 font-bold text-{COLOR}">{TITLE}</p>
    <input type="number" placeholder={PLACEHOLDER} bind:value={BINDTHIS} 
    class="w-full h-10 bg-slate-100 p-2 focus:outline-none "/>

    {:else if TYPE === "date"}
<p class="p-2 font-bold text-{COLOR}">{TITLE}</p>
<input type="date"  bind:value={BINDTHIS} 
class="w-full h-10 bg-slate-100 p-2 focus:outline-none "/>

{:else if TYPE === "cordion"}
<p class="p-2 font-bold text-{COLOR}">{TITLE}</p>
<select class="w-full h-10 bg-slate-100 p-2 focus:outline-none" bind:value={BINDTHIS}>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
</select>
    

{/if}






