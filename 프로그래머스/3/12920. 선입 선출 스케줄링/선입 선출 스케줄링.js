function solution(n, cores) {
    
    if (n <= cores.length) {
        return n;
    }
    
    // 작업 시간 t를 이분 탐색으로 구하기
    let left = 1;
    let right = Math.max(...cores) * n;
    let t = 0;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        const work = processed(mid);
        
        if (work >= n) {
            t = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    // mid 초에서 처리되는 작업의 수
    function processed(mid) {
        let sum = 0;
        
        for (const core of cores) {
            const w = Math.floor(mid / core) + 1;
            sum += w;
        }
        
        return sum;
    }
    
    // t-1초까지 작업하고 남은 작업의 수
    let remain = n - processed(t - 1);
    
    // t초에 작업 끝나는 코어들 구하기
//     const candidates = [];
    
//     for (const core of cores) {
//         if (t % core === 0) {
//             candidates.push(core);
//         }
//     }
    
//     // remain번째 코어 구하기
//     let core = 0;
    
//     for (let i = 0; i < candidates.length; i++) {
//         if (i + 1 === remain) {
//             core = candidates[i];
//             break;
//         }
//     }
    
//     // 코어의 번호 구해서 반환
//     let result  = 0;
    
//     for (let i = 0; i < cores.length; i++) {
//         if (cores[i] === core) {
//             result = i + 1;
//             break;
//         }
//     }
    
//     return result;
    
    for (let i = 0; i < cores.length; i++) {
        // t초에 작업 끝내는 코어 만나면
        if (t % cores[i] === 0) {
            remain--;
        }
        
        // remain만큼 다 만남 -> 코어 번호 반환
        if (remain === 0) {
            return i + 1;
        }
    }
}