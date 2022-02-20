async function newFormHandler(event) {
    event.preventDefault();
  
    const newEmployee = document.querySelector(
      'input[manager-id="manager_id", last-day="last_day", symptom-start="symptom_start"]'
    ).value;
  
    const response = await fetch(`/api/employees`, {
      method: "POST",
      body: JSON.stringify({
        manager_id,
        last_day,
        symptom_start,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector(".new-employee-form")
    .addEventListener("submit", newFormHandler);
  