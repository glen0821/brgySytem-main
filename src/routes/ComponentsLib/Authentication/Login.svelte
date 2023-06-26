<script>
    import loginLogo from "../Images/logo.png";
    import Inputs from "../GeneralComponents/Inputs.svelte";
    import Button from "../GeneralComponents/Button.svelte";

    //database calls and hooks
    import {auth, db} from "../../db/firebase";
    import {signInWithEmailAndPassword} from "firebase/auth";

    //loginStorages
    const loginStore = {
        email: "",
        password: "",
        showLoading: false,
        showErrorDOMmsg: "",
    }

    //login to system
    const login = async() => {
        loginStore.showLoading = true;
        await signInWithEmailAndPassword(auth, loginStore.email.BINDTHIS, loginStore.password.BINDTHIS).then((userCred) => {
            localStorage.setItem("uid", userCred.user.uid);
            loginStore.showLoading = false;
        }).catch(error => {
            loginStore.showLoading = false;
            loginStore.showErrorDOMmsg = error.code;
        })
    }

</script>

<div class="sm:max-w-[400px] mt-[15vh] mx-auto">
    <div class="p-10 flex flex-col gap-2 bg-guiColor m-2 rounded-lg">
        <div class="flex justify-center">
            <img src={loginLogo} alt="loading" class="w-[200px]"/>
        </div>
        <Inputs TYPE="email" PLACEHOLDER="Admin Email" TITLE="Email" bind:this={loginStore.email}/>
        <Inputs TYPE="password" PLACEHOLDER="Admin Password" TITLE="Password" bind:this={loginStore.password}/>
        <div class="mt-2">
            <Button TITLE="Login" on:click={login} LOADING={loginStore.showLoading}/>
        </div>
        <div class="mt-2">
            <p class="text-center text-[#ff0000] font-bold">{loginStore.showErrorDOMmsg}</p>
        </div>
    </div>
    
</div>