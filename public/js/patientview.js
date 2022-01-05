// ---------------------------------------
// rewrite code to allow for patient rendering onto patientView page!!!!!!!

const fetchPatients = async (event) => {
  const data = await fetch("/api/patient/group").then((res) => res.json());
  console.log(data);
  const select = document.querySelector("#patientView");

  const options = data.patients.map(
    (patient) =>
      `<li value="${patient.id}">${patient.firstName} ${patient.lastName}</li>`
  );

  select.innerHTML = options.join(" ");
};
fetchPatients();

// --------------------------------------------
