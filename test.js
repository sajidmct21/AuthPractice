function sample(a, b){
    console.log(`From outer a = ${a} and b = ${b}`);
    const add = ()=>{
        console.log(`from Inner a = ${a} and b = ${b}`);
    }
    add();
}

sample(2,3)