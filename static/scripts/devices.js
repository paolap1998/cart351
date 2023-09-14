function refreshDevices(){
    callApi("GET", DEVICES, null, handleDevicesResponse);
}

function handleDevicesResponse(){
    if(this.status == 200){
        let data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems("devices"); //clears option menu
        data.devices.forEach(item => addDevice(item)); // populates option menu with all devices
    }
    else if(this.status == 401){
        refreshAccessToken();
    }
    else {
        console.log(this.responseText)
        alert(this.responseText);
    }
}

function removeAllItems(elementId){
    let node = document.getElementById(elementId);
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
}

function addDevice(item){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices").appendChild(node);
}


function deviceId(){
    return document.getElementById("devices").value;
}

// gets called when change device button is clicked
// function transfer(){
//     refreshDevices(); 
//     let body = {};
//     body.device_ids = [];
//     body.device_ids.push(deviceId())
//     callApi( "PUT", PLAYER, JSON.stringify(body), handleApiResponse );
// }