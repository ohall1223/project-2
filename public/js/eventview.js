const fetchEvents = async () => {
  console.log("in fetch events");
  const data = await fetch("/api/event/group").then((res) => res.json());
  console.log(data);
  const select = document.querySelector("#eventCard");

  const options = data.map(
    (data) =>
      `<section class="flex justify-evenly m-4 p-2">
      <div class="mx-auto p-4 bg-white rounded-lg shadow-xl" id="eventCard">
       
        <ul>
          <li>Temperature: ${data.temperature}</li>
          <li>Time of Temperature: ${data.temperatureTime}</li>
          <li>Medication Taken: ${data.medication}</li>
          <li>Medication Time: ${data.medicationTime}</li>
          <li>Current Symptoms: ${data.currentSymptoms}</li>
          <li>Additional Information: ${data.additionalInfo}</li>
          <li>Event Date: ${data.eventDate}</li>
        </ul>
      </div>
    </section>`
  );

  select.innerHTML = options.join(" ");
};
fetchEvents();
