function p1() {
    var a = 20;
    function c1() {
        let a = 10;
        console.log(a);
        function c2() {
            console.log(a);
            a = 30;
        }
        c2();
        console.log(a);

    }
    c1()
}
p1()