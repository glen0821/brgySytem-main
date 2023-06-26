<script>
   
    import Login from "./ComponentsLib/Authentication/Login.svelte";
    import Nav from "./ComponentsLib/BoundComponents/Nav.svelte";

    
    //database calls and hooks
    import { auth } from "./db/firebase";
    import {onAuthStateChanged} from "firebase/auth";
    import { onMount } from "svelte";
    import { showNav } from "./ComponentsLib/BoundComponents/clickOutside";

    onMount(() => {
        onAuthStateChanged(auth, (userCred) => {
            if(userCred){
                showNav.set(true);
            }else{
                showNav.set(false);
            }
        })
    })

</script>

<main >
    {#if $showNav}
        <Nav />
    {:else}
        <Login />
    {/if}
    
</main>