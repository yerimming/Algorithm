function solution(friends, gifts) {
    const n = friends.length;
    
    const nameToIndex = {};
    for (let i = 0; i < n; i++) {
        nameToIndex[friends[i]] = i;
    }
    
    const give = Array.from({ length: n}, () => Array(n).fill(0));
    const sent = Array(n).fill(0);
    const received = Array(n).fill(0);
    const nextReceive = Array(n).fill(0);
    
    for (const gift of gifts) {
        const [from, to] = gift.split(" ");
        
        const fromIdx = nameToIndex[from];
        const toIdx = nameToIndex[to];
        
        give[fromIdx][toIdx]++;
        sent[fromIdx]++;
        received[toIdx]++;
    }
    
    const score = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        score[i] = sent[i] - received[i];
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (give[i][j] > give[j][i])
                nextReceive[i]++;
            else if (give[i][j] < give[j][i])
                nextReceive[j]++;
            else if (give[i][j] === give[i][j]) {
                if(score[i] > score[j])
                    nextReceive[i]++;
                else if (score[i] < score[j])
                    nextReceive[j]++
            }
        }
    }
    
    return Math.max(...nextReceive);
}