import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BookmarkIcon, BookmarkFilledIcon, ChevronRightIcon, Cross1Icon, MagnifyingGlassIcon, MagicWandIcon, PaperPlaneIcon, PlayIcon, PauseIcon, CheckIcon, ReloadIcon, ExternalLinkIcon, ReaderIcon, TargetIcon, PlusIcon, MinusIcon } from '@radix-ui/react-icons';
import { BottomSheet, KeyboardInput, KeyboardTextarea, MobileScroll, useKeyboard, useKeyboardInsets } from './mobile';
import './prototype.css';
type Page='home'|'settings'|'route'|'detail'|'saved'|'finish';
type Sheet=''|'chat'|'map'|'source'|'navigation'|'feedback'|'exit';
type Prefs={duration:number;budget:number;interests:string[];intensity:string;destination:string;date:string;time:string};
type Plan={ids:number[];distance:number;duration:number;walking:number;stopping:number;buffer:number;cost:[number,number];version:number;preferences?:Prefs};
type Session={started:boolean;done:number[];skipped:number[]};
type Message={role:'user'|'assistant';text:string};
const W='https://mzj.sh.gov.cn/lnb-lyxx/20210506/16884e165f374f7387f1a62b57c47ced.html';
const B='https://data.library.sh.cn/entity/architecture/if3k5yb021u3c4vd';
const stops=[
{id:0,name:'武康大楼',tag:'建筑',stay:20,x:20,y:25,address:'淮海中路1842–1858号',hint:'从一栋建筑，读懂一段城市生活。',text:'武康大楼原称诺曼底公寓，由建筑师邬达克设计。它把一段街道的转角，变成了城市的视觉记忆。',note:'站在公共人行道上，看看建筑转角如何回应街道，再观察窗户、阳台与立面的重复节奏。不进入居民空间，也别为了拍照停留在车道。',source:W},
{id:1,name:'武康路街区',tag:'历史',stay:20,x:30,y:55,address:'武康路公共街道',hint:'把脚步放慢，看看街道的细节。',text:'沿公共街道观察建筑与人行道的关系，看看树荫、入口和街角如何组成日常生活。这是文化观察建议，不是对建筑年代的鉴定。',note:'比较两处建筑入口的退界、围墙和材料，用自己的语言记录差别。',source:W},
{id:2,name:'巴金故居',tag:'历史',stay:25,x:48,y:78,address:'武康路113号',hint:'让文字与居住的空间相遇。',text:'上海图书馆资料记载，巴金于1955年迁居武康路113号，并在这里创作了《随想录》等作品。',note:'本演示只安排公共街道外观观察。内部开放、预约与临时展览须以场馆当日公告为准，当前没有接入实时开放信息。',source:B},
{id:3,name:'安福路街区',tag:'在地生活',stay:20,x:67,y:60,address:'安福路公共街道',hint:'街区的故事，也写在日常里。',text:'从建筑走向街头生活，观察店铺、行人与街道尺度。文化探索也可以是理解一座城市怎样被使用。',note:'找一处不妨碍通行的地方休息。这里的内容是观察建议，不代表商户推荐。',source:W},
{id:4,name:'乌鲁木齐中路',tag:'美食',stay:20,x:84,y:35,address:'乌鲁木齐中路公共街道',hint:'给漫步留一段自由的收尾。',text:'把最后一站留给自己的发现：一段街景、一份点心，或坐下来整理刚才的见闻。',note:'餐饮选择与花费由你决定。80–110元是演示餐饮预留，不是门票报价。',source:W}
];
const seed:Plan={ids:[0,1,2,3,4],distance:3.2,duration:180,walking:48,stopping:105,buffer:27,cost:[80,110],version:1};
function load<T,>(k:string,f:T):T{try{return JSON.parse(localStorage.getItem(k)||'null')??f}catch{return f}}
function put(k:string,v:unknown){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
function today(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai'}).format(new Date())}
const defaults:Prefs={duration:180,budget:120,interests:['建筑','历史'],intensity:'适中',destination:'上海 · 徐汇',date:today(),time:'14:00'};
function planFor(p:Prefs,v:number):Plan{
 let n=Math.min(5,Math.max(1,Math.floor(p.duration/35)));
 if(p.intensity==='轻松')n=Math.min(n,3);
 const ids=Array.from({length:n},(_,i)=>i),distance=[0,.7,1.3,2.4,3.2][n-1];
 const walking=Math.ceil(distance/(p.intensity==='轻松'?3:p.intensity==='深入'?4.5:4)*60);
 const stopping=ids.reduce((a,id)=>a+stops[id].stay,0),buffer=Math.min(27,Math.floor(p.duration*.15));
 return{ids,distance,walking,stopping,buffer,duration:walking+stopping+buffer,cost:n===5&&p.budget>=110?[80,110]:[0,Math.min(40,p.budget)],version:v,preferences:{...p}};
}
export default function Prototype(){
 const [page,setPage]=useState<Page>(()=>{const screen=new URLSearchParams(location.search).get('screen') as Page;return ['home','settings','route','detail','saved','finish'].includes(screen)?screen:'home'});
 const [prefs,setPrefs]=useState<Prefs>(()=>load('lm-prefs',defaults)),[plan,setPlan]=useState<Plan>(()=>load('lm-plan',seed)),[saved,setSaved]=useState<Plan|null>(()=>load('lm-saved',null));
 const [session,setSession]=useState<Session>(()=>load('lm-session',{started:false,done:[],skipped:[]}));
 const [sheet,setSheet]=useState<Sheet>(''),[selected,setSelected]=useState(0),[search,setSearch]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false),[stage,setStage]=useState(0);
 const [message,setMessage]=useState(''),[messages,setMessages]=useState<Message[]>([]),[thinking,setThinking]=useState(false),[pending,setPending]=useState<Plan|null>(null);
 const [expanded,setExpanded]=useState(false),[speaking,setSpeaking]=useState(false),[toast,setToast]=useState(''),[zoom,setZoom]=useState(1),[rating,setRating]=useState(''),[note,setNote]=useState(''),[feedback,setFeedback]=useState('');
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null),keyboard=useKeyboard(),insets=useKeyboardInsets();
 const detail=stops[selected],remaining=plan.ids.filter(id=>!session.done.includes(id)&&!session.skipped.includes(id)),next=remaining[0];
 useEffect(()=>put('lm-prefs',prefs),[prefs]);useEffect(()=>put('lm-plan',plan),[plan]);useEffect(()=>put('lm-session',session),[session]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t)},[toast]);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);window.speechSynthesis?.cancel()},[]);
 function go(p:Page){keyboard.hide();window.speechSynthesis?.cancel();setSpeaking(false);setPage(p);setError('')}
 function open(s:Sheet){keyboard.hide();setSheet(s)}
 function close(){keyboard.hide();setSheet('')}
 const isSaved=!!saved && saved.ids.join(',')===plan.ids.join(',') && saved.duration===plan.duration;
 function save(){const v=isSaved?null:plan;setSaved(v);put('lm-saved',v);setToast(v?'已保存到本机':'已取消保存')}
 function showDetail(id:number){setSelected(id);setExpanded(false);go('detail')}
 function fail(message:string){setError(message);setToast(message)}
 function generate(){
 keyboard.hide();
 if(!/上海|徐汇/.test(prefs.destination))return fail('目前只开放上海徐汇示范街区。');
 if(!prefs.interests.length)return fail('请选择至少一项兴趣。');
 if(!Number.isFinite(prefs.budget)||prefs.budget<0||prefs.budget>1000)return fail('每人预算请填写0–1000元。');
 if(!prefs.date||!prefs.time||prefs.date<today())return fail('请选择今天或以后的日期与时间。');
 const v=planFor(prefs,plan.version+1);
 if(+prefs.time.slice(0,2)*60 + +prefs.time.slice(3)+v.duration>1440)return fail('行程会跨日，请提前出发或缩短时长。');
 setError('');setPending(null);setMessages([]);setBusy(true);setStage(0);
 timer.current=setTimeout(()=>{setStage(1);timer.current=setTimeout(()=>{setStage(2);timer.current=setTimeout(()=>{setPlan(v);setSelected(0);setSession({started:false,done:[],skipped:[]});setBusy(false);go('route')},450)},450)},450);
 }
 function preview(){
 const future=plan.ids.filter(id=>!session.done.includes(id)&&!session.skipped.includes(id));
 if(future.length<2){setMessages(m=>[...m,{role:'assistant',text:'余下仅一站，无法再删减。你可以多休息一会儿，或结束行程。'}]);return}
 const removed=future[Math.floor(future.length/2)],ids=plan.ids.filter(id=>id!==removed),distance=Math.max(0,+(plan.distance-.6).toFixed(1));
 const walking=Math.ceil(distance/4*60),stopping=ids.reduce((a,id)=>a+stops[id].stay,0);
 setPending({...plan,ids,distance,walking,stopping,duration:walking+stopping+plan.buffer,version:plan.version+1});
 setMessages(m=>[...m,{role:'assistant',text:'建议移除“'+stops[removed].name+'”，保留已到达站点。以下是演示调整，请确认后应用。'}]);
 }
 function send(text=message){
 const q=text.trim();if(!q||thinking)return;keyboard.hide();setMessage('');setMessages(m=>[...m,{role:'user',text:q}]);setThinking(true);
 timer.current=setTimeout(()=>{setThinking(false);if(/少|累|缩短|跳过|下雨|替换|休息/.test(q)){preview();return}
 const answer=/为什么|推荐/.test(q)?'你选择了'+prefs.interests.join('、')+'，这条路线围绕街区建筑与文化观察展开，包含停留和休息。距离与时序为演示估算，真实使用须由地图路网和开放状态校验。':/建筑|故事|历史|邬达克|巴金/.test(q)?detail.text+'\n\n观察提示：'+detail.note+'\n\n可在景点详情的“资料来源”中核对依据。':'现有资料无法确认这个问题。我可以介绍已核实的景点背景，或帮你缩短路线，不会编造营业、票价和历史轶事。';
 setMessages(m=>[...m,{role:'assistant',text:answer}]);},700);
 }
 function audio(){
 if(!('speechSynthesis'in window)){setExpanded(true);return setToast('语音不可用，已展开全文')}
 if(speaking){speechSynthesis.pause();setSpeaking(false);return}
 if(speechSynthesis.paused){speechSynthesis.resume();setSpeaking(true);return}
 const u=new SpeechSynthesisUtterance(detail.text+'。'+detail.note);u.lang='zh-CN';u.rate=.9;u.onend=()=>setSpeaking(false);u.onerror=()=>{setSpeaking(false);setExpanded(true);setToast('语音不可用，请阅读全文')};speechSynthesis.speak(u);setSpeaking(true);
 }
 function map(full=false){return <div className={'route-map '+(full?'map-large':'')} data-scroll-drag="ignore"><div className="map-inner" style={{transform:'scale('+zoom+')'}}><img src="/assets/neighborhood-map.jpg" alt="上海徐汇路线示意，非真实导航地图"/>{plan.ids.map((id,i)=><button key={id} className={'map-pin '+(selected===id?'active ':'')+(session.done.includes(id)?'done':'')} style={{left:stops[id].x+'%',top:stops[id].y+'%'}} aria-label={'地图第'+(i+1)+'站 '+stops[id].name} aria-pressed={selected===id} onClick={()=>{setSelected(id);setToast('已选中 '+stops[id].name)}}>{session.done.includes(id)?<CheckIcon/>:i+1}</button>)}<span className="map-label start">起点 · 武康大楼</span><span className="map-label end">终点 · {stops[plan.ids[plan.ids.length-1]].name}</span></div><span className="map-caption">上海 徐汇 · 示意地图</span><div className="map-tools"><button className="icon" aria-label="地图全览" onClick={()=>{setZoom(1);if(!full)open('map')}}><ReaderIcon/></button><button className="icon" aria-label="定位起点" onClick={()=>{setSelected(plan.ids[0]);setZoom(1);setToast('演示定位至起点，未获取真实位置')}}><TargetIcon/></button>{full&&<><button className="icon" aria-label="地图放大" onClick={()=>setZoom(z=>Math.min(1.6,z+.2))}><PlusIcon/></button><button className="icon" aria-label="地图缩小" onClick={()=>setZoom(z=>Math.max(1,z-.2))}><MinusIcon/></button></>}</div></div>}
 const end=()=>{setSession(s=>({...s,started:false}));close();go('finish')};
 return <div className="lm-app">
 <header className="lm-header"><button className="icon" aria-label={page==='home'?'选择城市':'返回'} onClick={()=>page==='home'?setToast('目前开放上海 · 徐汇示范街区'):page==='route'&&session.started?open('exit'):go(page==='detail'?'route':'home')}><ArrowLeftIcon/></button><button className="brand" onClick={()=>go('home')}>巷遇 <span>LaneMuse</span></button><button className="icon" aria-label={page==='home'?'我的路线':'保存路线'} onClick={()=>page==='home'?go('saved'):save()}>{isSaved?<BookmarkFilledIcon/>:<BookmarkIcon/>}</button></header>
 <MobileScroll key={page} className="lm-scroll"><main className={'lm-content page-'+page}>
 {page==='home'&&<>
 <p className="eyebrow">A LITTLE WALK. A NEW PERSPECTIVE.</p><span className="sticker">城市里的小小出走</span><h1 className="home-title">把城市，<br/>走成自己的故事。</h1>
 <figure className="home-photo"><img src="/assets/wukang-street.jpg" alt="秋日武康大楼，AI生成示意照片"/><figcaption>SHANGHAI / 下一页，从街角开始</figcaption></figure>
 <div className="searchbox"><MagnifyingGlassIcon/><KeyboardInput aria-label="搜索目的地" placeholder="想去哪个街区？" value={search} onChange={e=>setSearch(e.target.value)} onBlur={()=>keyboard.hide()} onKeyDown={e=>{if(e.key==='Enter'){setPrefs(p=>({...p,destination:search||defaults.destination}));go('settings')}}}/><button className="icon" aria-label="搜索" onClick={()=>{setPrefs(p=>({...p,destination:search||defaults.destination}));go('settings')}}><ArrowRightIcon/></button></div>
 <button className="primary" onClick={()=>go('settings')}>规划我的漫步 <ArrowRightIcon/></button>
 <div className="section-heading"><h2>编辑的街区手记</h2><span>01 / 上海</span></div><button className="editorial" onClick={()=>{setPlan(seed);setPrefs(defaults);setSelected(0);setMessages([]);setPending(null);setSession({started:false,done:[],skipped:[]});go('route')}}><img src="/assets/wukang-doodle.png" alt="武康大楼手绘插画"/><div><b>梧桐下的建筑漫步</b><p>建筑 · 历史 · 3小时 · 3.2km</p><small>一段读懂街区的慢时光</small></div><ChevronRightIcon/></button>
 <p className="fineprint">上海徐汇示范街区 · 无需登录<br/>交互演示：行程与地图为模拟数据，照片为AI生成。</p><button className="text-link" onClick={()=>go('saved')}>查看本机保存的路线 <ArrowRightIcon/></button>
 </>}
 {page==='settings'&&<>
 <p className="eyebrow">MAKE IT YOUR WALK / 01</p><h1>今天，想怎样探索？</h1><p className="intro">给巷遇一点线索，把时间留给发现。</p>
 <section className="form-section"><h2><span>01</span> 去哪里，什么时候</h2><label>目的地<KeyboardInput aria-label="目的地" value={prefs.destination} onChange={e=>setPrefs(p=>({...p,destination:e.target.value}))} onBlur={()=>keyboard.hide()}/></label><p className="field-hint">路线起点：武康大楼。本演示不获取真实位置。</p><div className="form-row"><label>日期<KeyboardInput aria-label="出发日期" type="date" min={today()} value={prefs.date} onChange={e=>setPrefs(p=>({...p,date:e.target.value}))} onBlur={()=>keyboard.hide()}/></label><label>出发时间<KeyboardInput aria-label="出发时间" type="time" value={prefs.time} onChange={e=>setPrefs(p=>({...p,time:e.target.value}))} onBlur={()=>keyboard.hide()}/></label></div></section>
 <section className="form-section"><h2><span>02</span> 按自己的节奏</h2><label>你有多久？</label><div className="choices">{[60,120,180,240,360].map(d=><button key={d} aria-pressed={prefs.duration===d} className={prefs.duration===d?'selected':''} onClick={()=>setPrefs(p=>({...p,duration:d}))}>{d/60}小时</button>)}</div>
 <label>感兴趣的事 <small>选1–3项</small></label><div className="choices">{['历史','建筑','在地生活','美食','艺术'].map(t=><button key={t} aria-pressed={prefs.interests.includes(t)} className={prefs.interests.includes(t)?'selected':''} onClick={()=>setPrefs(p=>({...p,interests:p.interests.includes(t)?p.interests.filter(v=>v!==t):p.interests.length<3?[...p.interests,t]:p.interests}))}>{t}</button>)}</div>
 <label>每人预算上限（元）<KeyboardInput aria-label="每人预算" type="number" inputMode="numeric" min="0" max="1000" value={prefs.budget} onChange={e=>setPrefs(p=>({...p,budget:Number(e.target.value)}))} onBlur={()=>keyboard.hide()}/></label><p className="field-hint">含计划内餐饮和门票，不含往返起终点交通。</p><label>步行强度</label><div className="choices intensity">{[['轻松','≤2km'],['适中','≤4km'],['深入','≤7km']].map(([v,s])=><button key={v} aria-pressed={prefs.intensity===v} className={prefs.intensity===v?'selected':''} onClick={()=>setPrefs(p=>({...p,intensity:v}))}>{v}<small>{s}</small></button>)}</div></section>
 {error&&<p className="error" role="alert">{error}</p>}<p className="fineprint">演示根据时长、预算与强度改变路线；兴趣用于解释推荐。真实路网与营业校验尚未接入。</p>
 </>}
 {page==='route'&&<>
 {session.started?<div className="walking-banner"><span>正在漫步 / {session.done.length}站已到达</span><h1>{next===undefined?'这一程，值得记住。':'下一站 · '+stops[next].name}</h1><p>到达后请手动确认，导航不会自动记录足迹。</p></div>:<section className="route-hero"><div><span className="sticker">演示路线</span><h1>梧桐下的<br/>建筑漫步</h1><p className="city">上海 <span>SHANGHAI WALK</span></p></div><figure><img src="/assets/wukang-street.jpg" alt="武康大楼AI生成示意照片"/><figcaption>WANDER & WONDER</figcaption></figure><p className="hero-caption">沿街读建筑，也读城市的日常。</p></section>}
 <section className="route-summary"><div className="stats"><div><strong>{+(plan.duration/60).toFixed(1)}</strong>小时</div><div><strong>{plan.distance}</strong>km</div><div><strong>{plan.ids.length}</strong>站</div></div><p className="cost">预计 ¥{plan.cost[0]}–{plan.cost[1]}/人 <span>· 含停留与休息</span></p><img className="summary-doodle" src="/assets/wukang-doodle.png" alt=""/></section>
 {map()}<button className="stop-summary" onClick={()=>showDetail(selected)}><strong>{String(plan.ids.indexOf(selected)+1).padStart(2,'0')}</strong><div><b>{detail.name}</b><p>{detail.stay}分钟 · {detail.hint}</p></div><ChevronRightIcon/></button>
 <button className="ai-entry" onClick={()=>open('chat')}><MagicWandIcon/><b>问问巷遇</b><span>想走少一点？</span><ChevronRightIcon/></button>
 <details className="itinerary"><summary>展开完整行程 <span>{plan.ids.length}站 · v{plan.version}</span></summary>{plan.ids.map((id,i)=><div className="itinerary-row" key={id}><button onClick={()=>showDetail(id)}><span className="ordinal">{i+1}</span><div><b>{stops[id].name}</b><p>{stops[id].stay}分钟 · {session.done.includes(id)?'已到达':session.skipped.includes(id)?'已跳过':stops[id].tag}</p></div><ChevronRightIcon/></button>{i<plan.ids.length-1&&<small>步行至下一站 · 演示路网</small>}</div>)}<p className="field-hint">步行{plan.walking} + 停留{plan.stopping} + 缓冲{plan.buffer} = {plan.duration}分钟</p></details>
 <div className="recommendation"><h3>为什么是这条路线？</h3><p>围绕你选择的{prefs.interests.join('与')}，用建筑、街道与生活观察串起徐汇。节奏按“{prefs.intensity}”设置，预计花费不超过预算上限。</p></div><button className="text-link" onClick={()=>go('settings')}>修改偏好，重新规划 <ReloadIcon/></button><p className="fineprint">示意地图不用于真实导航。按公共街道外观观察安排；室内开放、预约、费用待确认。照片为AI生成。</p>
 </>}
 {page==='detail'&&<>
 <p className="eyebrow">A PLACE, A STORY / {String(selected+1).padStart(2,'0')}</p><h1>{detail.name}</h1><p className="intro">{detail.hint}</p>{selected===0?<figure className="detail-photo"><img src="/assets/wukang-street.jpg" alt="武康大楼AI生成示意照片"/><figcaption>LOOK CLOSER / 走近一点，发现更多</figcaption></figure>:<div className="place-sketch"><img src="/assets/wukang-doodle.png" alt="建筑主题手绘示意，非当前景点外观"/><p>街区文化观察手记</p></div>}
 <dl className="facts"><div><dt>地址</dt><dd>{detail.address}</dd></div><div><dt>建议停留</dt><dd>{detail.stay}分钟</dd></div><div><dt>开放与预约</dt><dd>公共街道外观观察；室内信息待确认</dd></div><div><dt>预计费用</dt><dd>外观观察不安排购票，餐饮自选</dd></div></dl>
 <section className="culture"><p className="eyebrow">CULTURE NOTES</p><div className="section-heading"><h2>30秒，认识这里</h2><button className="icon" aria-label={speaking?'暂停讲解':'播放讲解'} onClick={audio}>{speaking?<PauseIcon/>:<PlayIcon/>}</button></div><p>{detail.text}</p><button className="text-link" onClick={()=>setExpanded(v=>!v)}>{expanded?'收起讲解':'展开文化观察讲解'} <ChevronRightIcon/></button>{expanded&&<div className="expanded-culture"><h3>把目光留给细节</h3><p>{detail.note}</p><p className="field-hint">观察提示与史实分开呈现。语音由浏览器合成，时长以实际播放为准。</p></div>}<button className="source-link" onClick={()=>open('source')}><ReaderIcon/> 资料来源与核验说明 <ExternalLinkIcon/></button></section>
 <button className="ai-entry" onClick={()=>open('chat')}><MagicWandIcon/><b>问问这段故事</b><ChevronRightIcon/></button><button className="text-link" onClick={()=>open('feedback')}>发现资料问题？告诉我们</button>
 </>}
 {page==='saved'&&<><p className="eyebrow">MY LITTLE WALKS</p><h1>保存下来的小期待。</h1><p className="intro">仅保存在这台设备，无需登录。</p>{saved?<><button className="saved-route" onClick={()=>{setPlan(saved);setPrefs(saved.preferences||defaults);setSession({started:false,done:[],skipped:[]});setSelected(saved.ids[0]);go('route')}}><img src="/assets/wukang-street.jpg" alt="已保存路线示意"/><div><b>梧桐下的建筑漫步</b><p>{saved.duration}分钟 · {saved.distance}km · {saved.ids.length}站</p><span>打开路线 <ArrowRightIcon/></span></div></button><button className="text-link" onClick={()=>{setSaved(null);put('lm-saved',null);setToast('已删除本机保存路线')}}>删除保存的路线</button></>:<div className="empty"><img src="/assets/wukang-doodle.png" alt="城市建筑手绘"/><h2>下一次漫步，从这里开始。</h2><p>在路线页点击书签，就能留住一段期待。</p><button className="primary" onClick={()=>go('home')}>发现一条路线 <ArrowRightIcon/></button></div>}{session.started&&<button className="secondary" onClick={()=>go('route')}>继续上次的漫步</button>}<button className="text-link" onClick={()=>{['lm-session','lm-plan','lm-prefs','lm-saved','lm-feedback','lm-content-feedback'].forEach(k=>localStorage.removeItem(k));setSaved(null);setPlan(seed);setPrefs(defaults);setSession({started:false,done:[],skipped:[]});setToast('已清除本机路线与偏好')}}>清除本机数据</button></>}
 {page==='finish'&&<div className="finish"><p className="eyebrow">EVERY WALK TELLS A STORY</p><img src="/assets/wukang-doodle.png" alt="城市漫步手绘纪念"/><span className="sticker">这一程，值得记住</span><h1>城市很大，<br/>今天又读懂一点。</h1><p>手动记录到达 {session.done.length} 站<br/>这是一段属于你的城市记忆。</p><h2>这次漫步体验如何？</h2><div className="choices">{['很喜欢','还不错','需要改进'].map(v=><button key={v} aria-pressed={rating===v} className={rating===v?'selected':''} onClick={()=>setRating(v)}>{v}</button>)}</div><KeyboardTextarea aria-label="漫步反馈" value={note} onChange={e=>setNote(e.target.value)} onBlur={()=>keyboard.hide()} placeholder="哪一个瞬间让你记住这座城市？（选填）"/><button className="primary" disabled={!rating} onClick={()=>{put('lm-feedback',{rating,note});setToast('感谢反馈，已保存至本机演示记录');go('home')}}>保存反馈，回到发现 <ArrowRightIcon/></button><button className="text-link" onClick={()=>go('home')}>暂时跳过</button></div>}
 </main></MobileScroll>
 <footer className="lm-footer" onPointerDown={e=>e.preventDefault()} style={{bottom:insets.bottomInset}}>
 {page==='route'&&(session.started?<div className="walk-actions">{next!==undefined?<><button className="secondary" onClick={()=>open('navigation')}>去下一站</button><button className="primary" onClick={()=>{setSession(s=>({...s,done:[...s.done,next]}));setSelected(remaining[1]??next);setToast('已记录到达')}}>确认到达 <CheckIcon/></button></>:<button className="primary" onClick={end}>结束漫步 <ArrowRightIcon/></button>}<button className="icon" aria-label="行程操作" onClick={()=>open('exit')}><Cross1Icon/></button></div>:<button className="primary" onClick={()=>{setSession({started:true,done:[],skipped:[]});setSelected(plan.ids[0]);setToast('漫步已开始，到达后请手动确认')}}>开始漫步 <ArrowRightIcon/></button>)}
 {page==='settings'&&<button className="primary" disabled={busy} onClick={generate}>{busy?['理解你的偏好…','匹配街区地点…','整理演示路线…'][stage]:'生成我的 CityWalk'} {busy?<ReloadIcon className="spin"/>:<MagicWandIcon/>}</button>}
 {page==='detail'&&<button className="primary" onClick={()=>open('navigation')}>导航到这里 <ArrowRightIcon/></button>}
 </footer>
 <BottomSheet open={sheet==='chat'} onOpenChange={v=>{if(!v)close()}} title="问问巷遇" description={(page==='detail'?'正在聊：'+detail.name:'基于当前'+plan.ids.length+'站路线')+' · 本地演示助手'} snap={.89}>
 <div className="chat-body"><button className="text-link chat-close-top" onClick={close}>返回路线 <Cross1Icon/></button><p className="chat-welcome">让路线适合你的脚步，<br/>也让故事回应你的好奇。</p>{messages.map((m,i)=><div key={i} className={'bubble '+m.role}><small>{m.role==='assistant'?'巷遇 · 演示回复':'你'}</small><p>{m.text}</p>{m.role==='assistant'&&<button className="source-link" onClick={()=>setToast('有帮助的反馈已记录在本次会话')}>有帮助 <CheckIcon/></button>}</div>)}{thinking&&<div className="bubble" role="status">正在整理…<button className="text-link" onClick={()=>{if(timer.current)clearTimeout(timer.current);setThinking(false);setMessages(m=>[...m,{role:'assistant',text:'已停止生成，可重新提问。'}])}}>停止生成</button></div>}
 {pending&&<div className="change-preview"><span className="sticker">调整预览 · 尚未生效</span><h3>少走一点，多留一点时间。</h3><p>{plan.ids.length}站 → {pending.ids.length}站<br/>{plan.distance}km → {pending.distance}km<br/>{plan.duration}分钟 → {pending.duration}分钟<br/>预计 ¥{plan.cost.join('–')} → ¥{pending.cost.join('–')}/人</p><p>移除：{plan.ids.filter(id=>!pending.ids.includes(id)).map(id=>stops[id].name).join('、')}<br/>已到达站点保持不变；路网为演示估算。</p><div className="button-row"><button className="secondary" onClick={()=>setPending(null)}>保留原路线</button><button className="primary" onClick={()=>{setPlan(pending);if(!pending.ids.includes(selected))setSelected(pending.ids[0]);setPending(null);setToast('已应用调整');setMessages(m=>[...m,{role:'assistant',text:'已应用新版本，路线摘要和站点列表已同步更新。'}])}}>应用调整 <CheckIcon/></button></div></div>}
 <div className="suggestions">{['为什么推荐这里','走少一点','这栋建筑有什么故事'].map(q=><button key={q} aria-disabled={thinking} onClick={()=>send(q)}>{q}</button>)}</div><form className="chat-composer" onSubmit={e=>{e.preventDefault();send()}}><KeyboardInput aria-label="向巷遇提问" placeholder="问故事，或调整这段漫步…" value={message} onChange={e=>setMessage(e.target.value)} onBlur={()=>keyboard.hide()}/><button className="icon" aria-label="发送消息" type="submit" disabled={!message.trim()||thinking}><PaperPlaneIcon/></button></form><button className="text-link sheet-close" onClick={close}>收起对话 <Cross1Icon/></button></div>
 </BottomSheet>
 <BottomSheet open={sheet==='map'} onOpenChange={v=>{if(!v)close()}} title="路线地图" description="示意地理 · 点选编号查看站点" snap={.9}>{map(true)}<h2>{detail.name}</h2><p>{detail.hint}</p><div className="button-row"><button className="secondary" onClick={close}>返回路线</button><button className="primary" onClick={()=>{close();showDetail(selected)}}>查看景点 <ArrowRightIcon/></button></div></BottomSheet>
 <BottomSheet open={sheet==='source'} onOpenChange={v=>{if(!v)close()}} title="资料来源" description="将史实与观察提示分开" snap={.7}><h3>{detail.name}</h3><p>{detail.text}</p>{(selected===0||selected===2)?<a className="source-link" href={detail.source} target="_blank" rel="noreferrer">{selected===2?'上海图书馆 · 巴金故居':'上海市民政局 · 踏访武康大楼'} <ExternalLinkIcon/></a>:<p>此段为编辑观察建议，不作为历史事实引用。</p>}<p>检索日期：2026-11-11。来源支持历史背景，不代表今日营业与预约状态。照片与插画为AI生成示意，路线未经实地核验。</p><button className="secondary" onClick={close}>知道了</button></BottomSheet>
 <BottomSheet open={sheet==='navigation'} onOpenChange={v=>{if(!v)close()}} title="导航至下一段故事" description="导航服务未接入，提供地址回退" snap={.57}><h2>{stops[page==='route'?(next??selected):selected].name}</h2><p>{stops[page==='route'?(next??selected):selected].address}</p><p>请在常用地图核对目的地。当前示意地图不提供转向导航，也不会自动记录到达。</p><button className="primary" onClick={async()=>{try{await navigator.clipboard.writeText(stops[page==='route'?(next??selected):selected].address);setToast('地址已复制')}catch{setToast('复制不可用，请选择上方地址')}}}>复制目的地地址 <ReaderIcon/></button><button className="text-link" onClick={close}>返回漫步</button></BottomSheet>
 <BottomSheet open={sheet==='feedback'} onOpenChange={v=>{if(!v)close()}} title="一起把故事讲准确" description={'反馈对象：'+detail.name} snap={.7}><div className="choices">{['事实有误','资料过期','内容不清楚'].map(v=><button key={v} className={feedback===v?'selected':''} onClick={()=>setFeedback(v)}>{v}</button>)}</div><KeyboardTextarea aria-label="资料问题说明" placeholder="补充你发现的问题（选填）" value={note} onChange={e=>setNote(e.target.value)} onBlur={()=>keyboard.hide()}/><button className="primary" disabled={!feedback} onClick={()=>{put('lm-content-feedback',{poi:detail.name,feedback,note});close();setToast('反馈已保存在本机，演示不会发送到服务端')}}>保存反馈</button></BottomSheet>
 <BottomSheet open={sheet==='exit'} onOpenChange={v=>{if(!v)close()}} title="按自己的节奏走" description="保留已到达记录" snap={.55}>{next!==undefined&&<button className="secondary" onClick={()=>{setSession(s=>({...s,skipped:[...s.skipped,next]}));setSelected(remaining[1]??next);close();setToast('已跳过，不计为到达')}}>跳过下一站</button>}<button className="primary" onClick={end}>结束本次漫步</button><button className="text-link" onClick={close}>继续漫步</button></BottomSheet>
 {toast&&<div className="lm-toast" role="status">{toast}</div>}
 </div>;
}








