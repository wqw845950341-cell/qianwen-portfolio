import { useState } from 'react';
import { ArrowSquareOut, CheckCircle, Sparkle } from '@phosphor-icons/react';
import { refreshProjects } from './refresh-data';
const asset=name=>`${import.meta.env.BASE_URL}assets/${name}`;
export function ExtendedProjectSystem({projectId,lang,selectedStage,reducedMotion}) {
 const p=refreshProjects.find(p=>p.id===projectId);
 const images=projectId===4?['teddi-overview.webp','teddi-film-poster.webp','teddi-instagram.webp','teddi-tiktok.webp']:['redlens-preview.webp','redlens-diagnosis.webp','redlens-fit.webp','redlens-preview.webp'];
 return <div className="extended-project-system"><div className="extended-product-window" key={selectedStage}><header><Sparkle size={14}/><strong>{p.short}</strong><span>0{selectedStage+1} / 04</span></header><img src={asset(images[selectedStage])} alt={p.steps[selectedStage].label[lang]}/><footer><CheckCircle size={13}/>{p.steps[selectedStage].label[lang]}<small>{p.status[lang]}</small></footer></div></div>;
}
export function ExtendedProjectMedia({id,lang}) {
 const p=refreshProjects.find(p=>p.id===id),[selected,setSelected]=useState(0);const m=p.media[selected]||p.media[0];
 return <section className="extended-case-media"><header><span>{lang==='zh'?'项目实物与交付':'Project artifacts'}</span><a href={p.url} target="_blank" rel="noreferrer">{lang==='zh'?'打开完整 Demo':'Open live demo'}<ArrowSquareOut size={15}/></a></header>{m.type==='video'?<video key={m.id} controls playsInline preload="metadata" poster={asset(m.poster)} src={asset(m.src)}/>:<img src={asset(m.src)} alt={m.title[lang]}/>}<p>{m.caption[lang]}</p><nav>{p.media.map((item,i)=><button key={item.id} aria-pressed={i===selected} onClick={()=>setSelected(i)}>{item.label[lang]||item.label}</button>)}</nav></section>;
}
