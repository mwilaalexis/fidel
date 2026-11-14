// À personnaliser : numéro WhatsApp au format international, sans + ni espaces (ex. 375291234567)
var WA_NUMBER = "+375256549751";
(function(){
  var nav=document.getElementById('nav'),mb=document.getElementById('mb');
  mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');mb.setAttribute('aria-expanded','false');}});
  document.getElementById('yr').textContent=new Date().getFullYear();
  var sel=document.getElementById('o');
  document.querySelectorAll('.pick').forEach(function(a){a.addEventListener('click',function(){sel.selectedIndex=parseInt(a.getAttribute('data-o'),10);});});
  document.getElementById('go').addEventListener('click',function(){
    var st=document.getElementById('st'),n=document.getElementById('n').value.trim(),f=document.getElementById('f').value.trim();
    if(!n||!f){st.textContent='Merci d’indiquer votre nom et la filière souhaitée.';return;}
    var l=document.getElementById('l').value,o=sel.value;
    var msg='Bonjour, je m’appelle '+n+'. Niveau actuel : '+l+'. Filière souhaitée : '+f+'. Offre : '+o+'. Je souhaite étudier en Biélorussie.';
    if(!WA_NUMBER){st.textContent='Numéro WhatsApp non configuré : renseignez WA_NUMBER dans le code.';return;}
    st.textContent='Ouverture de WhatsApp…';
    window.open('https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(msg),'_blank','noopener');
  });
})();
