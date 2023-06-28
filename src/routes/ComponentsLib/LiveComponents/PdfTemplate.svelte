<script>
    import BACOOR_LOGO from "$lib/assets/logo.png";
    import SN_LOGO from "$lib/assets/sn3.png";
    import LOADING_ICON from "$lib/assets/spinning.svg";
    export let name = "JUAN DELA CRUZ";
    export let age = 99;
    export let processedBy = "JUAN DELA CRUZ";
    export let barangayCaptain = "JUAN DELA CRUZ";
    export let activity = "ACTIVITY";
    export let isHidden = true;
    export let date = {
        day: "1",
        month: "JANUARY",
        year: "2023",
    };

    // export let printFunc = function () {
    //     console.log("EMPTY FUNCTION FOR PRINT");
    // };
</script>

<!-- <button on:click={printFunc} class="">Print</button> -->

<div class="relative">
    <div class="w-full h-full absolute inset-0 bg-white flex items-center justify-center" class:hidden={isHidden}>
        <img src={LOADING_ICON} alt="loading please wait" >
    </div>
    <div
        id="pdf-template"
        class="p-2 mx-auto w-full flex flex-col gap-12"
        class:hidden={isHidden}
    >
        <div class="flex items-center">
            <div class="w-36 h-36">
                <img src={SN_LOGO} alt="SAN-NICOLAS-3" class="object-cover" />
            </div>
            <div class="w-full flex flex-col text-center">
                <span>Republic of the Philippines</span>
                <span>Province of Cavite</span>
                <span>City of Bacoor</span>
                <span>BARANGAY SAN NICOLAS III</span>
                <h1 class="font-bold text-center mt-10">
                    BARANGAY CERTIFICATION
                </h1>
            </div>
            <div class="w-32 h-32">
                <img src={BACOOR_LOGO} alt="BACOOR" class="object-cover" />
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <p class="font-bold">TO WHOM IT MAY CONCERN:</p>
            <p class="para">
                This is to certify that <span>{name}</span>, <span>{age}</span>
                years of age, Filipino, appeared here in this office of Barangay
                Hall San Nicolas III City of Bacoor Cavite and conducted
                <span>{activity}</span>.
            </p>
            <p class="para">
                This certificate of appearance is being issued upon request of
                the above mentioned name for whatever legal purposes it may
                serve.
            </p>
            <p class="para">
                Issued this <span>
                    {date.day}
                </span>
                of
                <span>
                    {date.month}
                </span>
                <span>
                    {date.year}
                </span>
                at the office of the Barangay Hall San Nicolas III City of Bacoor,
                Cavite.
            </p>
            <p class="pt-8">PROCESSED BY:</p>
            <div class="flex flex-col self-start justify-center pt-10">
                <span class="border-b-2">{processedBy}</span>
                <p class="text-center">Barangay Secretary</p>
            </div>
            <div class="flex flex-col self-end justify-center pt-8">
                <p class="mb-10">Respectfully yours:</p>
                <span class="border-b-2">{barangayCaptain}</span>
                <p class="text-center">Punong Barangay</p>
            </div>
        </div>
    </div>
</div>

<style>
    * {
        padding-bottom: 4px;
    }

    #pdf-template {
        font-family: "Times New Roman", Times, serif;
    }

    span {
        font-weight: bold;
    }

    p.para {
        text-indent: 10%;
    }
</style>
