const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),tests=path.join(root,'tests');
const files=fs.readdirSync(tests).filter(name=>name.endsWith('.test.cjs')).sort();
let failed=0;
for(const name of files){
 const result=spawnSync(process.execPath,[path.join(tests,name)],{cwd:root,stdio:'inherit'});
 if(result.status!==0)failed++;
}
if(failed){console.error(`${failed} test file(s) failed.`);process.exit(1);}
console.log(`PASS ${files.length} automated test files.`);
