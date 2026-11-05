import { useState } from 'react';
import { ArrowSquareOut, CheckCircle, Sparkle } from '@phosphor-icons/react';
import { refreshProjects } from './refresh-data';

const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
const localized = (value, lang) => typeof value === 'string' ? value : value[lang];

export function ExtendedProjectSystem({ projectId, lang, selectedStage }) {
  const p = refreshProjects.find(p => p.id === projectId);
  const images = projectId === 4
    ? ['teddi-rollout.webp', 'teddi-film-poster.webp', 'teddi-instagram.webp', 'teddi-tiktok.webp']
    : ['redlens-preview.webp', 'redlens-diagnosis.webp', 'redlens-fit.webp', 'redlens-preview.webp'];

  return <div className="extended-project-system">
    <div className="extended-product-window" key={selectedStage}>
      <header>
        <Sparkle size={14} /><strong>{p.short}</strong>
        {projectId === 4 && selectedStage === 0 && <a className="extended-product-zoom" href={asset('teddi-rollout.png')} target="_blank" rel="noreferrer">{lang === 'zh' ? '查看完整大图' : 'View full image'}<ArrowSquareOut size={12} /></a>}
        <span>0{selectedStage + 1} / 04</span>
      </header>
      <img src={asset(images[selectedStage])} alt={p.steps[selectedStage].label[lang]} />
      <footer><CheckCircle size={13} />{p.steps[selectedStage].label[lang]}<small>{p.status[lang]}</small></footer>
    </div>
  </div>;
}

export function ExtendedProjectMedia({ id, lang }) {
  const p = refreshProjects.find(p => p.id === id);
  const [selected, setSelected] = useState(0);
  const m = p.media[selected] || p.media[0];
  const fullImage = m.id === 'rollout' ? m.full : m.src;

  return <section className="extended-case-media">
    <header>
      <span>{lang === 'zh' ? '项目实物与交付' : 'Project artifacts'}</span>
      <a href={p.url} target="_blank" rel="noreferrer">{lang === 'zh' ? '打开完整 Demo' : 'Open live demo'}<ArrowSquareOut size={15} /></a>
    </header>
    {m.type === 'video'
      ? <video key={m.id} controls playsInline preload="metadata" poster={asset(m.poster)} src={asset(m.src)} />
      : <a className={`extended-media-image ${m.id === 'rollout' ? 'rollout-asset' : ''}`} href={asset(fullImage)} target="_blank" rel="noreferrer" aria-label={`${lang === 'zh' ? '查看完整大图' : 'View full image'}: ${m.title[lang]}`}>
        <img src={asset(m.src)} alt={m.title[lang]} width={m.width} height={m.height} />
        <span>{lang === 'zh' ? '查看完整大图' : 'View full image'}<ArrowSquareOut size={15} /></span>
      </a>}
    <p>{m.caption[lang]}</p>
    <nav>{p.media.map((item, i) => <button key={item.id} aria-pressed={i === selected} onClick={() => setSelected(i)}>{localized(item.label, lang)}</button>)}</nav>
  </section>;
}
