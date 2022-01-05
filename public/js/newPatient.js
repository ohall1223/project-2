const newPatient = async (event) => {
  event.preventDefault();
  document.location.replace("/journal");
};

const createPatient = async (event) => {
  console.log(createPatient);
  event.preventDefault();

  const firstName = document.querySelector("#firstName").value.trim();
  const lastName = document.querySelector("#lastName").value.trim();
  const height = document.querySelector("#height").value.trim();
  const weight = document.querySelector("#weight").value.trim();
  const currentMeds = document
    .querySelector("#current-medication")
    .value.trim();
  const primaryPhysician = document.querySelector("#primary-care").value.trim();
  const pharmacy = document.querySelector("#current-pharmacy").value.trim();
  if (firstName && lastName) {
    const response = await fetch("/api/patient", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        height,
        weight,
        currentMeds,
        primaryPhysician,
        pharmacy,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      document.location.replace("/journal");
    } else {
      alert("Failed to patient creation.");
    }
  }
};

// redirect to journal for now
//   document.location.replace("/journal")

document
  .querySelector(".create-patient")
  .addEventListener("submit", createPatient);

document.querySelector("#new-patient").addEventListener("click", newPatient);
