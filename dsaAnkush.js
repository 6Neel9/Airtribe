function twoPointer(arr, target) {
    let s = 0;
    let end = arr.length - 1;
    while(s<=end){
        const cur = arr[s] + arr[end];
        if(cur == target){
            return [s+1,end+1]
        }else if (cur<target){
            s++
        }else{
            end--
        }
    }
    return [-1,-1]
}

const arr = [1, 2, 3, 4, 6];
const target = 6;
// console.log(twoPointer(arr, target)); // [1, 3]

//28.09.2025 (Recursion)
function recurtionPrint(n) {
    // if (n <= 0) return;
    console.log(n);
    recurtionPrint(n - 1);
    // console.log('post recusion call', n)
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
    const res = fibonacci(n-2) + fibonacci(n-1);
    return res;

}
// console.log(fibonacci(5));

// problem 198 leetcode (practice)



// Backtracking -->>
//After Recursion backward retracing is called backtracking



// Merge Sort
function mergeSort(arr, s, e) {
    if (s >= e) return;
    const mid = Math.floor((s + e) / 2);
    mergeSort(arr, s, mid);
    mergeSort(arr, mid + 1, e);
    merge(arr, s, mid, e);
    return arr; // ✅ Return the array so console.log works
}

function merge(arr, s, mid, e) {
    const temp = [];
    let i = s;
    let j = mid + 1;

    while (i <= mid && j <= e) {
        if (arr[i] < arr[j]) {
            temp.push(arr[i++]);
        } else {
            temp.push(arr[j++]);
        }
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= e) temp.push(arr[j++]);

    for (let k = 0; k < temp.length; k++) {
        arr[s + k] = temp[k];
    }
}

// ✅ Usage
const arr1 = [6, 5, 4, 3, 2, 1];
// console.log(mergeSort(arr1, 0, arr1.length - 1)); // [1, 2, 3, 4, 5, 6]


// Ankush Merge
function merge(arr, s, mid, e) {
    // s...mid || mid + 1 ... e
    // s...e
    let i = s; 
    let j = mid + 1;
    
    // 4...7
    // 0...3
    
    const res = []; 
    while (i <= mid && j <= e) {
        if (arr[i] < arr[j]) {
            res.push(arr[i]); 
            i++;  
        } else {
            res.push(arr[j]); 
            j++; 
        }
    }
    
    while (i <= mid) {
        res.push(arr[i]); 
        i++; 
    }
    
    while (j <= e) {
        res.push(arr[j]); 
        j++; 
    }
    
    // result => sorted array in hole 
    const len = e - s + 1;
    for (let k = 0, x = s; k < len; k++, x++) {
        arr[x] = res[k]; 
    }
    
    // console.log({s, e, mid, res})
    return; 
}

function mergeSort(arr, s, e) {
    if (s >= e) return; 
    
    
    const mid = Math.floor((s + e) / 2); 
    // console.log(s, e, mid)
    mergeSort(arr, s, mid); // Sort the first half
    mergeSort(arr, mid + 1, e); // sort the second half
    merge(arr, s, mid, e); // merge the 2 sorted halves s..mid & mid + 1...e
}

// const a = [8,4,1,5,7,5,6,3]; 
// mergeSort(a, 0, 7)
// console.log(a)


// Quick Sort
const a = [2,2,2,2,1,1,1,1]; 
// mergeSort(a, 0, 6)


function findPivotIndex(a, s, e) {
    const pe = a[s]; 
    
    let i = s; 
    let j = e;
    
    while (i < j) {
        // i -> greater than pivot
        while (a[i] <= pe && i < e) {
            i++
        }
        
        // j -> less than pivot
        while (a[j] > pe && j > s) {
            j--; 
        }
        
        // i-> j -> 
        if (i < j) {
            let temp = a[i]; 
            a[i] = a[j]; 
            a[j] = temp; 
        }
    }
    
    // j -> pivot index
    a[s] = a[j]; 
    a[j] = pe; 
    
    return j; 
}

// Choose a pivot element -> first, mid, last
// Place correctly -> lesser <= PE < right
// placement -> pi -> s...pi - 1 && pi + 1 .. e
function quickSort(a, s, e) {
    if (s >= e) return; 
    // console.log({ s, e } )
    const pi = findPivotIndex(a, s, e);
    quickSort(a, s, pi - 1); 
    quickSort(a, pi + 1, e); 
    
}
quickSort(a, 0, a.length - 1); 
// console.log(a)


// Linked List
class Node {
    constructor(data) {
        this.data = data; 
        this.next = null; 
    }
}

let head = new Node(10); 

head = insertAtHead(head, new Node(20)); 
head = insertAtHead(head, new Node(30)); 
head = insertAfterKNode(head, new Node(40), 2)
head = insertAfterKNode(head, new Node(33), 2)
head = insertAfterKNode(head, new Node(44), 2)
head = deleteKthNode(head, 3)
// head = deleteAtHead(head); 
function printLL(head) {
    let itr = head; 
    while (itr != null) {
        console.log(itr.data);
        itr = itr.next; 
    }
    return;
}

printLL(head)

function insertAtHead(head, node) {
    node.next = head; 
    return node; 
}

function insertAfterKNode(head, node, k) {
    // pos == 0
    if (k === 0)
    return insertAtHead(head, node); 
    
    let itr = head; 
    // k--; 
    while (k-- > 1 && itr !== null) {
        itr = itr.next; 
        // k--
    }
    
    if (itr === null) {
        console.log("k greater than the length of list"); 
        return head; 
    }
    if (itr.next === null) {
        // insert at tail HW
        return head; 
    }
    console.log({node, next: itr.next, itr})
    node.next = itr.next; 
    itr.next = node; 
    return head; 
}

function deleteAtHead(head) {
    let temp = head.next; 
    head.next = null; 
    return temp; 
}

function deleteKthNode(head, k) {
    let prev = null; 
    let itr = head; 
    while (k-- > 1 && itr != null) {
        prev = itr; 
        itr = itr.next; 
    }
    
    prev.next = itr.next; 
    itr.next = null; 
    
    return head; 
}



// console.log(head.data);