const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // document.location.replace("/");
    console.log("successful logout")
  } else {
    alert("Failed to log out.");
  }
};

document
  .querySelector("#logout")
  .addEventListener("click", logout);
