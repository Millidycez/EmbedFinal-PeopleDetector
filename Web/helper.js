function randInt(min, max) {
    let output = Math.floor(Math.random() * (max - min + 1) ) + min;
    return output;
}

function getCurrentTime(){
    const now = new Date();
    const times = [now.getHours(), now.getMinutes(), now.getSeconds()];
    /*
    getHours, getMinutes, getSeconds will return only digit if < 10
    ex. 00:02:34 : getHours => 0 getMinutes => 2 getSeconds => 34
    This map will map each entry (0, 2), add each with 0 infront
    ==> 00, 02, 034

    Then we only use the last two digits
    ==> 00, 02, 34
    #DONE
    */
    let output = times.map(item => ("0" + item).slice(-2));
    return now.toISOString().slice(0, 10) + " @ " + output.join(":");
}


