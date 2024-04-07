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
        <path d='M35.6 98.7h38.2v12.4H21.1V25.3h14.4v73.4zM94.2 53.8c3.4-4.1 8.3-6 14.9-6 15.2 0 24.8 10 24.8 28.2v7.8c0 16.6-8.1 28.4-24.8 28.4-7 0-11.8-1.9-14.9-5.6v4.5H81.3V25.3h12.8v28.5zm26.3 29.7v-7.2c0-10.8-4.2-16.9-13.2-16.9-8.6 0-13.1 6-13.2 16.2v8c0 9.7 3.5 17.3 13.2 17.3 9.6-.1 13.2-7.7 13.2-17.4z' />
        <path d='M146 4v142H4V4h142m4-4H0v150h150V0z' />
    </svg>
)
export default SvgComponent
