// À personnaliser : numéro WhatsApp au format international, sans + ni espaces (ex. 375291234567)
var WA_NUMBER = "375256549751";
(function(){
  window.__rv=1;
  var $=function(i){return document.getElementById(i);};
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,offer='';
  var nav=$('nav'),mb=$('mb');
  function closeNav(){nav.classList.remove('open');mb.setAttribute('aria-expanded','false');}
  mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A')closeNav();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){closeNav();mb.focus();}});
  $('yr').textContent=new Date().getFullYear();

  function link(msg){return WA_NUMBER?'https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(msg):'#contact';}
  document.querySelectorAll('.wa').forEach(function(a){
    a.setAttribute('href',link('Bonjour, je souhaite étudier en Biélorussie.'));
    if(WA_NUMBER){a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer');}
  });
  document.querySelectorAll('.pick').forEach(function(b){b.addEventListener('click',function(){
    offer=b.getAttribute('data-o');
    var n=$('of');n.textContent='Offre choisie : '+offer;n.hidden=false;
    $('contact').scrollIntoView({behavior:rm?'auto':'smooth'});
  });});
  $('go').addEventListener('click',function(){
    var st=$('st'),ids=['n','p','f'],bad=false;
    ids.forEach(function(i){var el=$(i),empty=!el.value.trim();el.setAttribute('aria-invalid',empty?'true':'false');if(empty)bad=true;});
    if(bad){st.textContent='Renseignez votre nom, votre pays et la filière souhaitée.';$(ids.filter(function(i){return !$(i).value.trim();})[0]).focus();return;}
    if(!WA_NUMBER){st.textContent='Le contact WhatsApp n’est pas encore disponible. Réessayez plus tard.';return;}
    var msg='Bonjour, je m’appelle '+$('n').value.trim()+' et j’habite en '+$('p').value.trim()+'. Niveau actuel : '+$('l').value+'. Filière souhaitée : '+$('f').value.trim()+'.'+(offer?' Offre : '+offer+'.':'')+' Je souhaite étudier en Biélorussie.';
    var url=link(msg);
    st.textContent='Ouverture de WhatsApp… ';
    var w=null;
    try{w=window.open(url,'_blank');if(w)w.opener=null;}catch(x){}
    if(!w){try{window.location.href=url;}catch(x){}}
    var fb=document.createElement('a');
    fb.href=url;fb.target='_blank';fb.rel='noopener noreferrer';
    fb.textContent='Si rien ne s’ouvre, cliquez ici.';
    st.appendChild(fb);
  });

  /* Animations */
  var els=document.querySelectorAll('.t,.st,.faq details');
  function count(e){
    var s=e.querySelector('.num[data-n]');if(!s||rm)return;
    var n=+s.getAttribute('data-n'),t0=null;
    (function f(t){t0=t0||t;var p=Math.min((t-t0)/1300,1);s.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f);})(performance.now());
  }
  function show(e){e.classList.add('shown');count(e);setTimeout(function(){e.style.transitionDelay='';},1500);}
  els.forEach(function(e){
    e.classList.add('rv');
    var i=Array.prototype.indexOf.call(e.parentNode.children,e);
    e.style.transitionDelay=Math.min(i,6)*90+'ms';
  });
  if(rm||!('IntersectionObserver' in window)){els.forEach(show);}
  else{
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){show(x.target);io.unobserve(x.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  }

  /* Barre WhatsApp : apparaît après l'arrivée, se cache sur le formulaire */
  var dock=$('dock'),inContact=false;
  function upd(){dock.classList.toggle('show',!inContact&&started);}
  var started=false;setTimeout(function(){started=true;upd();},rm?0:1400);
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(en){inContact=en[0].isIntersecting;upd();},{threshold:.15}).observe($('contact'));
  }

  /* Points du carrousel des offres */
  var of=$('offers'),dots=document.querySelectorAll('.dots span');
  of.addEventListener('scroll',function(){
    var w=of.scrollWidth-of.clientWidth,i=w?Math.round(of.scrollLeft/w*(dots.length-1)):0;
    dots.forEach(function(d,k){d.classList.toggle('on',k===i);});
  },{passive:true});
})();
