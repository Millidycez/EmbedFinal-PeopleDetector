// for testing without NETPIE api
const html_text_test = document.querySelector("#test");

let val_LDR = val_ULT = val_PIR = -1;
function refreshNum(){
    // val_ULT = randInt(0,400);
    val_ULT = "0005";
    val_LDR = randInt(0,4096);
    val_PIR = randInt(0,1);
}
function test_updateDate(){
    const currentTime = getCurrentTime();
    html_text_test.innerHTML = `Latest Detection at @ ${currentTime} with distance = ${val_ULT} and light ${val_LDR}`;
}
function updateNum(){
    html_number_ULT.innerHTML = Number(val_ULT);
    html_number_LDR.innerHTML = Number(val_LDR);
    html_number_PIR.innerHTML = val_PIR;
    if (val_PIR == 1){
        test_updateDate();
    }
}

let interval = null;
button_connect.addEventListener("click", function() {
    interval = setInterval(function(){
    refreshNum();
    updateNum();
}, 400)
});


