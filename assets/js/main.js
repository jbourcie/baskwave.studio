(()=>{
  'use strict';
  const cfg=window.BASKWAVE_SITE||{};
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));

  // Le mailto n'est insere dans la page qu'apres une interaction volontaire.
  const parts=cfg.supportMailboxParts;
  const email=Array.isArray(parts)&&parts.length===4&&parts.every(part=>typeof part==='string')
    ?parts[0]+'.'+parts[1]+'@'+parts[2]+'.'+parts[3]:'';
  if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    document.querySelectorAll('[data-support-email]').forEach(el=>{
      const reveal=document.createElement('button');
      reveal.type='button';
      reveal.className='email-reveal';
      reveal.textContent="Afficher l'adresse e-mail";
      reveal.setAttribute('aria-label',"Afficher l'adresse e-mail de Baskwave Studio");
      reveal.addEventListener('click',()=>{
        const link=document.createElement('a');
        link.href='mailto:'+email;
        link.textContent=email;
        link.className='email-address';
        el.replaceChildren(link);
      });
      el.replaceChildren(reveal);
    });
    document.querySelectorAll('[data-support-link]').forEach(el=>{
      el.hidden=false;
      el.addEventListener('click',event=>{
        event.preventDefault();
        const subject=el.getAttribute('data-subject')||'Contact Baskwave Studio';
        window.location.href='mailto:'+email+'?subject='+encodeURIComponent(subject);
      });
    });
    document.querySelectorAll('[data-email-missing]').forEach(el=>el.hidden=true);
  }
  if(typeof cfg.googlePlayUrl==='string' && /^https:\/\/play\.google\.com\/store\/apps\/details\?id=/.test(cfg.googlePlayUrl)){
    document.querySelectorAll('[data-play-link]').forEach(el=>{
      el.href=cfg.googlePlayUrl;
      el.hidden=false;
    });
    document.querySelectorAll('[data-play-pending]').forEach(el=>el.hidden=true);
  }
  document.querySelectorAll('.mobile-links a').forEach(a=>a.addEventListener('click',()=>{
    const menu=document.querySelector('.mobile-menu');if(menu)menu.open=false;
  }));
})();