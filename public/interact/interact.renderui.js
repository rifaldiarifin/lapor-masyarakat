const animPage = async (animType, elmnt, renderSomething) => {
    await clearTimeout();
    
    // body.classList.add("offscroll");
    // elmnt.parentElement.classList.add("offscroll");

    const animNow = `page-${animType}-now`,
        animAfter = `page-${animType}-after`;

    elmnt.classList.remove(animNow);
    elmnt.classList.remove(animAfter);

    elmnt.classList.add(animNow);
    setTimeout(async () => {
        await renderSomething();
        elmnt.classList.remove(animNow);
        elmnt.classList.add(animAfter);
        setTimeout(() => {
            elmnt.classList.remove(animAfter);

            // body.classList.remove("offscroll");
            // elmnt.parentElement.classList.remove("offscroll");
        
        }, 300);
    }, 300);
}

const renderUI = (elmntID, value, moreScript = () => {}) => {
    elmntID.innerHTML = value;
    loadScripts("content");
    moreScript();
}

const reqUI = async (path, method = "GET") => {
    let structureUI = "";
    await fetch(path, {
        method: method,
    })
        .then(response => response.text())
        .then(response => structureUI = response);
    return structureUI;
}

let pathContent = window.location.pathname;
const openPage = async ({
    path, 
    containerID, 
    animType = null, 
    method = "GET",
    load = moreScript = () => {}
}) => {
    const container = document.getElementById(containerID);
    const structureUI = await reqUI(path, method);
    await clearTimeout();
    if(animType !== null){
        if(pathContent !== path){
            animPage(animType, container, () => {
                renderUI(container, structureUI, load);
                pathContent = path;
            });
        } else {
            renderUI(container, structureUI, load);
            pathContent = path;
        }
    } else {
        setTimeout(() => {
            if (directionNavPoint > directionNavPointBefore) {
                animPage("next", container, () => {
                    renderUI(container, structureUI, load);
                    pathContent = path;
                });
            } else if (directionNavPoint < directionNavPointBefore) {
                animPage("prev", container, () => {
                    renderUI(container, structureUI, load);
                    pathContent = path;
                });
            } else {
                if(pathContent !== path){
                    animPage("fadeout", container, () => {
                        renderUI(container, structureUI, load);
                        pathContent = path;
                    });
                } else {
                    renderUI(container, structureUI, load);
                    pathContent = path;
                }
            }
        }, 50);
    }
}