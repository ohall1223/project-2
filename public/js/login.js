const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  //remember ./users assigned directory
  if (email) {
    if (email && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/form");
      } else {
        alert("Failed to log in.");
      }
    }
  } else {
    alert("You will need to provide the email you used to sign up.")
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  // const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const checkPassword = document.querySelector("#password-confirm").value.trim();

    console.log(password === checkPassword)

  if (email) {
    if (password) {
      if (checkPassword) {
        if (password === checkPassword) {
          const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });
          // alert("Signup Successful!")
          if (response.ok) {
            
            document.location.replace("/");
          } else {
            alert("Failed to sign up.");
          }
        } else {
          alert("The passwords must match")
        }
      } else {
        alert("The Confirm Password field needs to be filled out")
      }
    } else {
      alert("The Password field needs to be filled out.")
    }
  } else {
    alert("No email provided.")
  }
}
;

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
