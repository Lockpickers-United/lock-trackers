import dayjs from 'dayjs'

export default function formatTime(numSeconds) {
    function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length)
    }
    const minutes = Math.floor(numSeconds / 60)
    const seconds = numSeconds - minutes * 60
    const finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2)
    return (finalTime)
}

export function internationalDate(dateString) {
    const fullDateString = dayjs(dateString).toISOString()
    return Intl.DateTimeFormat()
        .format(new Date(fullDateString))
        .replace(/202/g, '2')
        .replace(/201/g, '1')
}
