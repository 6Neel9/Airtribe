function twoPointer(arr, target) {
    let s = 0;
    let end = arr.length - 1;
    while (s <= end) {
        const cur = arr[s] + arr[end];
        if (cur == target) {
            return [s + 1, end + 1]
        } else if (cur < target) {
            s++
        } else {
            end--
        }
    }
    return [-1, -1]
}

const arr = [1, 2, 3, 4, 6];
const target = 6;
// console.log(twoPointer(arr, target)); // [1, 3]

//28.09.2025 (Recursion)
function recurtionPrint(n) {
    if (n <= 0) return;
    console.log(n);
    recurtionPrint(n - 1);
    console.log('post recusion call', n)
    return;

}
// recurtionPrint(4);


function factorial(n) {
    if (n <= 0) return 1;
    const res = n * factorial(n - 1);
    return res
}

// console.log(factorial(5));

function fibonacci(n) {
    // if (n = 0) return 0;
    if (n <= 1) return n;
    const res = fibonacci(n - 2) + fibonacci(n - 1);
    return res;

}
// console.log(fibonacci(5));

// problem 198 leetcode (practice)



// Backtracking -->>
//After Recursion backward retracing is called backtracking




// Binary-Search
function binarySearch(a, key) {
    let s = 0;
    let e = a.length - 1;
    while (s <= e) {
        let mid = Math.floor((s + e) / 2);
        if (a[mid] === key) {
            return mid;
        } else if (a[mid] < key) {
            s = mid + 1;
        } else {
            e = mid - 1;
        }
    }
    return -1;
}

function binarySearchRecursive(a, s, e, key) {
    if (s > e) return -1;
    let mid = Math.floor((s + e) / 2);
    if (a[mid] === key) {
        return mid;
    } else if (a[mid] < key) {
        return binarySearchRecursive(a, mid + 1, e, key);
    } else {
        return binarySearchRecursive(a, s, mid - 1, key);
    }
}


// console.log(binarySearch([1, 2, 3,4, 4, 5, 6], 4)); // 4
// console.log(binarySearchRecursive([1, 2, 3,4, 4, 5, 6], 0, 6, 4)); // 4


function binarySearchOccurance(a, key) {
    let s = 0;
    let e = a.length - 1;
    let ans = -1;
    while (s <= e) {
        let mid = Math.floor((s + e) / 2);
        if (a[mid] === key) {
            ans = mid;
            // e = mid - 1; // for first occurance
            s = mid + 1; // for last occurance
        } else if (a[mid] < key) {
            s = mid + 1;
        } else {
            e = mid - 1;
        }
    }
    return ans;

}


console.log(binarySearchOccurance([1, 2, 3, 4, 4, 5, 6], 4)); // 4
