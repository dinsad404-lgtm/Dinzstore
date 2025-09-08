/* Render katalog dari PRODUCTS di products.js */
const WA = '6283895704563';
const listEl = document.getElementById('produk-list');
const searchEl = document.getElementById('search');
const refreshBtn = document.getElementById('refresh');

function formatIDR(n){try{return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);}catch(e){return 'Rp '+(n||0).toLocaleString('id-ID');}}

function render(items){
  listEl.innerHTML = '';
  items.forEach((it,idx)=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${it.name}</h3>
      ${it.desc?`<p>${it.desc}</p>`:''}
      <div class="price">${formatIDR(it.price)}</div>
      <div class="cta">
        <a class="btn btn-wa" target="_blank" href="https://wa.me/${WA}?text=${encodeURIComponent(`Halo DinzStore, saya ingin beli: ${it.name} - ${formatIDR(it.price)} (kode: ${it.code||idx+1})`)}">Order via WA</a>
        ${it.link?`<a class="btn" target="_blank" href="${it.link}">Detail</a>`:''}
      </div>
    `;
    listEl.appendChild(card);
  });
}

function doSearch(){
  const q = (searchEl.value||'').toLowerCase();
  const filtered = PRODUCTS.filter(it => it.name.toLowerCase().includes(q) || (it.desc||'').toLowerCase().includes(q));
  render(filtered);
}

searchEl.addEventListener('input', doSearch);
refreshBtn.addEventListener('click', ()=>render(PRODUCTS));
render(PRODUCTS);
