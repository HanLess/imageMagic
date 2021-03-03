import { readFourByte, ab2str } from './util.js'
import chunksMap from './chunks/index.js'

document.getElementById('input').addEventListener('change',async (event) => {
    let file = event.target.files[0]
    let fileReader = new FileReader()

    fileReader.addEventListener('load',async (event) => {
        let arrayBuffer = new Uint8Array(event.target.result)

        // arrayBuffer = arrayBuffer.filter((item, index) => {
        //     return (
        //         index < 55432 || index >= 71828
        //     )
        // })

        let signName = arrayBuffer.slice(0, 8)
        signName = await ab2str(signName)
        
        let start = 8
        let length = 4
        let leftLength = arrayBuffer.length - start

        let chunkList = []

        while (leftLength > 0) {
            console.log('--------',start)
            // length chunk
            let lengthChunk = arrayBuffer.slice(start, start + length)
            start = start + length
            length = 4
            let dataLength = readFourByte(lengthChunk)
            leftLength -= 4
            // type code chunk
            let typeCodeChunk = arrayBuffer.slice(start , start + length)
            start = start + length
            length = dataLength
            let name = await ab2str(typeCodeChunk)
            leftLength -= dataLength
            // data chunk
            let dataChunk = arrayBuffer.slice(start , start + length)
            start = start + length
            length = 4
            leftLength -= 4
            // crc chunk
            let crcChunk = arrayBuffer.slice(start , start + length)
            start = start + length
            length = 4
            leftLength -= 4

            if (chunksMap[name]) {
                dataChunk = await chunksMap[name](dataChunk)
            }
            let chunk = {
                name: name,
                length: dataLength,
                data: dataChunk,
                crc: crcChunk
            }
            chunkList.push(chunk)
            console.log('=======',start)
        }
        console.log(chunkList)


        // let newArrayBuffer = arrayBuffer.filter((item, index) => {
        //     return (
        //         index < 151383 || index >= 151395
        //     )
        // })
        let newArrayBuffer = arrayBuffer
        
        var b = new Blob([newArrayBuffer]);
        var r = new FileReader();
        r.readAsDataURL(b);
        r.onload = function (res){
            let src = r.result

            let img = new Image();
            img.src = src;
            document.body.appendChild(img)            
        }
    })

    fileReader.readAsArrayBuffer(file)
})
