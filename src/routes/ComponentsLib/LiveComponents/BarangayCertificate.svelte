<script>
  import Button from "../GeneralComponents/Button.svelte";
  import Inputs from "../GeneralComponents/Inputs.svelte";
  import PdfTemplate from "./PdfTemplate.svelte";
  import { fly } from "svelte/transition";
  import html2pdf from "html2pdf.js";
  import {
    cordionLogic,
    onSnapsBgyCert,
    showCertEditLogic,
    showCertAddModal,
    compareCertValue,
    showEditModalLogic,
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
  import { onMount } from "svelte";

  

  // $: console.log(html2pdf);

  const opt = {
    margin: 1,
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "legal", orientation: "portrait" },
  };

  let pdfElement,
    pdfElementHidden = true,
    printData = {};

  onMount(() => {
    pdfElement = document.getElementById("pdf-template");
  });

  async function printPdf(dataForPrint) {
    console.log({ dataForPrint });
    printData.name = dataForPrint.completeName;
    printData.activity = dataForPrint.purpose;
    pdfElementHidden = false;
    const pdf = await html2pdf().set(opt).from(pdfElement).save();
    pdfElementHidden = true;
    return pdf;
  }

  //handler to show add modal
  const toShowAddModal = () => {
    showCertAddModal.set(true);
  };

  //handler to show edit modal
  const toShowEditModal = () => {
    showCertEditLogic.set(true);
  };

  //barangayID varStore
  const bgyVarStore = {
    completeName: "",
    address: "",
    birthdate: "",
    lengthOfStay: "",
    purpose: "",
    dateOfAppointment: "",
    kwiri: "",
    trigger: false,
  };

  //submit data to database
  const submitData = async () => {
    const colRef = collection(db, "barangayCertificate");
    addDoc(colRef, {
      createdAt: serverTimestamp(),
      completeName: bgyVarStore.completeName.BINDTHIS,
      address: bgyVarStore.address.BINDTHIS,
      birthdate: bgyVarStore.birthdate.BINDTHIS,
      lengthOfStay: bgyVarStore.lengthOfStay.BINDTHIS,
      purpose: bgyVarStore.purpose.BINDTHIS,
      dateOfAppointment: bgyVarStore.dateOfAppointment.BINDTHIS,
      bgyCertificateCounter: increment(1),
    }).then(() => {
      showCertAddModal.set(false);
    });
  };

  //fetch data from database
  const colRef = collection(db, "barangayCertificate");
  const q = query(colRef, orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshots) => {
    let fbData = [];
    snapshots.docs.forEach((doc) => {
      let data = { ...doc.data(), id: doc.id };

      console.log(data);
      fbData = [data, ...fbData];
    });
    onSnapsBgyCert.set(fbData);
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
        lengthOfStay: bgyVarStore.lengthOfStay.BINDTHIS,
        purpose: bgyVarStore.purpose.BINDTHIS,
        dateOfAppointment: bgyVarStore.dateOfAppointment.BINDTHIS,
      },
      { merge: true }
    );
  };

  let editData = {};

  //showModalComparison
  const editValueHandler = (data) => {
    editData = { ...data };
    // console.log(data);
    toShowEditModal();
    // compareCertValue.set(data);

    console.log(editData);
  };

  const handlerSearch = () => {
    if (bgyVarStore.trigger) {
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
        onSnapsBgyCert.set(fbData);
      });
      bgyVarStore.trigger = false;
    }
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
        onSnapsBgyCert.set(fbData);
      });
      bgyVarStore.trigger = false;
    } else {
      bgyVarStore.trigger = true;
    }
  };
</script>

<PdfTemplate
  printFunc={printPdf}
  isHidden={pdfElementHidden}
  {...printData}
  }
/>

<div class="m-2 mx-auto text-xs">
  <div class="min-h-[50vh] p-10">
    <div class=" flex gap-2 items-center mb-2">
      <div class="w-full flex gap-2">
        <div class="">
          <Button TITLE="Add Barangay Certificate" on:click={toShowAddModal} />
        </div>

        <div class="">
          <button class="text-xs py-2 px-4 bg-orange-300 rounded-lg hover:bg-orange-400 hover:scale-105 duration-700 font-bold hover:text-white" on:click={printPdf} > Print </button>
        </div>
      </div>

      <div class="flex flex-row-reverse items-center w-full">
        <button
          class="bg-blue-400 text-white absolute p-2 border-r-2 border-black hover:bg-blue-700 font-bold"
          on:click={handlerSearch}>Search</button
        >
        <input
          type="text"
          placeholder="Complete Name Only"
          class="w-[40%] p-2 focus:outline-none border-2 border-black"
          on:keyup={detectInputs}
          bind:value={bgyVarStore.kwiri}
        />
      </div>

      {#if $showPrintModel}
        <div class="absolute left-0 right-0 mt-[100vh] bg-[#272822]">
          <div class="mx-auto w-[900px]">
            <div class="flex gap-2 p-2">
              <a href={bgyClearance} download={bgyClearance} class="w-full"
                ><p
                  class="text-white font-semibold bg-red-500 p-2 rounded-lg text-center transition-all hover:scale-95 active:scale-105"
                >
                  Download Certificate
                </p></a
              >
              <Button
                TITLE="Cancel"
                on:click={() => showPrintModel.set(false)}
              />
            </div>
            <img src={bgyClearance} alt="loading" class="" />
          </div>
        </div>
      {/if}
    </div>

    {#if $showCertAddModal}
      <div
        class="flex flex-col gap-2 bg-white p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-guiColor z-10"
      >
        <p class="text-xl text-center font-bold p-2 text-slate-500">
          New Barangay Certificate
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
              TITLE="Length of stay"
              PLACEHOLDER="Length of stay"
              bind:this={bgyVarStore.lengthOfStay}
            />
          </div>
          <div class="">
            <Inputs
              TITLE="Purpose"
              PLACEHOLDER="purpose"
              bind:this={bgyVarStore.purpose}
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
            TITLE="Date Of Appointment"
            TYPE="date"
            PLACEHOLDER=""
            bind:this={bgyVarStore.dateOfAppointment}
          />
        </div>

        <div class="flex gap-2">
          <Button TITLE="Submit" on:click={submitData} />
          <Button
            TITLE="Cancel"
            on:click={() => {
              showCertAddModal.set(false);
            }}
          />
        </div>
      </div>
    {/if}

    {#if $showCertEditLogic}
      <div
        class="flex flex-col gap-2 bg-white p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-guiColor z-10"
      >
        <p class="text-xl text-center font-bold p-2 text-slate-500">
          Update Barangay Certificate
        </p>
        <div class="">
          <Inputs
            TITLE="Complete Name:"
            PLACEHOLDER={editData.completeName}
            bind:this={bgyVarStore.completeName}
          />
        </div>

        <div class="flex justify-center gap-2">
          <div class="">
            <Inputs
              TITLE="Length of stay"
              PLACEHOLDER={editData.lengthOfStay}
              bind:this={bgyVarStore.lengthOfStay}
            />
          </div>
          <div class="">
            <Inputs
              TITLE="Purpose"
              PLACEHOLDER={editData.purpose}
              bind:this={bgyVarStore.purpose}
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
        </div>

        <div class="">
          <Inputs
            TITLE="Complete Address:"
            PLACEHOLDER={editData.address}
            bind:this={bgyVarStore.address}
          />
        </div>

        <div class="">
          <Inputs
            TITLE="Date Of Appointment"
            TYPE="date"
            PLACEHOLDER=""
            bind:this={bgyVarStore.dateOfAppointment}
          />
        </div>

        <div class="flex gap-2">
          <Button TITLE="Submit" on:click={updateData(editData.id)} />
          <Button
            TITLE="Cancel"
            on:click={() => {
              showCertEditLogic.set(false);
            }}
          />
        </div>
      </div>
    {/if}

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3"> firstname </th>
            <th scope="col" class="px-6 py-3"> MI </th>
            <th scope="col" class="px-6 py-3"> lastname</th>
            <th scope="col" class="px-6 py-3"> suffix </th>
            <th scope="col" class="px-6 py-3"> address </th>
            <th scope="col" class="px-6 py-3"> birthdate </th>
            <th scope="col" class="px-6 py-3"> length of stay </th>
            <th scope="col" class="px-6 py-3"> purpose </th>
            <th scope="col" class="px-6 py-3"> date of appointment </th>
            <th scope="col" class="px-6 py-3"> status </th>
            <th scope="col" class="px-6 py-3"> action</th>
          </tr>
        </thead>
        <tbody>
          {#each $onSnapsBgyCert as cert}
            <tr class="bg-white border-b">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
              {cert.FirstName}
            </th>
            <td class="px-6 py-4">
              {cert.MiddleInitial}
            </td>
            <td class="px-6 py-4">
              {cert.LastName}
            </td>
            <td class="px-6 py-4">
              {cert.Suffix}
            </td>
              <td class="px-6 py-4"> {cert.address} </td>
              <td class="px-6 py-4">{cert.birthdate} </td>
              <td class="px-6 py-4"> {cert.lengthOfStay} </td>
              <td class="px-6 py-4"> {cert.purpose} </td>
              <td class="px-6 py-4"> {cert.dateOfAppointment} </td>
              <td class="px-6 py-4">
                <select class="bg-white">
                 <option value="">None</option>
                  <option value="onProcess">On Process</option>
                   <option value="forPickup">For Pickup</option>
                   <option value="completed">Completed</option>
                  </select>
               </td>
              <td class="px-6 py-4">
                <div class="flex bg-slate-10 w-[30%] gap-2">
                  <button
                    class=" rounded-lg hover:scale-105 duration-700  text-black w-full p-2 hover:bg-orange-300 border-b-2 border-white"
                    on:click={() => {
                      editValueHandler(cert);
                    }}><i class="ri-edit-2-line" /></button
                  >

                  <button
                    class="font-bold rounded-lg hover:scale-105 duration-700 text-red-800 hover:text-white w-full p-2 hover:bg-red-600 border-b-2 border-white"
                    on:click={removeData(cert.id)}
                    ><i class="ri-delete-bin-line" /></button
                  >

                  <button
                    class=" text-blue-800 w-full p-2 hover:bg-blue-600 border-b-2 hover:text-white rounded-lg duration-700"
                    on:click={() => printPdf(cert)}><i class="ri-printer-line "></i></button
                  >
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
