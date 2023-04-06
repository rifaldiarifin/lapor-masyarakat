const konfirmasiLaporan = (pengaduanUID, path = "/petugas/datalaporan") => {
    setInterLoading();
    $.ajax({
        type: "post",
        url: "/petugas/konfirmasilaporan",
        data: {konfirmasiUID: pengaduanUID},
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
    setTimeout(() => {
        removeInterLoading();
        openPage({
            path: path,
            containerID: 'content',
            animType: 'fadein',
        });
    }, 0700);
}

const tanggapiLaporan = (path) => {
    const formtanggapi = document.getElementById("tanggapilaporan"),
          pengaduanUID = formtanggapi.querySelector("input[name='pengaduanUID']"),
          tanggapan = formtanggapi.querySelector("textarea"),
          tanggapanSpanError = tanggapan.parentElement.querySelector("span[data-msginput]"),
          verifikasi = formtanggapi.querySelector("input[type='checkbox']");
          
          let verify = "false";
          verifikasi.checked == true ? verify = 1 : verify = 0;
          
          if(tanggapan.value.length !== 0){
            interAlertConfirm({
                title: "Konfirmasi & Selesai",
                description: "Anda yakin ingin mengakhiri dan memberi tanggapan langsung?",
                alertType: "warning",
                accept: () => {
                    setInterLoading();
                    const formSubmit = $(formtanggapi);
                    const actionUrl = formtanggapi.getAttribute("action");
                    // openPage({
                    //     path: '/home/laporanpengaduan',
                    //     containerID: 'content',
                    //     animType: 'fadeout',
                    //     method: "POST",
                    //     data: {data: formSubmit.serialize()},
                    // });
                    $.ajax({
                    type: "POST",
                    url: actionUrl,
                    data: {
                        pengaduanUID: pengaduanUID.value,
                        tanggapan: tanggapan.value,
                        verify: verify,
                    }, // serializes the form's elements.
                    success: function(data)
                        {
                            console.log(data); // show response from the php script.
                            setTimeout(() => {
                                removeInterLoading();
                                openPage({
                                    path: path,
                                    containerID: 'content',
                                    animType: 'fadein',
                                });
                            }, 0700);
                        }
                    });
                }
            })
          } else {
            setMsgInput(tanggapanSpanError, "Cannot be empty!");
            tanggapanSpanError.parentElement.classList.add("alert");
          }
    // formtanggapi.addEventListener("click", (e) => {
        // e.preventDefault(); // avoid to execute the actual submit of the form.
    // });
}
const tanggapiLaporanProses = (path) => {
    const formtanggapi = document.getElementById("tanggapilaporan"),
          pengaduanUID = formtanggapi.querySelector("input[name='pengaduanUID']"),
          tanggapan = formtanggapi.querySelector("textarea"),
          tanggapanSpanError = tanggapan.parentElement.querySelector("span[data-msginput]"),
          verifikasi = formtanggapi.querySelector("input[type='checkbox']");
          
          let verify = "false";
          verifikasi.checked == true ? verify = 1 : verify = 0;
          
          if(tanggapan.value.length !== 0){
            setInterLoading();
                const formSubmit = $(formtanggapi);
                const actionUrl = formtanggapi.getAttribute("action");
                $.ajax({
                type: "POST",
                url: actionUrl,
                data: {
                    pengaduanUID: pengaduanUID.value,
                    tanggapan: tanggapan.value,
                    verify: verify,
                }, // serializes the form's elements.
                success: function(data)
                    {
                        console.log(data); // show response from the php script.
                        setTimeout(() => {
                            removeInterLoading();
                            openPage({
                                path: path,
                                containerID: 'content',
                                animType: 'fadein',
                            });
                        }, 0700);
                    }
                });
          } else {
            setMsgInput(tanggapanSpanError, "Cannot be empty!");
            tanggapanSpanError.parentElement.classList.add("alert");
          }
    // formtanggapi.addEventListener("click", (e) => {
        // e.preventDefault(); // avoid to execute the actual submit of the form.
    // });
}

const signout = () => {
    location.href = "/petugas/signout";
}