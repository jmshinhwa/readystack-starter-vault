import esbuild from 'esbuild';
const prod = process.argv[2] !== 'dev';
await esbuild.build({
  entryPoints: ['src/main.js'],
  bundle: true,
  external: ['obsidian', 'electron'],
  format: 'cjs',
  target: 'es2018',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  outfile: 'main.js',
  banner: { js: '/* Starter Vault — ReadyStack — MIT — source: https://github.com/jmshinhwa/readystack-starter-vault */' },
});
// the same engine for the web page (window.SV)
await esbuild.build({ entryPoints: ['src/engine.js'], bundle: true, format: 'iife', globalName: 'SV', target: 'es2018', outfile: '../site/engine.js', logLevel: 'info' });
