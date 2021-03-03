export function readOneByte(buffer) {
    return buffer[0] >>> 0
}

export function readTwoByte(buffer) {
    return (
        ((buffer[0] << 8) | this.buffer[1]) >>> 0
    )
}

export function readThreeByte(buffer) {
    return (
        ((buffer[0] << 16) |
        (buffer[1] << 8) |
        buffer[2]) >>>
        0
    )
}

export function readFourByte(buffer) {
    return (
        ((buffer[0] << 24) |
        (buffer[1] << 16) |
        (buffer[2] << 8) |
        buffer[3]) >>>
        0
    )
}
//ArrayBuffer转字符串
export function ab2str(u) {
    return new Promise(function(resolve) {
        var b = new Blob([u]);
        var r = new FileReader();
        r.readAsText(b, 'utf-8');
        r.onload = function (res){
            resolve(res.target.result)
        }
    })
}
//字符串转字符串ArrayBuffer
export function str2ab(s) {
    return new Promise(function(resolve) {
        var b = new Blob([s],{type:'text/plain'});
        var r = new FileReader();
        r.readAsArrayBuffer(b);
        r.onload = function (res){
            resolve(res.target.result)
        }
    })
}