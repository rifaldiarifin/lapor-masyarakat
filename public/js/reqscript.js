const edit = document.getElementById("editdata");
edit.addEventListener("click", () => {
    interAlertMessage("Edit Successfully", "Yeayy, your profile successfully changed!", "success", "That i want :D")
        .then(res => {
            console.log("OK !!" + res);
        })
        .catch(res => {
            console.log("CLOSE" + res);
        });
});
const signout = document.getElementById("signout");
signout.addEventListener("click", () => {
    interAlertConfirm("Signout", "Are you sure?", "danger")
        .then(res => {
            console.log("SIGNOUT" + res);
        })
        .catch(res => {
            console.log("CANCELED" + res);
        });
});