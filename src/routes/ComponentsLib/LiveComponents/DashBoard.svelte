<script>
  //database callse and hooks
  import { auth, db } from "../../db/firebase";
  import { onSnapshot, collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";
  import { onMount } from "svelte";

  import { fly } from "svelte/transition";

  //listofvoters count
  let counter = 0;
  const colRef = collection(db, "votersList");

  
// $: counterDaTa = getTotalCountDataCollections();

//   const getTotalCountDataCollections = async () => { 
//     const data =  await getDocs(colRef)



//     counter = data.docs.length
    

//   }
  onSnapshot(colRef, (snapshots) => {
   let counterConvert = 0;
    snapshots.docs.forEach((doc) => {
      // let fbStoreCount = Number(doc.data().voterCounter);
      counterConvert += 1;
    });
    counter = counterConvert;
  });

  //barangay requst id count
  let counter2 = 0;
  const colRef2 = collection(db, "barangayID");
  const q2 = query(colRef2, orderBy("createdAt", "desc"));
  onSnapshot(q2, (snapshots) => {
    let counterConvert = 0;
    snapshots.docs.forEach((doc) => {
      // let fbStoreCount = Number(doc.data().barangayCounter);
      counterConvert += 1;
    });
    counter2 = counterConvert;
  });

  //barangay certificate count
  let counter3 = 0;
  const colRef3 = collection(db, "barangayCertificate");
  const q3 = query(colRef3, orderBy("createdAt", "desc"));
  onSnapshot(q3, (snapshots) => {
    let counterConvert = 0;
    snapshots.docs.forEach((doc) => {
      // let fbStoreCount = Number(doc.data().bgyCertificateCounter);

      const data = {...doc.data()}

      counterConvert += 1;
    });
    counter3 = counterConvert;
  });

  //barangay clearance count
  let counter4 = 0;
  const colRef4 = collection(db, "barangayClearance");
  onSnapshot(colRef4, (snapshots) => {
    let counterConvert = 0;
    snapshots.docs.forEach((doc) => {
      let fbStoreCount = Number(doc.data().bgyClearanceCounter);
      counterConvert += fbStoreCount;
    });
    counter4 = counterConvert;
  });

  //complaint count
  let counter5 = 0;
  const colRef5 = collection(db, "complaints");
  onSnapshot(colRef5, (snapshots) => {
    let counterConvert = 0;
    snapshots.docs.forEach((doc) => {
      let fbStoreCount = Number(doc.data().complaintCounter);
      counterConvert += fbStoreCount;
    });
    counter5 = counterConvert;
  });
</script>

<div class="flex w-full bg-gray-100 min-h-screen justify-center">
  <div class="w-5/6 h-32 grid grid-cols-3 grid-flow-row gap-5 mt-10">
    <!--Regitered voters-->
    <div in:fly={{ y: 300, duration: 1000 }}>
      <div
        class="text-xs font-bold text-black px-2 py-1 bg-orange-300 rounded-full m-2 absolute z-10"
      >
        {counter}
      </div>
      <div class="max- bg-white rounded-lg drop-shadow-sm">
        <p class="text-3xl font-bold p-14  text-black capitalize hover:scale-105 duration-700 flex items-center gap-5">
          <span>
            <i class="fi fi-rr-vote-yea"></i>
          </span>
         <span>register voters</span> 
        </p>
      </div>
    </div>

    <!--TOTAL ID REQUEST-->

    <div in:fly={{ y: 300, duration: 1000 }}>
        <div
          class="text-xs font-bold text-black px-2 py-1 bg-orange-300 rounded-full m-2 absolute z-10"
        >
          {counter2}
        </div>
        <div class="max- bg-white rounded-lg drop-shadow-sm">
          <p class="text-3xl font-bold p-14  text-black capitalize hover:scale-105 duration-700">

            <span>
              <i class="fi fi-rr-id-badge"></i>
            </span>
            <span>
              Total id request
            </span>
            
          </p>
        </div>
      </div>

    <!--TOTAL CERTIFICATE REQUEST-->
    <div in:fly={{ y: 300, duration: 1000 }}>
        <div
          class="text-xs font-bold text-black px-2 py-1 bg-orange-300 rounded-full m-2 absolute z-10"
        >
          {counter3}
        </div>
        <div class="max- bg-white rounded-lg drop-shadow-sm">
          <p class="text-3xl font-bold p-14  text-black capitalize hover:scale-105 duration-700">
            <span><i class="fi fi-rr-diploma"></i></span>
            <span>
              Total certificate
            </span>
          </p>
        </div>
      </div>
  
    <!--TOTAL CLEARANCE REQUEST-->
    <div in:fly={{ y: 300, duration: 1000 }}>
        <div
          class="text-xs font-bold text-black px-2 py-1 bg-orange-300 rounded-full m-2 absolute z-10"
        >
          {counter4}
        </div>
        <div class="max- bg-white rounded-lg drop-shadow-sm">
          <p class="text-3xl font-bold p-14  text-black capitalize hover:scale-105 duration-700">

            <span>
              <i class="fi fi-rr-memo"></i>
            </span>
            <span>
              total clearance
            </span>
          </p>
        </div>
      </div>
  

    <!--TOTAL OF COMPLAINT-->
    <div in:fly={{ y: 300, duration: 1000 }}>
        <div
          class="text-xs font-bold text-black px-2 py-1 bg-orange-300 rounded-full m-2 absolute z-10"
        >
          {counter5}
        </div>
        <div class="max- bg-white rounded-lg drop-shadow-sm">
          <p class="text-3xl font-bold p-14  text-black capitalize hover:scale-105 duration-700">

            <span>
              <i class="fi fi-rr-memo-pad"></i>
            </span>
            <span>
              total complaint
            </span>
          
          </p>
        </div>
      </div>

  </div>
</div>
