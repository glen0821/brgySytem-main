<script>
    //database callse and hooks
    import { auth, db } from "../../db/firebase";
    import { onSnapshot, collection, doc  } from "firebase/firestore";

    import { fly } from "svelte/transition";


    //listofvoters count
    let counter = 0;
    const colRef = collection(db, "votersList");
    onSnapshot(colRef, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().voterCounter);
            counterConvert += fbStoreCount;
        })
        counter = counterConvert;
    })
   
    
    //barangay requst id count
    let counter2 = 0
    const colRef2 = collection(db, "barangayID");
    onSnapshot(colRef2, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().barangayCounter);
            counterConvert += fbStoreCount;
        })
        counter2 = counterConvert;
    })
    
    //barangay certificate count
    let counter3 = 0;
    const colRef3 = collection(db, "barangayCertificate");
    onSnapshot(colRef3, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().bgyCertificateCounter);
            counterConvert += fbStoreCount;
        })
        counter3 = counterConvert;
    })


    //barangay clearance count
    let counter4 = 0;
    const colRef4 = collection(db, "barangayClearance");
    onSnapshot(colRef4, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().bgyClearanceCounter);
            counterConvert += fbStoreCount;
        })
        counter4 = counterConvert;
    })


    //complaint count
    let counter5 = 0;
    const colRef5 = collection(db, "complaints");
    onSnapshot(colRef5, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().complaintCounter);
            counterConvert += fbStoreCount;
        })
        counter5 = counterConvert;
    })



</script>

<div class="flex justify-start flex-wrap gap-2 m-10">
    <!--Regitered voters-->
    <div in:fly={{y:300, duration:1000}}>
        
        <div class="text-xs font-bold text-white  p-2 bg-black rounded-lg m-2 absolute">{counter}</div>
        <div class="max- bg-guiColor">
            <p class="text-xs font-bold p-14 cursor-not-allowed text-white">REGISTERED VOTERS </p>
        </div>
    </div>

    <!--TOTAL ID REQUEST-->
    <div in:fly={{y:-300, duration:1000}}>
        <div class="text-xs font-bold text-white  p-2 bg-black rounded-lg m-2 absolute">{counter2}</div>
        <div class="max- bg-guiColor">
            <p class="text-xs font-bold p-14 cursor-not-allowed text-white">TOTAL ID REQUEST</p>
        </div>
    </div>
    <!--TOTAL CERTIFICATE REQUEST-->
    <div in:fly={{y:300, duration:1000}}>
        <div class="text-xs font-bold text-white  p-2 bg-black rounded-lg m-2 absolute">{counter3}</div>
        <div class="max- bg-guiColor">
            <p class="text-xs font-bold p-14 cursor-not-allowed text-white">TOTAL CERTIFICATE</p>
        </div>
    </div>

    <!--TOTAL CLEARANCE REQUEST-->
    <div in:fly={{y:-300, duration:1000}}>
        <div class="text-xs font-bold text-white  p-2 bg-black rounded-lg m-2 absolute">{counter4}</div>
        <div class="max- bg-guiColor">
            <p class="text-xs font-bold p-14 cursor-not-allowed text-white">TOTAL CLEARANCE</p>
        </div>
    </div>

    <!--TOTAL OF COMPLAINT-->
    <div in:fly={{y:300, duration:1000}}>
        <div class="text-xs font-bold text-white  p-2 bg-black rounded-lg m-2 absolute">{counter5}</div>
        <div class="max- bg-guiColor">
            <p class="text-xs font-bold p-14 cursor-not-allowed text-white">TOTAL COMPLAINT</p>
        </div>
    </div>
</div>