function solution(k, dungeons) {
    const permutations = getPermutations(dungeons);
    
    const result = [];
    
    for (const permutation of permutations) {
        let fatigue = k;
        let count = 0;
        
        for (const [required, cost] of permutation) {
            if (required > fatigue) continue;
            
            fatigue -= cost;
            count++;
        }
        
        result.push(count);
    }
    
    return Math.max(...result);
}

function getPermutations(dungeons) {
    const result = [];
    const visited = Array(dungeons.length).fill(false);
    
    function dfs(path) {
        
        if (path.length === dungeons.length) {
            result.push([...path]);
            return;
        }
        
        for (let i = 0; i < dungeons.length; i++) {
            if(visited[i]) continue;
            
            visited[i] = true;
            path.push([...dungeons[i]]);
            
            dfs(path);
            
            path.pop();
            visited[i] = false;
        }
    }
    
    dfs([]);
    
    return result;
}