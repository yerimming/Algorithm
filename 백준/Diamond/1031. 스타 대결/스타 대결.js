const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const teamJimin = input[1].split(' ').map(Number);
const teamHansu = input[2].split(' ').map(Number);

class Edge {
    constructor(to, rev, cap) {
        this.to = to;
        this.rev = rev;
        this.cap = cap;
    }
}

class Dinic {
    constructor(n) {
        this.n = n;
        this.graph = Array.from({ length: n }, () => []);
        this.level = new Array(n).fill(-1);
        this.work = new Array(n).fill(0);
    }

    addEdge(from, to, cap) {
        const forward = new Edge(to, this.graph[to].length, cap);
        const backward = new Edge(from, this.graph[from].length, 0);
        this.graph[from].push(forward);
        this.graph[to].push(backward);
    }

    bfs(source, sink) {
        this.level.fill(-1);
        const queue = [source];
        this.level[source] = 0;
        let head = 0;

        while (head < queue.length) {
            const now = queue[head++];

            for (const edge of this.graph[now]) {
                if (edge.cap > 0 && this.level[edge.to] === -1) {
                    this.level[edge.to] = this.level[now] + 1;
                    queue.push(edge.to);
                }
            }
        }

        return this.level[sink] !== -1;
    }

    dfs(now, sink, flow) {
        if (now === sink) return flow;

        for (let i = this.work[now]; i < this.graph[now].length; i++) {
            this.work[now] = i;
            const edge = this.graph[now][i];

            if (edge.cap <= 0) continue;
            if (this.level[edge.to] !== this.level[now] + 1) continue;

            const ret = this.dfs(edge.to, sink, Math.min(flow, edge.cap));
            if (ret > 0) {
                edge.cap -= ret;
                this.graph[edge.to][edge.rev].cap += ret;
                return ret;
            }
        }
        return 0;
    }

    maxFlow(source, sink) {
        let total = 0;
        const INF = 1e9;

        while (this.bfs(source, sink)) {
            this.work.fill(0);

            while (true) {
                const flow = this.dfs(source, sink, INF);
                if (flow === 0) break;
                total += flow;
            }
        }
        return total;
    }
}

const teamJiminMax = Math.max(...teamJimin);
const teamHansuMax = Math.max(...teamHansu);
const sumJimin = teamJimin.reduce((a, b) => a + b, 0);
const sumHansu = teamHansu.reduce((a, b) => a + b, 0);

if (teamJiminMax > M || teamHansuMax > N || sumJimin !== sumHansu) {
    console.log(-1);
    process.exit(0);
}

const answer = Array.from({ length: N }, () => Array(M).fill(-1));

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (canSetValue(i, j, 0)) {
            answer[i][j] = 0;
        } else if (canSetValue(i, j, 1)) {
            answer[i][j] = 1;
        } else {
            console.log(-1);
            process.exit(0);
        }
    }
}

let result = answer.map((row) => row.join('')).join('\n');
console.log(result);

function canSetValue(r, c, value) {
    const board = answer.map((row) => [...row]);

    if (board[r][c] !== -1) return false;

    board[r][c] = value;

    const { remainRow, remainCol, remainTotal, valid } = getRemain(board);

    if (!valid) return false;
    if (remainTotal === 0) return true;

    return canCompleteWithFlow(board, remainRow, remainCol, remainTotal);
}

function getRemain(board) {
    const remainRow = [...teamJimin];
    const remainCol = [...teamHansu];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] === 1) {
                remainRow[i]--;
                remainCol[j]--;
            }
        }
    }

    for (let i = 0; i < N; i++) {
        if (remainRow[i] < 0) {
            return { valid: false };
        }
    }

    for (let j = 0; j < M; j++) {
        if (remainCol[j] < 0) {
            return { valid: false };
        }
    }

    for (let i = 0; i < N; i++) {
        let available = 0;
        for (let j = 0; j < M; j++) {
            if (board[i][j] === -1) available++;
        }

        if (remainRow[i] > available) {
            return { valid: false };
        }
    }

    for (let j = 0; j < M; j++) {
        let available = 0;
        for (let i = 0; i < N; i++) {
            if (board[i][j] === -1) available++;
        }

        if (remainCol[j] > available) {
            return { valid: false };
        }
    }

    const remainTotal = remainRow.reduce((a, b) => a + b, 0);
    const colTotal = remainCol.reduce((a, b) => a + b, 0);

    if (remainTotal !== colTotal) return { valid: false };

    return { remainRow, remainCol, remainTotal, valid: true };
}

function canCompleteWithFlow(board, remainRow, remainCol, remainTotal) {
    const source = 0;
    const rowStart = 1;
    const colStart = rowStart + N;
    const sink = colStart + M;
    const size = sink + 1;

    const dinic = new Dinic(size);

    for (let i = 0; i < N; i++) {
        if (remainRow[i] > 0) {
            dinic.addEdge(source, rowStart + i, remainRow[i]);
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] === -1) {
                dinic.addEdge(rowStart + i, colStart + j, 1);
            }
        }
    }

    for (let j = 0; j < M; j++) {
        if (remainCol[j] > 0) {
            dinic.addEdge(colStart + j, sink, remainCol[j]);
        }
    }

    const flow = dinic.maxFlow(source, sink);
    return flow === remainTotal;
}
