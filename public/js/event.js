const newEventHandler = async (event) => {
  event.preventDefault();

  const patient_id = document.querySelector("#patientID").value.trim();
  const temperature = document
    .querySelector("#current-temperature")
    .value.trim();
  
  const temperatureTimeHours = document.querySelector("#temperature-time-hours").value.trim();
  const temperatureTimeMinutes = document.querySelector("#temperature-time-minutes").value.trim();
  const temperatureTimeAMPM = document.querySelector("#temperature-time-ampm").value.trim();
  
  const temperatureTime = temperatureTimeHours.concat(":", temperatureTimeMinutes, temperatureTimeAMPM)


  const medication = document.querySelector("#medication-taken").value.trim();


  const medicationTimeHours = document.querySelector("#medication-time-hours").value.trim();
  const medicationTimeMinutes = document.querySelector("#medication-time-minutes").value.trim();
  const medicationTimeAMPM = document.querySelector("#medication-time-ampm").value.trim();

  const medicationTime = medicationTimeHours.concat(":", medicationTimeMinutes, medicationTimeAMPM)
  
  
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
      document.location.replace("/patientview");
    } else {
      alert("Failed to patient creation.");
    }
  }
};

document
  .querySelector(".create-event")
  .addEventListener("submit", newEventHandler);
