import { readFourByte, readOneByte } from '../util.js'

const IHDR = async (ab) => {
    let width = readFourByte(ab.slice(0, 4))
    let height = readFourByte(ab.slice(4, 8))
    let bitDepth = readOneByte(ab.slice(8, 9))
    let colorType = readOneByte(ab.slice(9, 10))
    let compressionMethod = readOneByte(ab.slice(10, 11))
    let filterMethod = readOneByte(ab.slice(11, 12))
    let interlaceMethod = readOneByte(ab.slice(12, 13))

    return {
        width,
        height,
        bitDepth,
        colorType,
        compressionMethod,
        filterMethod,
        interlaceMethod
    }
}
export default IHDR