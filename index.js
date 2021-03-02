function readOneByte() {
return buffer[0] >>> 0
}

function readTwoByte() {
    return (
        ((buffer[0] << 8) | this.buffer[1]) >>> 0
    )
}

function readThreeByte() {
    return (
        ((buffer[0] << 16) |
        (buffer[1] << 8) |
        buffer[2]) >>>
        0
    )
}

function readFourByte(buffer) {
    return (
        ((buffer[0] << 24) |
        (buffer[1] << 16) |
        (buffer[2] << 8) |
        buffer[3]) >>>
        0
    )
}
//ArrayBuffer转字符串
function ab2str(u,f) {
   var b = new Blob([u]);
   var r = new FileReader();
    r.readAsText(b, 'utf-8');
    r.onload = function (){if(f)f.call(null,r.result)}
}
//字符串转字符串ArrayBuffer
function str2ab(s,f) {
    var b = new Blob([s],{type:'text/plain'});
    var r = new FileReader();
    r.readAsArrayBuffer(b);
    r.onload = function (){if(f)f.call(null,r.result)}
}

document.getElementById('input').addEventListener('change', (event) => {
    let file = event.target.files[0]
    let fileReader = new FileReader()

    fileReader.addEventListener('load', (event) => {
        let arrayBuffer = new Uint8Array(event.target.result)
        let test = arrayBuffer.slice(8, 8 + 13)
        test = test.slice(0, 4)
        // ab2str(test, (result) => {
        //     console.log(result)
        // })
    })

    fileReader.readAsArrayBuffer(file)
    
})
