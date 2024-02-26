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
        <g
            style={{
                enableBackground: 'new',
            }}
        >
            <path d='M71.9 51.9c-2.2-10.5-7.8-15.2-17.3-15.2-11.4 0-17.7 7.5-17.7 26v11c0 18.3 6.2 26 17.7 26 9.8 0 15.1-4.7 17.3-15.2h13.8c-2.9 19.3-14.1 27.8-31.1 27.8-19.2 0-32.1-11.6-32.1-38.6v-11c0-27 12.9-38.6 32.1-38.6 17 0 28.4 9.1 31.2 27.8H71.9zM94.7 25.3H108v63.2c0 6.7 1.2 11 9.5 11v11.7c-16.2 0-22.8-5.2-22.8-19.5V25.3z' />
        </g>
        <path d='M146 4v142H4V4h142m4-4H0v150h150V0z' />
    </svg>
)
export default SvgComponent
