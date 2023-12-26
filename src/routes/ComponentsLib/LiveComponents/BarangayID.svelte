<script>
  import Button from "../GeneralComponents/Button.svelte";
  import Inputs from "../GeneralComponents/Inputs.svelte";
  import { fly } from "svelte/transition";
  import {
    onSnapsBgyID,
    compareIDvalue,
    showAddModal,
  } from "../BoundComponents/clickOutside";
  import { showPrintModel, formattedDate } from "./stateStore";
  import bgyClearance from "../Images/bgyClearance.jpg";

  //database calls and hooks
  import { auth, db } from "../../db/firebase";
  import {
    onSnapshot,
    addDoc,
    collection,
    serverTimestamp,
    increment,
    doc,
    deleteDoc,
    query,
    orderBy,
    setDoc,
    where,
  } from "firebase/firestore";

 // Declare and initialize statuses
let statuses = new Array($onSnapsBgyID.length).fill('');


  function statusClass(status) {
 switch (status) {
  case 'onProcess':
    return 'text-red-500';
  case 'forPickup':
    return 'text-orange-500';
  case 'completed':
    return 'text-green-500';
  default:
    return '';
 }
}




  //handler to show add modal
  const toShowAddModal = () => {
    showAddModal.set(true);
  };

  //barangayID varStore
  const bgyVarStore = {
    completeName: "",
    address: "",
    birthdate: "",
    gender: "",
    height: "",
    weight: "",
    dateOfAppointment: "",
    kwiri: "",
    trigger: false,
  };

  //submit data to database
  const submitData = async () => {
    const colRef = collection(db, "barangayID");
    addDoc(colRef, {
      createdAt: serverTimestamp(),
      completeName: bgyVarStore.completeName.BINDTHIS,
      address: bgyVarStore.address.BINDTHIS,
      birthdate: bgyVarStore.birthdate.BINDTHIS,
      gender: bgyVarStore.gender.BINDTHIS,
      height: bgyVarStore.height.BINDTHIS,
      weight: bgyVarStore.weight.BINDTHIS,
      dateOfAppointment: bgyVarStore.dateOfAppointment.BINDTHIS,
      barangayCounter: increment(1),
    }).then(() => {
      showAddModal.set(false);
    });
  };

  //fetch data from database
  const colRef = collection(db, "barangayID");
  const q = query(colRef, orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshots) => {
    let fbData = [];
    snapshots.docs.forEach((doc) => {
      let data = { ...doc.data(), id: doc.id };
      fbData = [data, ...fbData];
    });
    onSnapsBgyID.set(fbData);
  });

  //removeData from database
  const removeData = async (data) => {
    const docRef = doc(colRef, data);
    await deleteDoc(docRef);
  };

  //updateData from database
  const updateData = async (data) => {
    const docRef = doc(colRef, data);
    setDoc(
      docRef,
      {
        lastUpdated: serverTimestamp(),
        completeName: bgyVarStore.completeName.BINDTHIS,
        address: bgyVarStore.address.BINDTHIS,
        birthdate: bgyVarStore.birthdate.BINDTHIS,
        gender: bgyVarStore.gender.BINDTHIS,
        height: bgyVarStore.height.BINDTHIS,
        weight: bgyVarStore.weight.BINDTHIS,
        dateOfAppointment: bgyVarStore.dateOfAppointment.BINDTHIS,
      },
      { merge: true }
    );
  };

  //showModalComparison
  const editValueHandler = (data) => {
    compareIDvalue.set(data);
  };

  const handleSearch = () => {
    const q = query(
      colRef,
      orderBy("createdAt", "desc"),
      where("completeName", "==", bgyVarStore.kwiri)
    );
    onSnapshot(q, (snapshots) => {
      let fbData = [];
      snapshots.docs.forEach((doc) => {
        let data = { ...doc.data(), id: doc.id };
        fbData = [data, ...fbData];
      });
      onSnapsBgyID.set(fbData);
    });

    bgyVarStore.trigger = false;
  };

  const detectInputs = () => {
    if (bgyVarStore.kwiri.trim().length < 1) {
      const q = query(colRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshots) => {
        let fbData = [];
        snapshots.docs.forEach((doc) => {
          let data = { ...doc.data(), id: doc.id };
          fbData = [data, ...fbData];
        });
        onSnapsBgyID.set(fbData);
      });

      bgyVarStore.trigger = false;
    } else {
      bgyVarStore.trigger = true;
    }
  };
</script>

<div class="m-2 mx-auto text-xs">
  <div class="min-h-[50vh] p-10">
    <div class=" flex gap-2 items-center mb-2">
      <div class="w-full flex gap-2">
        <div class="">
          <Button TITLE="Add Barangay ID" on:click={toShowAddModal} />
        </div>

        <div class="">
          <Button
            TITLE="Generate Barangay ID"
            on:click={() => showPrintModel.set(true)}
          />
        </div>
      </div>

      <div class="flex flex-row-reverse items-center w-full">
        <button
          class="bg-blue-400 text-white absolute p-2 border-r-2 border-black hover:bg-blue-700 font-bold"
          on:click={handleSearch}>Search</button
        >
        <input
          type="text"
          placeholder="Complete Name Only"
          class="w-[40%] p-2 focus:outline-none border-2 border-black"
          on:keyup={detectInputs}
          bind:value={bgyVarStore.kwiri}
        />
      </div>
    </div>

    {#if $showPrintModel}
      <div class="absolute left-0 right-0 top-0 bg-[#272822]">
        <div class="mx-auto w-[900px]">
          <div class="flex gap-2 p-2">
            <a href={bgyClearance} download={bgyClearance} class="w-full"
              ><p
                class="text-white font-semibold bg-red-500 p-2 rounded-lg text-center transition-all hover:scale-95 active:scale-105"
              >
                Download Barangay ID
              </p></a
            >
            <Button TITLE="Cancel" on:click={() => showPrintModel.set(false)} />
          </div>
          <img src={bgyClearance} alt="loading" class="" />
        </div>
      </div>
    {/if}

    {#if $showAddModal}
      <div
        class="flex flex-col gap-2 bg-white p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-guiColor z-10"
      >
        <p class="text-xl text-center font-bold p-2 text-slate-500">
          New Barangay ID
        </p>
        <div class="">
          <Inputs
            TITLE="Complete Name:"
            PLACEHOLDER="Complete Name"
            bind:this={bgyVarStore.completeName}
          />
        </div>

        <div class="flex justify-center gap-2">
          <div class="">
            <Inputs
              TITLE="Height"
              PLACEHOLDER="Height"
              bind:this={bgyVarStore.height}
            />
          </div>
          <div class="">
            <Inputs
              TITLE="Weight"
              PLACEHOLDER="Weight"
              bind:this={bgyVarStore.weight}
            />
          </div>
        </div>

        <div class="flex justify-center gap-2">
          <div class="w-full">
            <Inputs
              TITLE="Birthdate:"
              TYPE="date"
              bind:this={bgyVarStore.birthdate}
            />
          </div>
          <div class="w-full">
            <Inputs
              TITLE="Gender:"
              TYPE="cordion"
              bind:this={bgyVarStore.gender}
            />
          </div>
        </div>

        <div class="">
          <Inputs
            TITLE="Complete Address:"
            PLACEHOLDER="Complete Address"
            bind:this={bgyVarStore.address}
          />
        </div>

        <div class="">
          <Inputs
            TITLE="Date Of Apointment:"
            TYPE="date"
            PLACEHOLDER="Complete Address"
            bind:this={bgyVarStore.dateOfAppointment}
          />
        </div>

        <div class="flex gap-2">
          <Button TITLE="Submit" on:click={submitData} />
          <Button
            TITLE="Cancel"
            on:click={() => {
              showAddModal.set(false);
            }}
          />
        </div>
      </div>
    {/if}
    <div class="" in:fly={{ x: -400, duration: 1000 }}>
      <div class="relative">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3"> Firstname </th>
              <th scope="col" class="px-6 py-3"> MI</th>
              <th scope="col" class="px-6 py-3"> Lastname </th>
              <th scope="col" class="px-6 py-3"> Suffix </th>
              <th scope="col" class="px-6 py-3"> address </th>
              <th scope="col" class="px-6 py-3"> birthdate </th>
              <th scope="col" class="px-6 py-3"> gender </th>
              <th scope="col" class="px-6 py-3"> height </th>
              <th scope="col" class="px-6 py-3"> weight </th>
              <th scope="col" class="px-6 py-3"> Appointment </th>
              <th scope="col" class="px-6 py-3"> status </th>
              <th scope="col" class="px-6 py-3"> action </th>
            </tr>
          </thead>
          <tbody>
            {#each $onSnapsBgyID as barangayId, i}
            <tr class="bg-white border-b">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {barangayId.FirstName}
              </th>
              <td class="px-6 py-4">
                {barangayId.MiddleInitial}
              </td>
              <td class="px-6 py-4">
                {barangayId.LastName}
              </td>
              <td class="px-6 py-4">
                {barangayId.Suffix}
              </td>
                <td class="px-6 py-4">
                  {barangayId.address}
                </td>
                <td class="px-6 py-4">
                  {barangayId.birthdate}
                </td>
                <td class="px-6 py-4">
                  {barangayId.gender}
                </td>
                <td class="px-6 py-4">
                  {barangayId.height}
                </td>
                <td class="px-6 py-4">
                  {barangayId.weight}
                </td>
                <td class="px-6 py-4">
                  {barangayId.dateOfAppointment}
                </td>
                <td class="px-6 py-4">
                  <select bind:value={statuses[i]} class={`bg-white ${statusClass(statuses[i])}`}>
                    <option value="">None</option>
                    <option value="onProcess">On Process</option>
                    <option value="forPickup">For Pickup</option>
                    <option value="completed">Completed</option>
                   </select>     
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button
                    class="hover:bg-orange-300 hover:scale-105 px-4 py-2 rounded-full duration-700 hover:text-white"
                    on:click={() => {
                      editValueHandler(i);
                    }}><i class="ri-pencil-line text-base"></i></button
                  >

                    <button
                      class="hover:bg-red-300 hover:scale-105 px-4 py-2 rounded-full duration-700 hover:text-white"
                      on:click={removeData(barangayId.id)}><i class="ri-delete-bin-line"></i></button
                    >
                  </div>
                </td>
              </tr>

              {#if $compareIDvalue === i}
                <div
                  class="flex flex-col gap-2 p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 bg-gray-white z-10"
                >
                  <p class="text-xl text-center font-bold p-2 text-slate-500">
                    Modify Values
                  </p>
                  <div class="">
                    <Inputs
                      TITLE="Complete Name:"
                      PLACEHOLDER="Complete Name"
                      bind:this={bgyVarStore.completeName}
                    />
                  </div>

                  <div class="flex justify-center gap-2">
                    <div class="">
                      <Inputs
                        TITLE="Height"
                        PLACEHOLDER="Height"
                        bind:this={bgyVarStore.height}
                      />
                    </div>
                    <div class="">
                      <Inputs
                        TITLE="Weight"
                        PLACEHOLDER="Weight"
                        bind:this={bgyVarStore.weight}
                      />
                    </div>
                  </div>

                  <div class="flex justify-center gap-2">
                    <div class="w-full">
                      <Inputs
                        TITLE="Birthdate:"
                        TYPE="date"
                        bind:this={bgyVarStore.birthdate}
                      />
                    </div>

                    <div class="w-full">
                      <Inputs
                        TITLE="Gender:"
                        TYPE="cordion"
                        bind:this={bgyVarStore.gender}
                      />
                    </div>
                  </div>

                  <div class="">
                    <Inputs
                      TITLE="Complete Address:"
                      PLACEHOLDER="Complete Address"
                      bind:this={bgyVarStore.address}
                    />
                  </div>

                  <div class="">
                    <Inputs
                      TITLE="Date Of Appointment:"
                      TYPE="date"
                      PLACEHOLDER="Date Of Appointment"
                      bind:this={bgyVarStore.dateOfAppointment}
                    />
                  </div>

                  <div class="flex gap-2">
                    <button
                      class="bg-orange-300 px-4 py-2 rounded-lg w-1/2"
                      on:click={updateData(barangayId.id)}
                    >Update</button>
                    <button
                      class="bg-red-300 px-4 py-2 rounded-lg w-1/2"
                      on:click={() => {
                        compareIDvalue.set("");
                      }}
                    >Cancel</button>
                  </div>
                </div>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>      
    </div>
  </div>
</div>
