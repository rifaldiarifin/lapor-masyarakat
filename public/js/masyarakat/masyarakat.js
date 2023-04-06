const rincianlaporan = () => {
    const form = document.getElementById("buatlaporan");
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        setInterLoading();
        const formSubmit = $(form);
        const actionUrl = form.getAttribute("action");
        // openPage({
        //     path: '/home/laporanpengaduan',
        //     containerID: 'content',
        //     animType: 'fadeout',
        //     method: "POST",
        //     data: {data: formSubmit.serialize()},
        // });
        setTimeout(() => {
            $.ajax({
            type: "POST",
            url: actionUrl,
            data: formSubmit.serialize(), // serializes the form's elements.
            success: function(data)
            {
                setTimeout(() => {
                    removeInterLoading();
                    console.log(data); // show response from the php script.
                }, 0400);
            }
        });
        }, 1000);
    });
}

// const rincianLaporan = async (pengaduanUID) => {
//     await clearTimeout();
    
//     // body.classList.add("offscroll");
//     // elmnt.parentElement.classList.add("offscroll");

//     const animNow = `page-${animType}-now`,
//         animAfter = `page-${animType}-after`;

//     elmnt.classList.remove(animNow);
//     elmnt.classList.remove(animAfter);

//     elmnt.classList.add(animNow);
//     setTimeout(async () => {
        
//         $.ajax({
//             type: "post",
//             url: "/home/laporanpengaduan/bukalaporan",
//             data: {
//                 data : pengaduanUID
//             },
//             dataType: "json",
//             success: function (response) {
//                 console.log(response)
//             }
//         });

//         elmnt.classList.remove(animNow);
//         elmnt.classList.add(animAfter);
//         setTimeout(() => {
//             elmnt.classList.remove(animAfter);

//             // body.classList.remove("offscroll");
//             // elmnt.parentElement.classList.remove("offscroll");
        
//         }, 300);
//     }, 300);
    
// }

const editlaporan = () => {
    const form1 = document.getElementById("editlaporan");
    form1.addEventListener("submit", (e) => {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        setInterLoading();
        const formSubmit = $(form1);
        const actionUrl = form1.getAttribute("action");
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: formSubmit.serializeArray(),
            dataType: "json",
            success: function (response) {
                console.log(response);
            }
        });
        setTimeout(() => {
            removeInterLoading();
            openPage({
                path: '/home/laporanpengaduan',
                containerID: 'content',
                animType: 'fadein'
            });
        }, 0700);
    });
}

const deleteLaporan = (pengaduanUID) => {
    setInterLoading();
    $.ajax({
        type: "POST",
        url: "/home/laporanpengaduan/hapuslaporan",
        data: {pengaduanUID : pengaduanUID},
        dataType: "json",
        success: function (response) {
        }
    });
    setTimeout(() => {
        removeInterLoading();
        openPage({
            path: '/home/laporanpengaduan',
            containerID: 'content',
            animType: 'fadein'
        });
    }, 0700);
}


const signout = () => {
    location.href = "/home/signout";
}