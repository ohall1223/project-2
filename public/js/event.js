const newEventHandler = async (event) => {
  event.preventDefault();

  const patient_id = document.querySelector("#patientID").value.trim();
  const temperature = document
    .querySelector("#current-temperature")
    .value.trim();
  const temperatureTime = document.querySelector("#temp-time").value.trim();
  const medication = document.querySelector("#medication-taken").value.trim();
  const medicationTime = document
    .querySelector("#medication-time")
    .value.trim();
  const currentSymptoms = document
    .querySelector("#current-symptoms")
    .value.trim();
  const additionalInfo = document
    .querySelector("#additional-info")
    .value.trim();
  const eventDate = document.querySelector("#event-date").value.trim();
  if (temperature && temperatureTime) {
    const response = await fetch("/api/event", {
      method: "POST",
      body: JSON.stringify({
        temperature,
        temperatureTime,
        medication,
        medicationTime,
        currentSymptoms,
        additionalInfo,
        eventDate,
        patient_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
    } else {
      alert("Failed to patient creation.");
    }
  }
};

document
  .querySelector(".create-event")
  .addEventListener("submit", newEventHandler);
