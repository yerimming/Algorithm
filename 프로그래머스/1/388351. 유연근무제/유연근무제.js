function solution(schedules, timelogs, startday) {
    let result = 0;
    
    for(let i = 0; i < schedules.length; i++) {
        const schedule = schedules[i]; 
        const timelog = timelogs[i];
        
        let limit = schedule + 10;
        if(schedule % 100 >= 50) {
            limit += 40;
        }
        
        let day = startday;
        let count = 0;
        
        for(let j = 0; j < timelog.length; j++) {
            const time = timelog[j]; 
            
            if(day === 7) {
                day = 0;
            } else if(day < 6) {
                if(time <= limit) {
                    count++;
                }
            }
            
            day++;
        }
        
        if (count === 5) {
            result++;
        }
    }
    
    return result;
}