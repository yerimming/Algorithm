function solution(video_len, pos, op_start, op_end, commands) {
    const lengthSec = toSec(video_len);
    let posSec = toSec(pos);
    const opStartSec = toSec(op_start);
    const opEndSec = toSec(op_end);
    
    for (const command of commands) {
        checkOp();
        
        if (command === "next") {
            checkNext();
        } else {
            checkPrev();
        }

    }
    
    checkOp();
    
    function checkNext() {
        if (lengthSec - posSec < 10) {
            posSec = lengthSec;
            return;
        }
        
        posSec += 10;
    }
    
    function checkPrev() {
        if ((posSec - 10) < 0) {
            posSec = 0;
            return;
        }
        
        posSec -= 10;
    }
    
    function checkOp() {
        if (posSec >= opStartSec && posSec <= opEndSec) {
            posSec = opEndSec;
        }
    }
    
    // 결과 출력 형식으로 변환
    const min = String(Math.floor(posSec / 60)).padStart(2, '0');
    const sec = String(posSec % 60).padStart(2, '0');
    
    return min + ":" + sec;
}

function toSec(time) {
    const [min , sec] = time.split(":");
    
    return Number(min) * 60 + Number(sec);
}