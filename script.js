const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const cd=c=>`<div class="cd ${c}"><div class="fl"></div><div class="wk"></div><div class="bd"></div></div>`;
$$('[data-c]').forEach(e=>{e.outerHTML=cd(e.dataset.c)});
const fm=m=>m<60?`${Math.floor(m)} min`:`${Math.floor(m/60)} h ${String(Math.floor(m%60)).padStart(2,'0')} min`;
const W=[{k:'par',d:73,s:'Llama alta y algo inestable',e:'Se apagó. Dejó más hollín y cera derretida alrededor.'},{k:'coc',d:110,s:'Llama baja y quieta',e:'Se apagó. Dejó menos hollín y menos humo.'}];
W.forEach(w=>{w.c=$('#h .cd.'+w.k);const n=$('#h .col.'+w.k);w.ck=n.querySelector('.clk');w.st=n.querySelector('.st')});
let t=0,run=0,last=0;
function draw(){let lit=0;
W.forEach(w=>{const p=Math.min(t/w.d,1);w.c.style.setProperty('--h',1-.88*p);w.ck.textContent=fm(Math.min(t,w.d));
if(run&&p<1){w.c.classList.add('on');w.st.textContent=w.s;lit++}
else{w.c.classList.remove('on');w.st.textContent=t>0&&p>=1?w.e:'Apagada'}});
$('#h').style.setProperty('--g',.05+.1*lit);
if(t>=110){run=0;$('#msg').textContent='La de coco ardió 37 min más que la de parafina.';$('#go').textContent='Volver a encender'}
else if(t>=73)$('#msg').textContent='La parafina se apagó primero. El coco sigue encendido.'}
function loop(n){if(!run)return;t+=Math.max(0,n-last)/1000*$('#sp').value;last=n;draw();if(run)requestAnimationFrame(loop)}
$('#go').onclick=()=>{$('#msg').textContent='';if(run){run=0;t=0;$('#go').textContent='Encender las dos';draw();return}
t=0;run=1;last=performance.now();$('#go').textContent='Reiniciar';requestAnimationFrame(loop)};
draw();

const E=[['Cera','es el combustible: se derrite y sube por la mecha.'],['Mecha','de algodón trenzado, lleva la cera líquida hacia la llama por capilaridad.'],['Calor','la propia llama derrite la cera cercana y la convierte en vapor.'],['Oxígeno','el vapor de cera se mezcla con el aire y sostiene la combustión.']];
const on=[1,1,1,1];
$('#ec').innerHTML=cd('coc on');const ecd=$('#ec .cd');ecd.style.setProperty('--h',.75);
$('#el').innerHTML=E.map((e,i)=>`<button aria-pressed="true" data-i="${i}">${e[0]}</button>`).join('');
$('#et').textContent='Con los cuatro elementos, la llama se sostiene sola.';
$('#el').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;on[i]^=1;b.setAttribute('aria-pressed',!!on[i]);
const ok=on.every(Boolean),m=on.indexOf(0);ecd.classList.toggle('on',ok);
$('#et').textContent=ok?'Con los cuatro elementos, la llama se sostiene sola.':`Sin ${E[m][0].toLowerCase()} la llama se apaga: ${E[m][1]}`};

const P={ind:{m:'Materias primas: cera (parafina o vegetal), mecha de algodón trenzado, colorantes, fragancias, aditivos y moldes o frascos.',s:[
['Materia prima','Se eligen y almacenan los materiales y se calculan las cantidades para que toda la tanda salga igual.','s'],
['Fusión','La cera pasa de sólida a líquida en tanques con calor controlado, para que se derrita pareja y no se queme.','m'],
['Mezcla','Se agregan colorantes, fragancias y aditivos y se mezcla para que color y perfume queden parejos.','x'],
['Vertido','Se vuelca la cera en moldes o frascos que ya tienen la mecha centrada, de forma automática y sin burbujas.','p'],
['Enfriamiento','Los moldes pasan por un túnel de enfriamiento y la cera vuelve a ser sólida.','c'],
['Terminación','Se corta la mecha a medida, se corrigen detalles y se controlan forma, color y aroma.','d'],
['Producto terminado','Las velas aprobadas se empacan en cajas y se distribuyen a los comercios.','d']]},
art:{m:'Materiales: cera, mecha de algodón, recipiente o molde, colorante y fragancia (opcionales), recipiente para derretir y algo para sostener la mecha.',s:[
['Preparación de los materiales','Se juntan los materiales, se cortan las ceras en trozos grandes y se preparan los recipientes con sus mechas.','s'],
['Fusión de la cera','Cada cera se calienta a fuego hasta hacerse líquida, controlando que no se caliente de más.','m'],
['Preparación de la mecha','Se coloca la mecha en el centro del recipiente y se fija con un palito para que no se corra.','w'],
['Vertido de la cera','Se vierte la parafina en un recipiente y la de coco en otro, sin mover la mecha.','p'],
['Enfriamiento y solidificación','Las velas quedan quietas en un lugar plano hasta enfriarse y ponerse sólidas.','c']]}};
const S={s:[35,'#e9e4d8',0,'Cera sólida'],m:[55,'#f5b84e',0,'Cera líquida'],x:[55,'#d98fb0',0,'Cera con color y aroma'],w:[0,'#f5b84e',1,'Mecha centrada'],p:[85,'#f5b84e',1,'Vertiendo sin mover la mecha'],c:[85,'#efe6d2',1,'Cera sólida'],d:[85,'#efe6d2',1,'Vela lista']};
let k='ind',i=0,tm=0;
function show(){const L=P[k].s,st=L[i],c=S[st[2]];
$('#pst').innerHTML=L.map((x,j)=>`<li><button data-j="${j}"${j==i?' aria-current="step"':''}>${x[0]}</button></li>`).join('');
$('#pd').innerHTML=`<h3>${st[0]}</h3><p>${st[1]}</p>`;$('#pm').textContent=P[k].m;
const w=$('#wx');w.style.height=c[0]+'%';w.style.background=c[1];$('#wk2').style.opacity=c[2];
$('#jar').classList.toggle('melt',st[2]=='m');$('#cap').textContent=c[3];
$$('#tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.k==k))}
const go=d=>{i=(i+d+P[k].s.length)%P[k].s.length;show()};
$('#pst').onclick=e=>{const b=e.target.closest('button');if(b){i=+b.dataset.j;show()}};
$('#tabs').onclick=e=>{const b=e.target.closest('button');if(b){k=b.dataset.k;i=0;show()}};
$('#pv').onclick=()=>go(-1);$('#nx').onclick=()=>go(1);
$('#pp').onclick=()=>{if(tm){clearInterval(tm);tm=0;$('#pp').textContent='Reproducir'}else{tm=setInterval(()=>go(1),3500);$('#pp').textContent='Pausar'}};
show();

const B=[['Tiempo de solidificación',615,750,'10 min 15 s','12 min 30 s'],['Tiempo de combustión',73,110,'1 h 13 min','1 h 50 min']];
$('#bars').innerHTML=B.map(b=>`<div class="bg"><h3>${b[0]}</h3>`+[['par','Parafina',b[1],b[3]],['coc','Coco',b[2],b[4]]].map(x=>`<div class="br"><span>${x[1]}</span><div class="tr"><i class="${x[0]}" style="--w:${x[2]/b[2]*100}%"></i></div><b>${x[3]}</b></div>`).join('')+'</div>').join('');
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');o.unobserve(e.target)}}),{threshold:.3}).observe($('#bars'));
