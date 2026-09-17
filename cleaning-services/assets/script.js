
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("scheduleForm");
  if(form){
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const phone = data.get("phone") || "";
      const service = data.get("service") || "";
      const date = data.get("date") || "";
      const message = data.get("message") || "";
      const text = `Hello Phil Cleaning,%0A%0ABooking Request%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0APreferred date: ${encodeURIComponent(date)}%0ARequirements: ${encodeURIComponent(message)}`;
      window.open(`https://wa.me/971501291386?text=${text}`,"_blank");
      const status = document.getElementById("formStatus");
      if(status) status.innerHTML = '<div class="alert alert-success mt-3 mb-0">Your request has been prepared for WhatsApp. Please send the message to complete your booking.</div>';
      form.reset();
    });
  }



  // Professional mobile navigation
  const mobileQuery = window.matchMedia("(max-width: 991.98px)");
  const servicesWraps = document.querySelectorAll(".nav-services-wrap");
  servicesWraps.forEach((wrap) => {
    const toggle = wrap.querySelector(".services-menu-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", (e) => {
      if (!mobileQuery.matches) return;
      e.preventDefault();
      const open = wrap.classList.toggle("mobile-services-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // Close the mobile menu after selecting a normal navigation link.
  document.querySelectorAll("#mainNav .nav-link:not(.services-menu-toggle), #mainNav .nav-book").forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileQuery.matches) return;
      const collapse = document.getElementById("mainNav");
      if (collapse && collapse.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  // Back to top
  const topBtn = document.getElementById("backToTop");
  if(topBtn){
    const toggle = () => topBtn.classList.toggle("show", window.scrollY > 450);
    window.addEventListener("scroll", toggle, {passive:true});
    toggle();
    topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  }

  document.querySelectorAll("[data-year]").forEach(el=>el.textContent = new Date().getFullYear());
});

// Premium page preloader / transition
(function(){
  const preloader = document.getElementById('philPreloader');
  if(!preloader) return;
  let hidden = false;
  const hide = () => {
    if(hidden) return;
    hidden = true;
    preloader.classList.add('is-hidden');
    window.setTimeout(() => preloader.remove(), 600);
  };
  const minVisible = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 650;
  const started = performance.now();
  const hideWhenReady = () => {
    const wait = Math.max(0, minVisible - (performance.now() - started));
    window.setTimeout(hide, wait);
  };
  if(document.readyState === 'complete') hideWhenReady();
  else window.addEventListener('load', hideWhenReady, {once:true});

  // Smooth preloader on internal page navigation.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if(!link || hidden) return;
    if(link.target === '_blank' || link.hasAttribute('download') || link.dataset.bsToggle || link.getAttribute('href') === '#' || link.classList.contains('services-menu-toggle')) return;
    const raw = link.getAttribute('href');
    if(!raw || /^(https?:|mailto:|tel:|javascript:)/i.test(raw)) return;
    let url;
    try { url = new URL(raw, window.location.href); } catch { return; }
    if(url.origin !== window.location.origin || url.href === window.location.href) return;
    e.preventDefault();
    preloader.classList.remove('is-hidden');
    hidden = false;
    window.setTimeout(() => { window.location.href = url.href; }, 180);
  });
})();
