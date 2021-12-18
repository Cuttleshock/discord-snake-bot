export default function bulkDerange(n: number): Array<number> {
    if (n % 2) {
        // Derange all but one element
        const partialDerangement = bulkDerangeEven(n-1);
        // Pick an element to fix and rearrange the current derangement around it
        const m1 = Math.floor(Math.random()*n);
        for (let i = 0; i < partialDerangement.length; ++i) {
            if (partialDerangement[i] >= m1) {
                ++partialDerangement[i];
            }
        }
        partialDerangement.splice(m1, 0, m1);
        // Pick an element to swap with the fixed element
        let m2 = Math.floor(Math.random()*(n-1));
        if (m2 >= m1) {
            ++m2;
        }
        // Swap and return
        partialDerangement[m1] = partialDerangement[m2];
        partialDerangement[m2] = m1;
        return partialDerangement;
    } else {
        return bulkDerangeEven(n);
    }
}

function bulkDerangeEven(n: number): Array<number> {
    const input = [...Array(n).keys()];
    const arranged = [...input].sort(() => Math.random() - 0.5);

    for (let i = 0; i < n; ++i) {
        // Check if 'arranged' is valid derangement
        let valid = true;
        for (let j = 0; j < n; ++j) {
            if (input[j] === arranged[j]) {
                valid = false;
                break;
            }
        }

        if (valid) {
            break;
        } else {
            // Rotate arranged
            arranged.push(arranged.shift());
        }
    }

    return arranged;
}

export function proceduralDerange(n: number): Array<number> {
    const input = [...Array(n).keys()];
    const cycles: Array<Array<number>> = [[0]];
    let i: number; // Value to pull out of input and into the latest cycle

    while (input.length > 1) {
        if (input.length === 2) {
            // Prevent last element of input being orphaned
            i = 1;
        } else if (cycles[cycles.length-1].length === 1) {
            // Prevent current cycle from being an orphan
            i = Math.floor(Math.random()*(input.length-1)) + 1;
        } else {
            // Pick any remaining unassigned element
            i = Math.floor(Math.random()*input.length);
        }
        if (i === 0) {
            // Close the cycle
            input.splice(i,1);
            cycles.push([input[0]]);
        } else {
            // Append to current cycle
            cycles[cycles.length-1].push(input.splice(i,1)[0]);
        }
    }

    const ret = new Array(n);
    for (const c of cycles) {
        for (let i = 0; i < c.length; ++i) {
            ret[c[i]] = c[i+1] ?? c[0];
        }
    }
    return ret;
}
