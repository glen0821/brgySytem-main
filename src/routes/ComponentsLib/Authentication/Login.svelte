<script>
  import loginLogo from "../Images/logo.png";
  import Inputs from "../GeneralComponents/Inputs.svelte";
  import Button from "../GeneralComponents/Button.svelte";

  //database calls and hooks
  import { auth, db } from "../../db/firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";

  //loginStorages
  const loginStore = {
    email: "",
    password: "",
    showLoading: false,
    showErrorDOMmsg: "",
  };

  //login to system
  const login = async () => {

    loginStore.showLoading = true;
    await signInWithEmailAndPassword(
      auth,
      loginStore.email.value,
      loginStore.password.value
    )
      .then((userCred) => {
        localStorage.setItem("uid", userCred.user.uid);
        loginStore.showLoading = false;
      })
      .catch((error) => {
        loginStore.showLoading = false;
        loginStore.showErrorDOMmsg = error.code;
      });
  };
</script>

<div class="w-full min-h-screen flex justify-center bg-gray-50">
  <div class="w-4/6 bg-white rounded-lg flex h-96 drop-shadow-lg mt-[10rem]">
    <div class="w-1/2 p-6 flex flex-col space-y-8">
      <h1 class="text-3xl font-bold text-center">Log in</h1>
      <div class="flex flex-col gap-2">
        <label for="">Email</label>
        <input
          type="text"
          class="p-2 bg-gray-50 rounded-lg"
          TYPE="email"
          PLACEHOLDER="Email"
          TITLE="Email"
          bind:this={loginStore.email}
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Password</label>
        <input
          TYPE="password"
          PLACEHOLDER="Password"
          TITLE="Password"
          bind:this={loginStore.password}
          class="p-2 bg-gray-50 rounded-lg"
        />
      </div>
      <div class="w-full p-4">
        <button class="bg-orange-300 hover:bg-orange-400 duration-700 hover:scale-105  w-full px-4 py-2 rounded-lg"
        on:click={login} LOADING={loginStore.showLoading}
        >Log in</button>
      </div>
    </div>
    <div class="w-1/2 bg-orange-300 flex justify-center p-2 rounded-r-lg">
      <img src={loginLogo} alt="" class="h-94" />
    </div>
  </div>
</div>

<!-- <div class="sm:max-w-[400px] mt-[15vh] mx-auto">
  <div class="p-10 flex flex-col gap-2 bg-guiColor m-2 rounded-lg">
    <div class="flex justify-center">
      <img src={loginLogo} alt="loading" class="w-[200px]" />
    </div>
    <Inputs
      TYPE="email"
      PLACEHOLDER="Admin Email"
      TITLE="Email"
      bind:this={loginStore.email}
    />
    <Inputs
      TYPE="password"
      PLACEHOLDER="Admin Password"
      TITLE="Password"
      bind:this={loginStore.password}
    />
    <div class="mt-2">
      <Button TITLE="Login" on:click={login} LOADING={loginStore.showLoading} />
    </div>
    <div class="mt-2">
      <p class="text-center text-[#ff0000] font-bold">
        {loginStore.showErrorDOMmsg}
      </p>
    </div>
  </div>
</div> -->
