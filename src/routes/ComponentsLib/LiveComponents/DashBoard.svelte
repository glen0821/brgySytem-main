<script>
  //database callse and hooks
  import { auth, db } from "../../db/firebase";
  import { onSnapshot, collection, doc } from "firebase/firestore";

  import { fly } from "svelte/transition";

  //listofvoters count
  let counter = 0;
  const colRef = collection(db, "votersList");
  onSnapshot(colRef, (snapshots) => {
    let counterConvert = 0;
    snapshots.docs.forEach((doc) => {
      let fbStoreCount = Number(doc.data().voterCounter);
      counterConvert += fbStoreCount;
    });
    counter = counterConvert;
  });

  //barangay requst id count
  let counter2 = 0;
  const colRef2 = collection(db, "barangayID");
  onSnapshot(colRef2, (snapshots) => {
    let counterConvert = 0;
    snapshots.docs.forEach((doc) => {
      let fbStoreCount = Number(doc.data().barangayCounter);
      counterConvert += fbStoreCount;
    });
    counter2 = counterConvert;
  });

  //barangay certificate count
  let counter3 = 0;
  const colRef3 = collection(db, "barangayCertificate");
  onSnapshot(colRef3, (snapshots) => {
    let counterConvert = 0;
    snapshots.docs.forEach((doc) => {
      let fbStoreCount = Number(doc.data().bgyCertificateCounter);
      counterConvert += fbStoreCount;
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

<div class="flex w-full bg-gray-50 min-h-screen">
  <div class="w-5/6 flex flex-wrap space-x-10  m-10 justify-center">
    <!--Regitered voters-->
    <div in:fly={{ y: 300, duration: 1000 }}>
      <div
        class="text-xs font-bold text-black px-2 py-1 bg-orange-300 rounded-full m-2 absolute z-10"
      >
        {counter}
      </div>
      <div class="max- bg-white rounded-lg drop-shadow-sm">
        <p class="text-base font-bold p-14  text-black capitalize hover:underline duration-700">
          register voters
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
          <p class="text-base font-bold p-14  text-black capitalize hover:underline duration-700">
            Total id request
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
          <p class="text-base font-bold p-14  text-black capitalize hover:underline duration-700">
           Total certificate
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
          <p class="text-base font-bold p-14  text-black capitalize hover:underline duration-700">
          total clearance
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
          <p class="text-base font-bold p-14  text-black capitalize hover:underline duration-700">
           total complaint
          </p>
        </div>
      </div>

  </div>
</div>
