function solution(schedules, timelogs, startday) {
    let result = 0;
    
    for(let i = 0; i < schedules.length; i++) {
        let limit = schedules[i] + 10;
        
        if(schedules[i] % 100 >= 50) limit += 40;
        
        let isValid = true;
        
        for(let j = 0; j < 7; j++) {
            const day = (startday + j - 1) % 7 + 1;
            if (day >= 6) continue;
            
            if (timelogs[i][j] > limit) {
                isValid = false;
                break;
            }
        }
        
        if (isValid) result++;
    }
    
    return result;
}