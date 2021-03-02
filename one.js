var obj = {
    one: 0
}

export default obj

setTimeout(function () {
    obj.one = 10
}, 1000)