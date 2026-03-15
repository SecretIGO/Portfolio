import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

/** Reads icon names from about.ts and regenerates devicon-subset.css with only those glyphs. */
function deviconSubsetPlugin() {
    const outputPath = path.resolve('src/core/design-tokens/devicon/devicon-subset.css')
    const aboutPath  = path.resolve('src/data/landingpage/about.ts')
    const deviconCss = path.resolve('node_modules/devicon/devicon.min.css')

    function generate() {
        const aboutSrc = fs.readFileSync(aboutPath, 'utf8')
        const icons = [...new Set([...aboutSrc.matchAll(/icon:\s*['"](\w+)['"]/g)].map(m => m[1]))].sort()

        const css = fs.readFileSync(deviconCss, 'utf8')
        const rules = icons.map(icon => {
            let m = css.match(new RegExp(`\\.devicon-${icon}-plain:before[^{]*\\{content:"([^"]+)"`))
            if (!m) m = css.match(new RegExp(`\\.devicon-${icon}-original:before[^{]*\\{content:"([^"]+)"`))
            if (!m) return `/* devicon-${icon}: not found in devicon package */`
            const cp = m[1].codePointAt(0).toString(16).padStart(4, '0')
            return `.devicon-${icon}-plain:before { content: "\\${cp}"; }`
        })

        const output = [
            `/* AUTO-GENERATED — do not edit manually. */`,
            `/* Add icons to src/data/landingpage/about.ts; this file regenerates on build/dev. */`,
            `/* Icons: ${icons.join(', ')} */`,
            ``,
            `@font-face {`,
            `    font-family: "devicon";`,
            `    src: url("../../../../node_modules/devicon/fonts/devicon.woff") format("woff"),`,
            `         url("../../../../node_modules/devicon/fonts/devicon.ttf") format("truetype");`,
            `    font-weight: normal;`,
            `    font-style: normal;`,
            `    font-display: block;`,
            `}`,
            ``,
            `[class^="devicon-"],`,
            `[class*=" devicon-"] {`,
            `    font-family: "devicon" !important;`,
            `    speak: never;`,
            `    font-style: normal;`,
            `    font-weight: normal;`,
            `    font-variant: normal;`,
            `    text-transform: none;`,
            `    line-height: 1;`,
            `    -webkit-font-smoothing: antialiased;`,
            `    -moz-osx-font-smoothing: grayscale;`,
            `}`,
            ``,
            ...rules,
            ``
        ].join('\n')

        fs.writeFileSync(outputPath, output, 'utf8')
    }

    return {
        name: 'devicon-subset',
        buildStart() { generate() },
        configureServer(server) {
            server.watcher.add(aboutPath)
            server.watcher.on('change', file => {
                if (file === aboutPath) generate()
            })
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), deviconSubsetPlugin()],
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        sourcemap: false
    }
})