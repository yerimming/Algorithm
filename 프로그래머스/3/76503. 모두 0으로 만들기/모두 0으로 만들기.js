function solution(a, edges) {
    
    // BigInt 사용
    const sum = a.reduce((acc, cur) => acc + BigInt(cur), 0n);
    
    if (sum !== 0n) return -1;
    
    const graph = Array.from({length: a.length}, () => []);
    
    for (const [e1, e2] of edges) {
        graph[e1].push(e2);
        graph[e2].push(e1);
    }
    
    let count = 0n;
    
    const stack = [[0, -1]];
    const order = [];
    
    while (stack.length) {
        const [cur, parent] = stack.pop();
        
        order.push([cur, parent]);
        
        for (const next of graph[cur]) {
            if (next === parent) continue;
            
            stack.push([next, cur]);
        }
    }
    
    for (let i = order.length - 1; i >= 0; i--) {
        const [child, parent] = order[i];
        
        if (parent === -1) continue;
        
        a[parent] += a[child];
        count += BigInt(Math.abs(a[child]));
        a[child] = 0;
    }
    
    return count;
}