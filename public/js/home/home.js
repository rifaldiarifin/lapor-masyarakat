const backToSignin = () => {
    openPage('/backsignin', 'content', 'fadeout');
}

const signout = () => {
    location.href = "/";
}

const openURL = (path, script = () => {}) => {
    location.href = path;
    script();;
}

const timeline2 = () => {
    setTimeout(() => {
        interTimelineStep();
    }, 1200);
}

const pageform = (option, tab) => {
    const tabMultiple = document.querySelectorAll(".tab-form");
    if(option == "prev"){
        tabMultiple[tab].classList.remove("active");
        tabMultiple[tab - 1].classList.add("active");
    } else if (option == "next"){
        tabMultiple[tab].classList.remove("active");
        tabMultiple[tab + 1].classList.add("active");
    }
}

const createaccount = () => {
    const form = document.getElementById("multiple-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        setInterLoading();
        const formSubmit = $(form);
        const actionUrl = form.getAttribute("action");
        
        setTimeout(() => {
            $.ajax({
                type: "post",
                url: actionUrl,
                data: formSubmit.serializeArray(),
                dataType: "json",
                success: function (response) {
                        setTimeout(() => {
                            removeInterLoading();
                            openPage({
                                path: '/signup/signupsuccess', 
                                containerID: 'content',
                                animType: 'fadein'
                            });
                        }, 0400);
                        console.log(response);
                    }
                });
        }, 1000);
    });
}