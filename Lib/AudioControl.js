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

function giamTangDan(
    audioID,
    start = 1,
    end = 0,
    smooth = 0.1,
    deltaSmooth = 0.5,
    startDecreaseTime = 5,
    startIncreaseTime = 10
) {
    let audio = document.getElementById(audioID);
    audio.volume = start;

    audio.addEventListener("play", async () => {
        // Đợi đến thời điểm bắt đầu giảm dần
        await sleep(startDecreaseTime * 1000);

        // Giai đoạn giảm dần
        while (audio.volume > end) {
            await sleep(deltaSmooth * 1000);
            audio.volume = Math.max(end, audio.volume - smooth);
        }

        // Đợi đến thời điểm bắt đầu tăng dần
        const delayBeforeIncrease = Math.max(0, startIncreaseTime * 1000 - startDecreaseTime * 1000);
        await sleep(delayBeforeIncrease);

        // Giai đoạn tăng dần
        while (audio.volume < start) {
            await sleep(deltaSmooth * 1000);
            audio.volume = Math.min(start, audio.volume + smooth);
        }
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function giamDanDenGiay(audioID, start = 1, end = 0, smooth = 0.1, deltaSmooth = 0.5, startSecond = 0) {
    let audio = document.getElementById(audioID);
    audio.volume = start;

    // Hàm sleep giúp chờ đợi trong khoảng thời gian
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Hàm giảm âm lượng
    async function startVolumeReduction() {
        while (audio.volume > end) {
            await sleep(deltaSmooth * 1000); // Chờ deltaSmooth giây
            audio.volume = Math.max(audio.volume - smooth, end); // Giảm âm lượng dần nhưng không nhỏ hơn 'end'
        }
    }

    // Hàm xử lý sự kiện
    function onTimeUpdate() {
        if (audio.currentTime >= startSecond && audio.volume > end) {
            audio.removeEventListener("timeupdate", onTimeUpdate); // Ngừng lắng nghe để tránh trùng lặp
            startVolumeReduction(); // Bắt đầu giảm âm lượng
        }
    }

    // Thêm sự kiện timeupdate
    audio.addEventListener("timeupdate", onTimeUpdate);
}
