import * as React from 'react'
const SvgComponent = (props) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        style={{
            enableBackground: 'new 0 0 150 150',
        }}
        viewBox='0 0 150 150'
        {...props}
    >
        <path d='M0 0v150h150V0H0zm87.5 112.3H34.9V26.4h14.4v73.4h38.2v12.5zm33.2-50.8h-13.2V90c0 7.2 1.1 10.3 8.1 10.3h5.1v11.9h-6.1c-14.9 0-20.3-5.1-20.3-19.8v-31h-8V50h8V36.4h13.2V50h13.2v11.5z' />
    </svg>
)
export default SvgComponent
