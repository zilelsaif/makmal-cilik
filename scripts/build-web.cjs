const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'www');
// Only this generated directory may be removed. Refuse links/junctions.
if (path.dirname(output) !== root || path.basename(output) !== 'www') throw Error('Unsafe output directory');
if (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) throw Error('www must not be a link');
for (const name of ['index.html', '_headers', 'css', 'js', 'assets']) if (!fs.existsSync(path.join(root, name))) throw Error('Missing source: ' + name);
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output);
let count = 0, bytes = 0;
function copy(source, target) {
  const stat = fs.lstatSync(source);
  if (stat.isSymbolicLink()) throw Error('Linked sources are not packaged: ' + source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const name of fs.readdirSync(source)) {
      if (name.startsWith('.') || name === 'reference') continue;
      copy(path.join(source, name), path.join(target, name));
    }
  } else if (path.basename(source) === '_headers' || /\.(html|css|js|json|svg|webp|png|jpg|jpeg|gif|woff2?|ttf|mp3|ogg|wav|m4a)$/i.test(source)) {
    fs.copyFileSync(source, target); count++; bytes += stat.size;
  }
}
for (const name of ['index.html', '_headers', 'css', 'js', 'assets']) copy(path.join(root, name), path.join(output, name));
console.log(`Bundled ${count} production files (${bytes} bytes) into ${output}`);
