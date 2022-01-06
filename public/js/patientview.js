// ---------------------------------------
// rewrite code to allow for patient rendering onto patientView page!!!!!!!

const fetchPatientInfo = async () => {
  const data = await fetch("/api/patient/group").then((res) => res.json());
  console.log(data);
  const select = document.querySelector("#patientCard");

  const options = data.patients.map(
    (patient) =>
      `<section class="flex flex-row justify-center m-4 p-2">
    <div class="mx-auto p-4 bg-white rounded-lg shadow-xl" id="patientCard">
      <h1 class="text-2xl border-b-4">${patient.firstName}</h1>
      <ul>
        <li>First Name: ${patient.weight}</li>
        <li>Height: ${patient.height}</li>
        <li>Pharmacy: ${patient.pharmacy}</li>
      </ul>
    </div>
  </section>`
  );

  select.innerHTML = options.join(" ");
};
fetchPatientInfo();

// --------------------------------------------
