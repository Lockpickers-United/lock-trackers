import {useDocumentTitle} from 'usehooks-ts'

function usePageTitle(value) {
    const title = value ? `LPUlocks - ${value}` : 'LPUlocks'
    return useDocumentTitle(title)
}

export default usePageTitle
