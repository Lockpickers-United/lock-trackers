export default function formatTime(numSeconds) {

    function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length)
    }

    const minutes = Math.floor(numSeconds / 60)
    const seconds = numSeconds - minutes * 60
    const finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2)

    return (finalTime)
}
