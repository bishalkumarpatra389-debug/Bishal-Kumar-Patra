// ===== Configuration: edit these =====
const CONFIG={email:"bkp1234@gmail.com",whatsapp:"" /* e.g. "919XXXXXXXXX" – digits only, with country code */,mapEmbed:"" /* paste a Google Maps embed link when you have the address */};
// ===== Products & services data (add new rentals here) =====
const ITEMS=[
{id:"bricks",cat:"material",name:"Bricks",art:"brick",desc:"Uniform, well-fired bricks with strong compressive strength for walls and foundations.",price:null,unit:"",status:"Available"},
{id:"sand",cat:"material",name:"Sand",art:"sand",desc:"Clean, screened construction sand for plaster, masonry and concrete mixes.",price:null,unit:"",status:"Available"},
{id:"plates",cat:"material",name:"Shuttering Plates",art:"plate",desc:"Sturdy reusable steel plates for slab, beam and column shuttering.",price:null,unit:"",status:"Limited"},
{id:"tractor",cat:"rental",name:"Tractor Rental",art:"tractor",desc:"Tractors with operator for hauling, levelling and site work, on daily or hourly hire.",price:null,unit:"",status:"Available"},
{id:"equip",cat:"rental",name:"Construction Equipment Rental",art:"equip",desc:"Equipment for excavation, lifting and mixing. More machines are added as we grow.",price:null,unit:"",status:"Available"}];
const ART={
brick:'<svg viewBox="0 0 300 190"><g fill="#f97316">'+[0,1,2,3].map(r=>[0,1,2,3].map(c=>`<rect x="${20+c*66-(r%2?33:0)}" y="${22+r*38}" width="62" height="34" rx="4" opacity="${.65+((r+c)%3)*.12}"/>`).join('')).join('')+'</g></svg>',
sand:'<svg viewBox="0 0 300 190"><path d="M0 150Q60 70 120 120T240 95 300 130V190H0Z" fill="#d4a373"/><path d="M0 170Q80 110 150 150T300 140V190H0Z" fill="#b98550"/><circle cx="240" cy="40" r="20" fill="#f97316" opacity=".9"/></svg>',
plate:'<svg viewBox="0 0 300 190"><g fill="#6b7280" stroke="#9ca3af" stroke-width="2">'+[0,1,2].map(i=>`<rect x="${40+i*14}" y="${30+i*26}" width="190" height="56" rx="5" opacity="${.6+i*.2}"/>`).join('')+'</g><g fill="#1c1c1e">'+[0,1,2,3,4].map(i=>`<circle cx="${100+i*30}" cy="134" r="5"/>`).join('')+'</g></svg>',
tractor:'<svg viewBox="0 0 300 190"><rect x="60" y="70" width="110" height="50" rx="8" fill="#f97316"/><rect x="130" y="40" width="50" height="45" rx="6" fill="#fb923c"/><rect x="170" y="90" width="70" height="26" rx="5" fill="#f97316"/><circle cx="90" cy="130" r="38" fill="#111" stroke="#9ca3af" stroke-width="5"/><circle cx="90" cy="130" r="12" fill="#f97316"/><circle cx="210" cy="143" r="24" fill="#111" stroke="#9ca3af" stroke-width="5"/><path d="M0 168h300" stroke="#34343a" stroke-width="3"/></svg>',
equip:'<svg viewBox="0 0 300 190"><rect x="50" y="125" width="130" height="28" rx="14" fill="#111" stroke="#9ca3af" stroke-width="4"/><rect x="70" y="80" width="80" height="45" rx="6" fill="#f97316"/><path d="M140 90L210 40 250 95" stroke="#fb923c" stroke-width="12" fill="none" stroke-linejoin="round"/><path d="M250 95l12 40h-30z" fill="#9ca3af"/><path d="M0 168h300" stroke="#34343a" stroke-width="3"/></svg>'};
const $=s=>document.querySelector(s);
const priceHTML=i=>i.price==null?'<span class="price">Contact for Price</span>':`<span class="price">₹${i.price} <small>${i.unit}</small></span>`;
const badge=s=>`<span class="badge b-${s.split(' ')[0]}">${s}</span>`;
const card=i=>`<article class="card"><div class="art">${ART[i.art]}</div><div class="body"><div class="row"><h3>${i.name}</h3>${badge(i.status)}</div><p>${i.desc}</p><div class="row">${priceHTML(i)}<button class="btn sm" data-enq="${i.id}">${i.cat==='rental'?'Book Now':'Enquire'}</button></div></div></article>`;
const icon=d=>`<svg viewBox="0 0 24 24"><path d="${d}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function home(){
return `<section class="hero" id="home"><svg class="bg" viewBox="0 0 900 520" aria-hidden="true"><g fill="#26262a"><rect x="560" y="140" width="40" height="380"/><rect x="640" y="220" width="70" height="300"/><rect x="740" y="90" width="50" height="430"/></g><path d="M500 60h330M780 60v60M500 60l-30 70" stroke="#f97316" stroke-width="8" fill="none"/><path d="M0 520h900" stroke="#f97316" stroke-width="6"/></svg>
<div class="wrap"><h1>Building Strong Foundations, Delivering Quality.</h1><p>Babuli Works supplies bricks, sand and shuttering plates, and rents out tractors and construction equipment, so your site never waits on materials.</p><div class="cta"><a class="btn" href="#products">Explore Products</a><a class="btn ghost" href="#contact" data-quote>Get a Quote</a></div></div></section><div class="stripe"></div>
<section id="about"><div class="wrap about"><div><h2>Built on reliable supply</h2><p style="margin-top:16px">Babuli Works is a construction material supplier and equipment rental business. Customers buy the materials their project needs and rent the machines to move and build with them.</p><p>We focus on three things: quality that holds up on site, dependable service you can plan around, and fair treatment of every customer, large or small.</p></div><div class="stats"><div class="stat"><b>3</b>Core materials</div><div class="stat"><b>2</b>Rental services</div><div class="stat"><b>1 day</b>Typical enquiry reply goal</div><div class="stat"><b>100%</b>Focus on your site</div></div></div></section>
<section id="products" class="alt"><div class="wrap"><div class="head"><div><h2>Construction materials</h2><p>Pick what you need and send an enquiry. We confirm price and delivery with you directly.</p></div><div class="tools"><input id="q" type="search" placeholder="Search materials" aria-label="Search materials"><select id="f" aria-label="Filter by availability"><option value="">All status</option><option>Available</option><option>Limited</option><option>Out of Stock</option></select></div></div><div class="grid" id="mgrid"></div></div></section>
<section id="services"><div class="wrap"><div class="head"><div><h2>Rental services</h2><p>Book a tractor or equipment for the days you need it. Tell us your dates and we confirm.</p></div></div><div class="grid">${ITEMS.filter(i=>i.cat==='rental').map(card).join('')}</div></div></section>
<section class="alt"><div class="wrap"><h2 style="margin-bottom:30px">Why choose us</h2><div class="why">
<div>${icon('M12 3l8 4v5c0 5-3.500 8-8 9-4.500-1-8-4-8-9V7z')}<h3>Quality materials</h3><p>Checked stock that performs on site.</p></div>
<div>${icon('M12 6v6l4 2M12 3a9 9 0 100 18 9 9 0 000-18z')}<h3>Reliable service</h3><p>We do what we say, when we say.</p></div>
<div>${icon('M6 8h12M6 12h12M9 16c3 0 5-1 6-4')}<h3>Affordable pricing</h3><p>Clear, fair quotes with no surprises.</p></div>
<div>${icon('M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.500 1.500 0 100-3 1.500 1.500 0 000 3zM17 19a1.500 1.500 0 100-3 1.500 1.500 0 000 3z')}<h3>Timely delivery</h3><p>Materials arrive when your crew needs them.</p></div>
<div>${icon('M4 12l5 5L20 6')}<h3>Customer satisfaction</h3><p>We stay in touch until the job is done.</p></div></div></div></section>
<section><div class="wrap"><h2 style="margin-bottom:34px">How it works</h2><div class="steps">
<div class="step"><h3>Choose a product or service</h3><p>Browse materials and rentals.</p></div>
<div class="step"><h3>Submit an enquiry</h3><p>Send your details and quantity or dates.</p></div>
<div class="step"><h3>Confirm your requirements</h3><p>We call or email to agree price and timing.</p></div>
<div class="step"><h3>Get delivery or rental</h3><p>Your order arrives or your machine is ready.</p></div></div></div></section>
<section id="contact" class="alt"><div class="wrap"><h2 style="margin-bottom:30px">Contact us</h2><div class="contact"><div class="info"><p>Send an enquiry for any product or rental. You can also write to us directly.</p><p><a href="mailto:${CONFIG.email}" style="color:var(--orange);font-weight:600">${CONFIG.email}</a></p><div class="map">${CONFIG.mapEmbed?`<iframe src="${CONFIG.mapEmbed}" style="border:0;width:100%;height:100%;min-height:220px" loading="lazy"></iframe>`:'<p>Google Maps location will appear here once the business address is added.</p>'}</div></div><form id="cform" novalidate>${fields(true)}<button class="btn" type="submit">Send enquiry</button><div id="cmsg" role="status"></div></form></div></div></section>`;}

function fields(withSelect,pre){
return `<div class="two"><label>Full name<input name="name" autocomplete="name" required><span class="err"></span></label><label>Phone number<input name="phone" type="tel" autocomplete="tel" required><span class="err"></span></label></div>
<label>Email address<input name="email" type="email" autocomplete="email" required><span class="err"></span></label>
<label>Product or service<select name="item">${ITEMS.map(i=>`<option ${pre===i.id?'selected':''}>${i.name}</option>`).join('')}<option ${pre==='general'?'selected':''}>General enquiry</option></select></label>
<label>Quantity or rental duration<input name="qty" placeholder="e.g. 2000 bricks, or 3 days"></label>
<label>Message<textarea name="msg" rows="3" maxlength="1000"></textarea></label>`;}

function validate(f){let ok=true;const v=n=>f.elements[n].value.trim();
const set=(n,m)=>{f.elements[n].parentElement.querySelector('.err').textContent=m;if(m)ok=false};
set('name',v('name').length<2?'Enter your full name.':'');
set('phone',!/^[+\d][\d\s-]{6,17}$/.test(v('phone'))?'Enter a valid phone number.':'');
set('email',!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))?'Enter a valid email address.':'');
return ok}

function submit(f,msgBox){
if(!validate(f)){msgBox.innerHTML='<div class="err">Please fix the highlighted fields.</div>';return}
const d=Object.fromEntries(new FormData(f)),when=new Date().toLocaleString();
const rec={...d,when};
try{const a=JSON.parse(localStorage.getItem('bw_enquiries')||'[]');a.push(rec);localStorage.setItem('bw_enquiries',JSON.stringify(a))}catch(e){}
const body=`Customer name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nProduct/service: ${d.item}\nQuantity/duration: ${d.qty||'-'}\nMessage: ${d.msg||'-'}\nSubmitted: ${when}`;
msgBox.innerHTML=`<div class="ok">Thanks, ${d.name.split(' ')[0]}. Your email app will open with the enquiry ready to send to ${CONFIG.email}. Press send there to complete it.</div>`;
f.reset();
location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Enquiry: '+d.item)}&body=${encodeURIComponent(body)}`;}

function openEnq(id){
const it=ITEMS.find(i=>i.id===id);
$('#dform').innerHTML=`<h3 style="margin-bottom:6px">${it?(it.cat==='rental'?'Book ':'Enquire about ')+it.name:'Get a quote'}</h3><p style="margin-bottom:16px">Share your details and we will get back to you.</p><form id="mform" novalidate>${fields(true,id)}<button class="btn" type="submit">Send enquiry</button><div id="mmsg" role="status"></div></form>`;
$('#mform').onsubmit=e=>{e.preventDefault();submit(e.target,$('#mmsg'))};
$('#dlg').showModal();}

function drawMaterials(){
const q=($('#q').value||'').toLowerCase(),s=$('#f').value;
const list=ITEMS.filter(i=>i.cat==='material'&&i.name.toLowerCase().includes(q)&&(!s||i.status===s));
$('#mgrid').innerHTML=list.length?list.map(card).join(''):'<div class="empty">No materials match your search. Clear the search or choose another status.</div>';}

function render(){
const h=location.hash.slice(1)||'home';
const known=['home','about','products','services','contact'];
if(!known.includes(h)){$('#app').innerHTML='<section class="nf"><div class="wrap"><h1>404</h1><h2>Page not found</h2><p style="margin:12px 0 24px">That page does not exist or has moved.</p><a class="btn" href="#home">Back to home</a></div></section>';document.title='Page not found – Babuli Works';return}
if(!$('#cform')){$('#app').innerHTML=home();drawMaterials();$('#q').oninput=drawMaterials;$('#f').onchange=drawMaterials;
$('#cform').onsubmit=e=>{e.preventDefault();submit(e.target,$('#cmsg'))};}
document.title='Babuli Works – Construction Materials & Equipment Rental';
if(h!=='home')setTimeout(()=>document.getElementById(h)?.scrollIntoView(),0);else window.scrollTo(0,0);}

document.addEventListener('click',e=>{
const b=e.target.closest('[data-enq]');if(b){openEnq(b.dataset.enq);return}
if(e.target.closest('[data-quote]')){$('#links').classList.remove('open')}
if(e.target.closest('#links a'))$('#links').classList.remove('open');});
$('#burger').onclick=()=>{const o=$('#links').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)};
$('#dx').onclick=()=>$('#dlg').close();
$('#dlg').addEventListener('click',e=>{if(e.target===$('#dlg'))$('#dlg').close()});
$('#wa').onclick=()=>{CONFIG.whatsapp?window.open('https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent('Hello Babuli Works, I have an enquiry.'),'_blank'):openEnq('general')};
$('#yr').textContent=new Date().getFullYear();
addEventListener('hashchange',render);render();
