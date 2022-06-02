// NETPIE
const appID = "Mill";
const sessionKey = "fhbbF2Dr7HIeSUF";
const sessionSecret = "jE9nukdPeEujEC1P289nDWRIu";

// Current session
const ALIAS = "t2";
var microgear = Microgear.create({
    key: sessionKey, secret: sessionSecret, alias: ALIAS
});

// Microgear Connection
microgear.on('connected', function() {
    microgear.setAlias(ALIAS);
    html_connection_status.innerHTML = "connected to NETPIE";
});


/* Handler */
function updateDate(){
    const currentTime = getCurrentTime();
    html_latest_detection.innerHTML = `Latest Detection at ${currentTime} with distance = ${val_ULT} and light ${val_LDR}`;
}
microgear.on('message', function(topic,msg) {
    console.log("on message | topic, msg = ", topic, msg)

    if (msg.length == 13){
        let arr = msg.split("#");
        // console.log(arr);
        val_ULT = arr[0];
        val_LDR = arr[1];
        val_PIR = arr[2];

        html_number_ULT.innerHTML = Number(val_ULT);
        html_number_LDR.innerHTML = Number(val_LDR);
        
        console.log(val_PIR)
        if (val_PIR == 1){
            updateDate();
            html_number_PIR.innerHTML = "Detected";

        }
        else{
            html_number_PIR.innerHTML = "No detection";
        }
    }
});
// microgear.on('closed', function(){
//     console.log("disconnected");
//     html_status.innerHTML = "disconnected";
// });
// microgear.on('disconnect', function(){
//     console.log("disconnected");
//     html_status.innerHTML = "disconnected";
// });
// microgear.on("error", function(err) {
//     console.log("Error: "+err);
//     html_status.innerHTML = err;
// });
// microgear.on("warning", function(msg) {
//     console.log("Connection rejected: "+msg);
// });
// microgear.on("message", function(topic,msg) {
//     console.log("Incoming message: "+mesage);
//    });
// microgear.on("present", function(event) {
//     console.log("New friend found: "+event.gearkey);
//    });   
// microgear.on("absent", function(event) {
//     console.log("Friend lost: "+event.gearkey);
//    });

   
   
button_connect.addEventListener("click", () => microgear.connect(appID));

/* ============================================================ */

