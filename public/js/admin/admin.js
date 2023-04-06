const createAccountAsAdmin = () => {
    const form = document.getElementById("createaccount");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        setInterLoading();
        const formSubmit = $(form);
        const actionUrl = form.getAttribute("action");
        $.ajax({
            type: "post",
            url: actionUrl,
            data: formSubmit.serialize(),
            dataType: "json",
            success: function (response) {
                    // console.log(response);
                }
            });
            setTimeout(async () => {
                await removeInterLoading();
                openPage({
                    path: '/admin/datapersonal', 
                    containerID: 'content',
                    animType: 'fadeout'
                });
            }, 0400);
        });
}

const editAccountAsAdmin = () => {
    const form = document.getElementById("editaccount");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        setInterLoading();
        const formSubmit = $(form);
        const actionUrl = form.getAttribute("action");
        
        setTimeout(() => {
            $.ajax({
                type: "post",
                url: actionUrl,
                data: formSubmit.serialize(),
                dataType: "json",
                success: function (response) {
                        // console.log(response);
                    }
                });
                setTimeout(() => {
                    removeInterLoading();
                    openPage({
                        path: '/admin/datapersonal', 
                        containerID: 'content',
                        animType: 'fadeout'
                    });
                }, 0400);
        }, 1000);
    });
}

const deleteAccount = (pengaduanUID) => {
    setInterLoading();
    $.ajax({
        type: "post",
        url: "/admin/datapersonal/hapusakun",
        data: {keyAccount : pengaduanUID},
        dataType: "json",
        success: function (response) {
        }
    });
    setTimeout(() => {
        removeInterLoading();
            openPage({
                path: '/admin/datapersonal',
                containerID: 'content',
                animType: 'fadein'
            });
    }, 0400);
}


const signout = () => {
    location.href = "/admin/signout";
}