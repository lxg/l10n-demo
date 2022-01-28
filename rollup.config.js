import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'

export default {
    input: 'src/demo.js',
    output: {
        file: 'dist/demo.js',
        format: 'iife'
    },
    plugins: [
        copy({
            targets: [
                { src: 'src/*.html', dest: 'dist' }
            ]
        }),
        json(),
        resolve()
    ]
}
