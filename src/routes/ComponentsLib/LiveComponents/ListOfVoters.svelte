<script>
  import Button from "../GeneralComponents/Button.svelte";
  import Inputs from "../GeneralComponents/Inputs.svelte";
  import ListIcon from "../Images/SVGs/ListIcon.svg";
  import { fly } from "svelte/transition";

  import { showPrintModel, formattedDate } from "./stateStore";

  import {
    showAdd,
    onSnaps,
    compareValue,
  } from "../BoundComponents/clickOutside";

  //database calls and hooks
  import { auth, db } from "../../db/firebase";
  import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    increment,
    deleteDoc,
    doc,
    setDoc,
    where,
  } from "firebase/firestore";

  //toggle show modal of add voter
  const showAddModal = () => {
    showAdd.set(true);
  };

  //handler for send data of addVoter
  const listOfVotersStore = {
    completeName: "",
    precintNum: "",
    completeAddress: "",
    kwiri: "",
    trigger: false,
  };
  const addVoter = async () => {
    const colRef = collection(db, "votersList");
    await addDoc(colRef, {
      createdAt: serverTimestamp(),
      completeName: listOfVotersStore.completeName.BINDTHIS,
      precintNumber: listOfVotersStore.precintNum.BINDTHIS,
      completeAddress: listOfVotersStore.completeAddress.BINDTHIS,
      voterCounter: increment(1),
    }).then(() => {
      listOfVotersStore.completeName.BINDTHIS = "";
      listOfVotersStore.precintNum.BINDTHIS = "";
      listOfVotersStore.completeAddress.BINDTHIS = "";
    });
  };

  let sample = where("precintNumber", "==", 500);

  //database loop data
  const colRef = collection(db, "votersList");
  let q = query(colRef, orderBy("createdAt", "desc"));

  const handleSearch = () => {
    if (listOfVotersStore.trigger) {
      q = query(
        colRef,
        orderBy("createdAt", "desc"),
        where("precintNumber", "==", Number(listOfVotersStore.kwiri))
      );

      onSnapshot(q, (snapshots) => {
        let fbData = [];
        snapshots.docs.forEach((doc) => {
          let data = { ...doc.data(), id: doc.id };
          fbData = [data, ...fbData];
        });
        onSnaps.set(fbData);
      });

      listOfVotersStore.trigger = false;
    }
  };

  $: editModalId = null;

const openEditModal = (id) => {
  editModalId = id;
}

  const detectInputs = () => {
    if (listOfVotersStore.kwiri.trim().length < 1) {
      let q = query(colRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshots) => {
        let fbData = [];
        snapshots.docs.forEach((doc) => {
          let data = { ...doc.data(), id: doc.id };
          fbData = [data, ...fbData];
        });
        onSnaps.set(fbData);

        listOfVotersStore.trigger = false;
      });
    } else {
      listOfVotersStore.trigger = true;
    }
  };

  onSnapshot(q, (snapshots) => {
    let fbData = [];
    snapshots.docs.forEach((doc) => {
      let data = { ...doc.data(), id: doc.id };
      fbData = [data, ...fbData];
    });
    onSnaps.set(fbData);
  });

  //database remove data
  const removeData = async (data) => {
    const docRef = doc(colRef, data);
    await deleteDoc(docRef);
  };

  //database update data
  const updateData = async (data) => {
    const docRef = doc(colRef, data);
    setDoc(
      docRef,
      {
        lastUpdated: serverTimestamp(),
        completeName: listOfVotersStore.completeName.BINDTHIS,
        precintNumber: listOfVotersStore.precintNum.BINDTHIS,
        completeAddress: listOfVotersStore.completeAddress.BINDTHIS,
      },
      { merge: true }
    ).then(() => {
      listOfVotersStore.completeName.BINDTHIS = "";
      listOfVotersStore.precintNum.BINDTHIS = "";
      listOfVotersStore.completeAddress.BINDTHIS = "";
    });
  };

  //showEditModal
  const showEditModal = (i) => {
    compareValue.set(i);
  };

  //print data to external platforms like pdf etc
  const printFunc = () => {
    print();
  };
</script>

<div class="m-2 mx-auto text-xs w-full min-h-screen">
  <div class="h-full w-full p-10 relative">
    <div class=" flex gap-2 items-center mb-2">
      <div class="w-full flex gap-2">
        <div class="">
          <Button TITLE="Add Voter" on:click={() =>showAdd.set(true)} />
        </div>

        <div class="">
          <Button TITLE="Print" on:click={() => showPrintModel.set(true)} />
        </div>
      </div>

      <div class="flex flex-row-reverse items-center w-full">
        <button
          class="bg-blue-400 text-white absolute p-2 border-r-2 border-black hover:bg-blue-700 font-bold"
          on:click={handleSearch}>Search</button
        >
        <input
          type="text"
          placeholder="Precint Number Only"
          class="w-[40%] p-2 focus:outline-none border-2 border-black"
          on:keyup={detectInputs}
          bind:value={listOfVotersStore.kwiri}
        />
      </div>
    </div>

    {#if $showPrintModel}
      <div class="fixed bottom-0 top-0 left-0 right-0 bg-white">
        <div class="mx-auto max-w-[1000px] mt-[20vh] p-10">
          <div class="fixed bottom-0 right-0 p-10">
            <div class="flex gap-2">
              <div class="">
                <Button TITLE="Print Now" on:click={printFunc} />
              </div>
              <div class="">
                <Button
                  TITLE="Close"
                  on:click={() => showPrintModel.set(false)}
                />
              </div>
            </div>
          </div>

          <div class="mb-5 flex flex-col gap-2">
            <p class=" "><b>Date: </b>{formattedDate}</p>
            <p class=" "><b>Generated by:</b> Sn3 Barangay System</p>
          </div>

          <div class="flex justify-center items-center">
            <p class="w-full bg-[#272822] text-white p-2 border-2 font-bold">
              Complete Name
            </p>
            <p class="w-full bg-[#272822] text-white p-2 border-2 font-bold">
              Precint #
            </p>
            <p class="w-full bg-[#272822] text-white p-2 border-2 font-bold">
              Address
            </p>
          </div>
          {#each $onSnaps as val}
            <div class="flex justify-center items-center">
              <p class="w-full p-2 border-2">{val.completeName}</p>
              <p class="w-full p-2 border-2">{val.precintNumber}</p>
              <p class="w-full p-2 border-2">{val.completeAddress}</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!--ADD voters-->
    {#if $showAdd}
      <div
        class="flex flex-col gap-2 bg-guiColor p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-slate-200"
      >
        <p class="text-xl text-center font-bold p-2 text-slate-500">
          Add New Voter
        </p>
        <div class="flex gap-2 justify-center">
          <div class="">
            <Inputs
              TITLE="Name:"
              PLACEHOLDER="Complete Name"
              bind:this={listOfVotersStore.completeName}
            />
          </div>
          <div class="">
            <Inputs
              TITLE="PRECINT#:"
              PLACEHOLDER="Precint Number"
              TYPE="number"
              bind:this={listOfVotersStore.precintNum}
            />
          </div>
          <div class="">
            <Inputs
              TITLE="ADDRESS:"
              PLACEHOLDER="Complete Address"
              bind:this={listOfVotersStore.completeAddress}
            />
          </div>
        </div>

        <div class="flex gap-2">
          <Button TITLE="Submit" on:click={addVoter} />
          <Button
            TITLE="Close"
            on:click={() => {
              showAdd.set(false);
            }}
          />
        </div>
      </div>
    {/if}
    <!--End of add voters-->

    <div class="w-full h-full" in:fly={{ x: 400, duration: 1000 }}>
      <div class="relative overflow-x-auto h-96 w-full">
        <table class="w-full text-sm text-left text-gray-500 z-0">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Complete Name </th>
              <th scope="col" class="px-6 py-3"> Precint # </th>
              <th scope="col" class="px-6 py-3"> address </th>
              <th scope="col" class="px-6 py-3"> action </th>
            </tr>
          </thead>
          <tbody>
            {#each $onSnaps as voter, i}
              <tr class="bg-white border-b">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {voter.completeName}
                </th>
                <td class="px-6 py-4">{voter.precintNumber} </td>
                <td class="px-6 py-4"> {voter.completeAddress} </td>
                <td>
                  <div class="flex space-x-5">
                    <button
                      class="hover:bg-orange-300 duration-700 px-4 p-2 rounded-full hover:text-black hover:font-bold hover:scale-105"
                      on:click={openEditModal(voter.id)}><i class="ri-edit-box-line text-lg" /></button
                    >

                    <button
                      class="hover:bg-red-300 duration-700 px-4 p-2 rounded-full hover:text-black hover:font-bold hover:scale-105"
                      on:click={() => {
                        removeData(voter.id);
                      }}><i class="ri-delete-bin-line text-lg" /></button
                    >
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>


      </div>
    </div>

    {#if editModalId !== null}
    <div
      class="flex flex-col w-96 h-auto bg-white gap-2 p-4  rounded-lg absolute left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-slate-200 z-10"
    >
      <p class="text-xl text-center font-bold p-2 text-black">
        Modify Values
      </p>
      <div class="flex gap-2 justify-center">
        <div class="">
          <Inputs
            TITLE="Name:"
            PLACEHOLDER="Complete Name"
            bind:this={listOfVotersStore.completeName}
          />
        </div>
        <div class="">
          <Inputs
            TITLE="Percint #:"
            PLACEHOLDER="Precint Number"
            TYPE="number"
            bind:this={listOfVotersStore.precintNum}
          />
        </div>
        <div class="">
          <Inputs
            TITLE="Address:"
            PLACEHOLDER="Complete Address"
            bind:this={listOfVotersStore.completeAddress}
          />
        </div>
      </div>

      <div class="flex gap-2">
        <button
          class="w-1/2 bg-orange-300 text-base hover:scale-105 rounded-lg duration-700"
          on:click={() => {
            updateData(editModalId);
          }}>Confirm</button
        >
        <button
          class="bg-red-300 text-base hover:scale-105 rounded-lg duration-700 w-1/2"
          on:click={() => {
            editModalId = null
          }}
          >close
        </button>
      </div>
    </div>
  {/if}
  </div>
</div>
