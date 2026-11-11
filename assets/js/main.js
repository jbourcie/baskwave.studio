(()=>{
  'use strict';
  const cfg=window.BASKWAVE_SITE||{};
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
  if(typeof cfg.supportEmail==='string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.supportEmail)){
    document.querySelectorAll('[data-support-email]').forEach(el=>el.textContent=cfg.supportEmail);
    document.querySelectorAll('[data-support-link]').forEach(el=>{
      const subject=el.getAttribute('data-subject')||'Assistance ZIGSPIRE';
      el.setAttribute('href','mailto:'+cfg.supportEmail+'?subject='+encodeURIComponent(subject));
      el.hidden=false;
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