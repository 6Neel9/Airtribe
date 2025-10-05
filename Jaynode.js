
// 30.09.2025
// for (let i = 0; i < 4; i++) {
//     setTimeout(() => {
//         console.log('timer', i)
//     }, 0);
//     Promise.resolve().then(() => {
//         console.log(i)
//     })
//     process.nextTick(() => {
//     console.log("hi",i)
// })
// }

// process.nextTick(() => {
//     console.log("hi")
// })
// console.log("hi2")

// setTimeout(()=>{
//     Promise.resolve().then(()=>{
//         console.log('hi')
//     })
// },200)
// setTimeout(()=>{
//         console.log('hi2')
    
// },0)
function rnt(){
    // console.log(Math.round(Math.random()*100));
    process.nextTick(()=>{
    console.log(Math.round(Math.random()*100));
        rnt();
    })
}
console.log("hi")
rnt()