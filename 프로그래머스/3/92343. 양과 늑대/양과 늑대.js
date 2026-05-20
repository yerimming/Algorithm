function solution(info, edges) {
    const graph = Array.from({ length: info.length }, () => []);
    
    for (const [parent, child] of edges) {
        graph[parent].push(child);
    }
    
    let sheepCount = 0;
    
    function dfs(node, sheep, wolf, candidates) {
        if (info[node] === 0) {
            sheep++;
        } else {
            wolf++;
        }
        
        // 잡아먹힌다!! 돌아가
        if (wolf >= sheep) return;
        
        sheepCount = Math.max(sheepCount, sheep);
        
        for (const next of candidates) {
            // 이제 방문할 곳은 후보에서 삭제
            const nextCandidates = candidates.filter(v => v !== next);
            // 방문할 노드의 자식 노드들을 후보에 추가
            nextCandidates.push(...graph[next]);
            
            dfs(next, sheep, wolf, nextCandidates);
        }
    }
    
    dfs(0, 0, 0, graph[0]);
    
    return sheepCount;
}