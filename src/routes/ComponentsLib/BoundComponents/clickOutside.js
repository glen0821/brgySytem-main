import { writable } from "svelte/store";

export const showSlider = writable(false);
export const showNav = writable(false);
export const navSelections = writable("Dashboard");

//list of registered voters
export const showAdd = writable(false);
export const onSnaps = writable([]);
export const showEditModalLogic = writable(false);
export const compareValue = writable("");


//barangay ID
export const showAddModal = writable(false);
export const onSnapsBgyID = writable([]);
export const compareIDvalue = writable("");
export const cordionLogic = writable(false);

//barangay certificate 
export const onSnapsBgyCert = writable([]);
export const showCertEditLogic = writable(false);
export const showCertAddModal = writable(false);
export const  compareCertValue = writable("");



//barangay clearance
export const onSnapsClearance = writable([]);
export const showClearanceEditLogic = writable(false);
export const showClearanceAddModal = writable(false);
export const compareClearanceValue = writable("");

//complaints
export const onSnapsComplaint = writable([]);
export const showComplaintAddModal = writable(false);
export const compareComplaintValue = writable("");

