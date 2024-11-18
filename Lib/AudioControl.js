function pauseAfterSeconds(audioID, seconds, smooth = 0.1, deltaSmooth = 0.5){
    let audio = document.getElementById(audioID);

    audio.addEventListener("play", () => {
        setTimeout(async () => {
            let v = 1;
            while(v > 0){
                v -= smooth;
                if(v <= 0) 
                    v = 0;
                audio.volume = v;
                console.log(audio.volume);
                await sleep(deltaSmooth * 1000);
            }
            if(audio.volume <= 0)
                audio.pause();
        }, seconds * 1000);
    });
}

function audioStartsAt(audioID, seconds){
    let audio = document.getElementById(audioID);
    
    audio.currentTime = seconds;
    audio.addEventListener("pause", () => {
        audio.currentTime = seconds;
    });
}

function playAudio(audioID){
    document.getElementById(audioID).play();
}

function setVolume(audioID, volume){
    document.getElementById(audioID).volume = volume;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function tangDan(audioID, start = 0, end = 1, smooth = 0.1, deltaSmooth = 0.5){
    let audio = document.getElementById(audioID);
    audio.volume = start;
    
    audio.addEventListener("play", async () => {
        while(audio.volume < end){
            await sleep(deltaSmooth * 1000);
            audio.volume += smooth;
        }
    });
}

function giamDan(audioID, start = 1, end = 0, smooth = 0.1, deltaSmooth = 0.5){
    let audio = document.getElementById(audioID);
    audio.volume = start;
    
    audio.addEventListener("play", async () => {
        while(audio.volume > end){
            await sleep(deltaSmooth * 1000);
            audio.volume -= smooth;
        }
    });
}
