import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const appRoot=path.resolve(siteRoot,'../citywalk');
const source=path.join(appRoot,'dist/client');
const destination=path.join(siteRoot,'public/citywalk');
const repository=(process.env.GITHUB_REPOSITORY||'wqw845950341-cell/qianwen-portfolio').split('/')[1];
const base=`/${repository}/citywalk/`;
if(!existsSync(path.join(source,'index.html')))throw new Error('Build citywalk before syncing its static output.');
mkdirSync(destination,{recursive:true});
cpSync(source,destination,{recursive:true});
// Adapt emitted assets for a Pages subdirectory without changing protected runtime sources.
function adapt(directory){for(const entry of readdirSync(directory,{withFileTypes:true})){const file=path.join(directory,entry.name);if(entry.isDirectory())adapt(file);else if(/\.(html|js|css)$/.test(file)){const text=readFileSync(file,'utf8');writeFileSync(file,text.replaceAll('/assets/',base+'assets/'));}}}
adapt(destination);
cpSync(path.join(appRoot,'docs'),path.join(destination,'docs'),{recursive:true});
writeFileSync(path.join(destination,'.nojekyll'),'');
const index=readFileSync(path.join(destination,'index.html'),'utf8');
if(!index.includes(base+'assets/'))throw new Error('Pages asset base was not applied.');
console.log(`LaneMuse synced to ${base}`);
