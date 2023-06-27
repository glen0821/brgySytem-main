<script>
    import Button from "../GeneralComponents/Button.svelte";
    import Inputs from "../GeneralComponents/Inputs.svelte";
    import { fly } from "svelte/transition";

    import {onSnapsClearance, showClearanceAddModal, compareClearanceValue } from "../BoundComponents/clickOutside";
    import { showPrintModel, formattedDate } from "./stateStore";

    import bgyClearance from "../Images/bgyClearance.jpg";


    //database calls and hooks
    import { auth, db } from "../../db/firebase";
    import { onSnapshot, addDoc, collection, serverTimestamp, increment, doc, deleteDoc, query, orderBy, setDoc, where } from "firebase/firestore";

    //handler to show add modal
    const toShowAddModal = () => {
        showClearanceAddModal.set(true);
    }
    
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

    }

    //submit data to database
    const submitData = async() => {
        const colRef = collection(db, "barangayClearance");
        addDoc(colRef, {
            createdAt: serverTimestamp(),
            completeName: bgyVarStore.completeName.BINDTHIS,
            address: bgyVarStore.address.BINDTHIS,
            birthdate: bgyVarStore.birthdate.BINDTHIS,
            lengthOfStay: bgyVarStore.lengthOfStay.BINDTHIS,
            purpose: bgyVarStore.purpose.BINDTHIS,
            dateOfAppointment: bgyVarStore.dateOfAppointment.BINDTHIS,
            bgyClearanceCounter: increment(1),
            
        }).then(() => {
            showClearanceAddModal.set(false);
        })
    }

    //fetch data from database
    const colRef = collection(db, "barangayClearance");
    const q = query(colRef, orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshots) => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];
        })
        onSnapsClearance.set(fbData);

    })

    //removeData from database
    const removeData = async(data) => {
        const docRef = doc(colRef, data);
        await deleteDoc(docRef)
        
    }

    //updateData from database
    const updateData = async(data) => {
        const docRef = doc(colRef, data);
        setDoc(docRef, {
            lastUpdated: serverTimestamp(),
            completeName: bgyVarStore.completeName.BINDTHIS,
            address: bgyVarStore.address.BINDTHIS,
            birthdate: bgyVarStore.birthdate.BINDTHIS,
            lengthOfStay: bgyVarStore.lengthOfStay.BINDTHIS,
            purpose: bgyVarStore.purpose.BINDTHIS,
            dateOfAppointment: bgyVarStore.dateOfAppointment.BINDTHIS,
        }, {merge:true})
    }

    //showModalComparison
    const editValueHandler = (data) => {
        compareClearanceValue.set(data);
    }
    
    const handlerSearch = () => {
        if(bgyVarStore.trigger){
            const q = query(colRef, orderBy("createdAt", "desc"), where("completeName", "==", bgyVarStore.kwiri))
            onSnapshot(q, (snapshots) => {
                let fbData = [];
                snapshots.docs.forEach(doc => {
                    let data = {...doc.data(), id: doc.id};
                    fbData = [data, ...fbData];
                })
                onSnapsClearance.set(fbData);
            })

            bgyVarStore.trigger = false;
        }
    }

    const detectInputs = () => {
        if(bgyVarStore.kwiri.trim().length < 1){
            const q = query(colRef, orderBy("createdAt", "desc"))
            onSnapshot(q, (snapshots) => {
                let fbData = [];
                snapshots.docs.forEach(doc => {
                    let data = {...doc.data(), id: doc.id};
                    fbData = [data, ...fbData];
                })
                onSnapsClearance.set(fbData);

            })
            bgyVarStore.trigger = false;
        }else{
            bgyVarStore.trigger = true;
        }
    }
</script>

<div class="m-2 mx-auto text-xs">
    <div class="min-h-[50vh] p-10">
        <div class="flex gap-2 items-center mb-2">
            <div class="w-full flex gap-2">
                <div class="">
                    <Button TITLE="Add Barangay Clearance" on:click={toShowAddModal}/>
                </div>

                <div class="">
                    <Button TITLE="Generate Barangay Clearance" on:click={() => showPrintModel.set(true)}/>
                </div>
            </div>

        
            <div class="flex flex-row-reverse items-center w-full">
                <button class="bg-blue-400 text-white absolute p-2 border-r-2 border-black hover:bg-blue-700 font-bold"
                on:click={handlerSearch}
                >Search</button>
                <input type="text" placeholder="Complete Name Only" class="w-[40%] p-2 focus:outline-none border-2 border-black " 
                on:keyup={detectInputs}
                bind:value={bgyVarStore.kwiri}
                />
                
                
            </div>

            {#if $showPrintModel}
                <div class="absolute left-0 right-0 mt-[100vh] bg-[#272822]">
                    <div class="mx-auto w-[900px]">
                        <div class="flex gap-2 p-2">
                            <a href={bgyClearance} download={bgyClearance} class="w-full"><p 
                                class="text-white font-semibold bg-red-500 p-2 rounded-lg text-center transition-all hover:scale-95 active:scale-105"
                                >Download Clearance</p></a>
                            <Button TITLE="Cancel" on:click={() => showPrintModel.set(false)}/>
                        </div>
                        <img src={bgyClearance} alt="loading" class=""/>
                    </div>
                </div>
                
                
            {/if}
        </div>
       
        
        {#if $showClearanceAddModal}
        <div class="flex flex-col gap-2 bg-white p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-guiColor z-10">
            <p class="text-xl text-center font-bold p-2 text-slate-500">New Barangay Clearance</p>
            <div class="">
                <Inputs TITLE="Complete Name:" PLACEHOLDER="Complete Name" bind:this={bgyVarStore.completeName}/>
            </div>

            <div class="flex justify-center gap-2">
                <div class="">
                     <Inputs TITLE="Length of stay" PLACEHOLDER="Length of stay" bind:this={bgyVarStore.lengthOfStay}/>
                </div>
                <div class="">
                    <Inputs TITLE="Purpose" PLACEHOLDER="purpose" bind:this={bgyVarStore.purpose}/>
                </div>
            </div>

            <div class="flex justify-center gap-2">
                <div class="w-full">
                     <Inputs TITLE="Birthdate:" TYPE="date" bind:this={bgyVarStore.birthdate}/>
                </div>
              
            </div>

            <div class="">
                <Inputs TITLE="Complete Address:" PLACEHOLDER="Complete Address" bind:this={bgyVarStore.address}/>
            </div>

            <div class="">
                <Inputs TITLE="Date Of Appointment:" TYPE="date" PLACEHOLDER="" bind:this={bgyVarStore.dateOfAppointment}/>
            </div>
            
            <div class="flex gap-2">
                <Button TITLE="Submit" on:click={submitData}/>
                <Button TITLE="Cancel" on:click={()=>{showClearanceAddModal.set(false)}}/>
            </div>
        </div>
        {/if}
        <div class="" in:fly={{x:-400, duration:1000}}>
            {#each $onSnapsClearance as value, i}
            <div class="flex justify-center items-center " in:fly={{x:-400, duration:1000}}>
                <p class="w-[25%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Complete Name</p>
                <p class="w-full border-b-2 border-white bg-slate-100 p-2 ">{value.completeName}</p>

                <p class="w-[10%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Address</p>
                <p class="w-full border-b-2 border-white bg-slate-100 p-2 ">{value.address}</p>

                <p class="w-[17%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Birth date</p>
                <p class="w-[20%] border-2 border-white bg-slate-100 p-2 ">{value.birthdate}</p>

                <p class="w-[25%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Length Of Stay</p>
                <p class="w-[20%] border-2 border-white bg-slate-100 p-2 ">{value.lengthOfStay}</p>

                <p class="w-[12%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Purpose</p>
                <p class="w-[20%] border-2 border-white bg-slate-100 p-2 ">{value.purpose}</p>

                <p class="w-[33%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Date Of Appointment</p>
                <p class="w-[20%] border-2 border-white bg-slate-100 p-2 ">{value.dateOfAppointment}</p>

                <div class="flex w-[30%] bg-slate-100">
                    <button class="bg-red-500 font-bold text-white w-full p-2 hover:bg-red-600 border-b-2 border-white"
                    on:click={removeData(value.id)}
                    >Delete</button>

                    <button class="bg-blue-500 font-bold text-white w-full p-2 hover:bg-blue-600 border-b-2 border-white"
                    on:click={()=>{editValueHandler(i)}}
                    >Edit</button>
                    
                </div>
                {#if $compareClearanceValue === i}
                    <div class="">
                        <div class="flex flex-col gap-2 bg-guiColor p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-slate-200 z-10">
                            <p class="text-xl text-center font-bold p-2 text-slate-500">Modify Values</p>
                            <div class="">
                                <Inputs TITLE="Complete Name:" PLACEHOLDER="Complete Name" bind:this={bgyVarStore.completeName}/>
                            </div>
                
                            <div class="flex justify-center gap-2">
                                <div class="">
                                    <Inputs TITLE="Length of stay" PLACEHOLDER="Length of stay" bind:this={bgyVarStore.lengthOfStay}/>
                                </div>
                                <div class="">
                                    <Inputs TITLE="Purpose" PLACEHOLDER="purpose" bind:this={bgyVarStore.purpose}/>
                                </div>
                            </div>
                
                            <div class="flex justify-center gap-2">
                                <div class="w-full">
                                    <Inputs TITLE="Birthdate:" TYPE="date" bind:this={bgyVarStore.birthdate}/>
                                </div>
                            
                            </div>
                
                            <div class="">
                                <Inputs TITLE="Complete Address:" PLACEHOLDER="Complete Address" bind:this={bgyVarStore.address}/>
                            </div>
                            
                            <div class="">
                                <Inputs TITLE="Date Of Appointment:" TYPE="date" PLACEHOLDER="" bind:this={bgyVarStore.dateOfAppointment}/>
                            </div>

                            <div class="flex gap-2">
                                <Button TITLE="Confirm Edit" on:click={updateData(value.id)}/>
                                <Button TITLE="Cancel" on:click={() => {compareClearanceValue.set("")}}/>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            {/each}

        </div>
        
    </div>

    
</div>