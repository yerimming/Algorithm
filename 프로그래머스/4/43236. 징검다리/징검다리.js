function solution(distance, rocks, n) {
    
    let left = 1;
    let right = distance;
    let answer = 0;
    
    rocks.sort((a, b) => a - b);
    
    while (left <= right) {
        
        const mid = Math.floor((left + right) / 2);
        
        let removeCnt = 0;
        let prev = 0;
        
        for (const rock of rocks) {
            if (rock - prev < mid) {
                removeCnt++;
            } else {
                prev = rock;
            }
        }
        
        if ((distance - prev) < mid) {
            removeCnt++;
        }
        
        if (removeCnt <= n) {
            answer = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return answer;
}