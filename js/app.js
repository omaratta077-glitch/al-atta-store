const imageBase='https://raw.githubusercontent.com/Marwan1011994/project-js-4/main/';
const products=[
{id:1,name:'ساعة ذهبية',category:'Watches',price:400,image:'imgs/accessories/2809f6567a8309c00022f8e273d8715c.jpg'},
{id:2,name:'قلادة فضية',category:'Necklace',price:150,image:'imgs/accessories/686d4a051c21359b7577ee191b02fb70.jpg'},
{id:3,name:'أقراط ذهبية',category:'Earrings',price:200,image:'imgs/accessories/6f5d807b3ac44d8f5fdf2d94f7929177.jpg'},
{id:4,name:'ساعة سوداء',category:'Watches',price:350,image:'imgs/accessories/a959c27ca359e1fc2c5453411253d1ad.jpg'},
{id:5,name:'خواتم فضية',category:'Rings',price:580,image:'imgs/accessories/dd94301efd4caef4e84229be9a74bf90.jpg'},
{id:6,name:'قلادة أنيقة',category:'Necklace',price:150,image:'imgs/accessories/3ca518ac387b3e07aaf503b2c1399707.jpg'},
{id:7,name:'سوار أسود',category:'Bracelet',price:100,image:'imgs/accessories/ef169eeb1097eaa0cd21f0311524820e.jpg'},
{id:8,name:'طقم قلادة',category:'Necklace',price:500,image:'imgs/accessories/9f5a4002bc9bdda21f05e47dc80a38df.jpg'},
{id:9,name:'طقم أساور ذهبي',category:'Bracelet',price:300,image:'imgs/accessories/2a384379039c5e05bd5905edc657e93c.jpg'}];
const read=(key,fallback=[])=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
let cart=read('atta_cart'),favorites=read('atta_favorites');
const row=document.getElementById('productsRow');
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){if(!row)return;const q=(document.getElementById('searchBox')?.value||'').trim().toLowerCase(),cat=document.getElementById('categoryFilter')?.value||'all';const list=products.filter(p=>(cat==='all'||p.category===cat)&&(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));document.getElementById('resultCount').textContent=list.length+' منتجات';row.innerHTML=list.length?list.map(p=>`<article class="product"><img loading="lazy" src="${imageBase+p.image}" alt="${safe(p.name)}"><div class="product-info"><h3>${safe(p.name)}</h3><span class="category">${safe(p.category)}</span><div class="product-bottom"><span class="price">$ ${p.price}</span><div class="actions"><button class="icon-btn ${favorites.includes(p.id)?'active':''}" aria-label="المفضلة" onclick="toggleFavorite(${p.id})"><i class="fas fa-heart"></i></button><button class="add-btn" onclick="addCart(${p.id})">أضف للسلة</button></div></div></div></article>`).join(''):'<p class="empty">لا توجد منتجات مطابقة للبحث.</p>';updateCart();}
function persist(){localStorage.setItem('atta_cart',JSON.stringify(cart));localStorage.setItem('atta_favorites',JSON.stringify(favorites));updateCart();}
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];persist();render();}
function addCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});persist();openDrawer();}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<1)cart=cart.filter(x=>x.id!==id);persist();renderCart();}
function updateCart(){const count=cart.reduce((n,x)=>n+x.qty,0),el=document.getElementById('cartCount');if(el)el.textContent=count;}
function renderCart(){const box=document.getElementById('cartItems');if(!box)return;let total=0;box.innerHTML=cart.length?cart.map(c=>{const p=products.find(x=>x.id===c.id);if(!p)return'';total+=p.price*c.qty;return `<div class="cart-line"><img src="${imageBase+p.image}" alt=""><div><h4>${safe(p.name)}</h4><span class="price">$ ${p.price*c.qty}</span><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${c.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div></div>`}).join(''):'<div class="empty">سلتك فارغة حاليًا</div>';document.getElementById('totalPrice').textContent='$'+total;}
function openDrawer(){document.getElementById('cartDrawer')?.classList.add('open');document.getElementById('overlay')?.classList.add('show');renderCart();}
function closeDrawer(){document.getElementById('cartDrawer')?.classList.remove('open');document.getElementById('overlay')?.classList.remove('show');}
document.getElementById('searchBox')?.addEventListener('input',render);document.getElementById('categoryFilter')?.addEventListener('change',render);document.getElementById('openCart')?.addEventListener('click',openDrawer);document.getElementById('closeCart')?.addEventListener('click',closeDrawer);document.getElementById('overlay')?.addEventListener('click',closeDrawer);document.getElementById('year')&&(document.getElementById('year').textContent=new Date().getFullYear());
const user=read('atta_demo_user',null);if(user&&document.getElementById('accountLink'))document.getElementById('accountLink').textContent='مرحبًا '+user.name;
render();
