import { useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Truck, X } from 'lucide-react';
import { categories, products, formatINR } from './data.js';

const initialCart = [];

export default function App() {
  const [category, setCategory] = useState('All products');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [cart, setCart] = useState(initialCart);
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [notice, setNotice] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [delivery, setDelivery] = useState('home');
  const [postcode, setPostcode] = useState('');
  const [postcodeChecked, setPostcodeChecked] = useState(false);
  const [form, setForm] = useState({name:'', email:'', phone:'', address:''});
  const [order, setOrder] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);

  const cartCount = cart.reduce((n, item) => n + item.quantity, 0);
  const subtotal = cart.reduce((n, item) => n + item.product.price * item.quantity, 0);
  const deliveryFee = delivery === 'home' && subtotal > 0 ? (subtotal >= 5000 ? 199 : 99) : 0;
  const total = subtotal + deliveryFee;
  const shownProducts = useMemo(() => {
    let list = products.filter(p => (category === 'All products' || p.category === category)
      && (p.name + ' ' + p.category + ' ' + p.description).toLowerCase().includes(search.toLowerCase())
      && p.price <= maxPrice);
    if (sort === 'low') list = [...list].sort((a,b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [category, search, sort, maxPrice]);

  const flash = (text) => { setNotice(text); window.setTimeout(() => setNotice(''), 2400); };
  const goHome = () => { setPage('home'); setCategory('All products'); setSearch(''); window.scrollTo({top:0,behavior:'smooth'}); };
  const openProduct = (product) => { setSelectedProduct(product); setPage('product'); window.scrollTo({top:0,behavior:'smooth'}); };
  const addToCart = (product, variant) => {
    const key = product.id + ':' + (variant || product.variants[0]);
    setCart(current => {
      const existing = current.find(item => item.key === key);
      return existing ? current.map(item => item.key === key ? {...item, quantity:item.quantity+1} : item)
        : [...current, {key, product, variant:variant || product.variants[0], quantity:1}];
    });
    flash('Added to your bag');
  };
  const changeQuantity = (key, delta) => setCart(current => current.map(item => item.key === key ? {...item, quantity:item.quantity+delta} : item).filter(item => item.quantity > 0));
  const setFormValue = (key, value) => setForm(current => ({...current, [key]:value}));
  const checkPostcode = () => {
    if (!/^\\d{6}$/.test(postcode)) { setPostcodeChecked(false); flash('Enter a valid 6-digit demo PIN code'); return; }
    setPostcodeChecked(true);
  };
  const placeDemoOrder = (event) => {
    event.preventDefault();
    const reference = 'HH' + Math.floor(100000 + Math.random() * 900000);
    setOrder({reference, name:form.name, delivery, total, items:cart, postcode});
    setCart([]);
    setPage('confirmation');
    window.scrollTo({top:0,behavior:'smooth'});
  };

  return <div className="app-shell">
    <div className="announcement">Thoughtful pieces for a home that feels like you <span>·</span> Free delivery demo on orders above ₹5,000</div>
    <header className="site-header">
      <button className="icon-button mobile-menu-button" aria-label="Open navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
      <button className="brand" onClick={goHome} aria-label="Haven and Hearth home"><span className="brand-mark">h<span>·</span>h</span><span className="brand-name">haven <i>&</i> hearth</span></button>
      <nav className={mobileMenu ? 'main-nav is-open' : 'main-nav'}>
        {categories.slice(1).map(cat => <button key={cat} className={category === cat ? 'nav-link active' : 'nav-link'} onClick={() => {setCategory(cat);setPage('shop');setMobileMenu(false);window.scrollTo({top:0,behavior:'smooth'});}}>{cat}</button>)}
        <button className="nav-link" onClick={() => {setPage('shop');setCategory('All products');setMobileMenu(false);}}>Shop all</button>
      </nav>
      <div className="header-actions">
        <label className="header-search"><Search size={17}/><input aria-label="Search products" placeholder="Search pieces..." value={search} onFocus={() => {if(page==='home')setPage('shop');}} onChange={e => {setSearch(e.target.value);if(page==='home')setPage('shop');}}/><kbd>/</kbd></label>
        <button className="icon-button saved-button" aria-label="Wishlist demo" onClick={() => flash('Wishlist is not included in this MVP')}><Heart/></button>
        <button className="bag-button" onClick={() => setPage('cart')} aria-label={'Shopping bag, '+cartCount+' items'}><ShoppingBag size={19}/><span className="bag-label">Bag</span><span className="bag-count">{cartCount}</span></button>
      </div>
    </header>

    {notice && <div className="toast" role="status"><Check size={16}/>{notice}</div>}

    {page === 'home' && <main>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">THE EVERYDAY COLLECTION · 2026</p><h1>Make room for<br/><em>the good things.</em></h1><p className="hero-description">Comfortable corners, considered details, and pieces that make a house feel like your own.</p><button className="button button-dark" onClick={() => {setPage('shop');setCategory('All products');}}>Explore the collection <ArrowRight size={17}/></button><div className="hero-footnote"><span className="small-dot"/> New season, softer living</div></div>
        <div className="hero-art"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90" alt="Warm neutral living room with natural textures"/><div className="image-note"><span>01 / LIVING COLLECTION</span><strong>Quietly considered.</strong></div><div className="round-stamp">made for<br/>real living <span>✳</span></div></div>
      </section>
      <section className="category-section section-wrap"><div className="section-heading"><div><p className="eyebrow">FIND YOUR FEELING</p><h2>Shop by space</h2></div><button className="text-link" onClick={() => {setPage('shop');setCategory('All products');}}>View everything <ArrowRight size={16}/></button></div>
        <div className="category-grid">{[
          {name:'Living room',image:'photo-1600210492486-724fe5c67fb0',sub:'Slow down, settle in'},
          {name:'Bedroom',image:'photo-1631049307264-da0ec9d70304',sub:'Your softer side'},
          {name:'Storage',image:'photo-1593085260707-5377ba37f868',sub:'A place for everything'},
          {name:'Lighting',image:'photo-1507473885765-e6ed057f782c',sub:'Set the right mood'}
        ].map(c => <button className="category-tile" key={c.name} onClick={() => {setCategory(c.name);setPage('shop');window.scrollTo({top:0,behavior:'smooth'});}}><img src={'https://images.unsplash.com/'+c.image+'?auto=format&fit=crop&w=800&q=85'} alt=""/><span className="tile-arrow"><ArrowUpRightFallback/></span><span className="tile-caption"><strong>{c.name}</strong><small>{c.sub}</small></span></button>)}</div>
      </section>
      <section className="editorial section-wrap"><div className="editorial-image"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85" alt="Thoughtfully styled home interior"/></div><div className="editorial-copy"><p className="eyebrow">LESS, BUT LOVELIER</p><h2>A little more<br/><em>you, at home.</em></h2><p>Start with one useful piece. Add something with texture. Leave a little space for life to happen.</p><button className="button button-outline" onClick={() => {setPage('shop');setCategory('All products');}}>Find your next favourite <ArrowRight size={17}/></button><span className="editorial-number">H&H / HOME NOTES 001</span></div></section>
      <section className="featured section-wrap"><div className="section-heading"><div><p className="eyebrow">GOOD THINGS, WELL MADE</p><h2>Pieces to live with</h2></div><button className="text-link" onClick={() => {setPage('shop');setCategory('All products');}}>Shop all pieces <ArrowRight size={16}/></button></div><ProductGrid products={products.slice(0,4)} onOpen={openProduct} onAdd={addToCart}/></section>
      <section className="promise-strip"><div><Truck/><strong>Considered delivery</strong><span>Clear demo options at checkout</span></div><div><Heart/><strong>Made for everyday</strong><span>Practical pieces, softer living</span></div><div><Check/><strong>Easy to explore</strong><span>Browse, compare, make it yours</span></div></section>
    </main>}

    {page === 'shop' && <main className="page-wrap">
      <div className="breadcrumbs"><button onClick={goHome}>Home</button><span>/</span><span>{category}</span></div>
      <div className="listing-heading"><div><p className="eyebrow">THE HAVEN & HEARTH EDIT</p><h1>{category === 'All products' ? 'Find your kind of home.' : category + ', thoughtfully.'}</h1><p>Useful pieces, natural textures and details that feel just right.</p></div><span className="result-count">{shownProducts.length} pieces</span></div>
      <div className="listing-tools"><button className="filter-button" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16}/> Filter & sort <ChevronDown size={15}/></button><div className="category-pills">{categories.map(cat => <button key={cat} className={category===cat?'pill active':'pill'} onClick={() => setCategory(cat)}>{cat}</button>)}</div><label className="sort-select">Sort by <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
      {filtersOpen && <div className="filter-panel"><label>Maximum price <strong>{formatINR(maxPrice)}</strong><input type="range" min="500" max="15000" step="500" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/></label><button className="text-link" onClick={() => {setMaxPrice(15000);setCategory('All products');setSearch('');}}>Clear filters</button></div>}
      {shownProducts.length ? <ProductGrid products={shownProducts} onOpen={openProduct} onAdd={addToCart}/> : <div className="empty-state"><span className="empty-icon"><Search/></span><h2>No pieces found</h2><p>Try another search or clear your filters.</p><button className="button button-dark" onClick={() => {setSearch('');setMaxPrice(15000);setCategory('All products');}}>Clear search</button></div>}
    </main>}

    {page === 'product' && <main className="page-wrap product-page">
      <div className="breadcrumbs"><button onClick={goHome}>Home</button><span>/</span><button onClick={() => {setPage('shop');setCategory(selectedProduct.category);}}>{selectedProduct.category}</button><span>/</span><span>{selectedProduct.name}</span></div>
      <div className="product-layout"><div className="product-main-image"><img src={selectedProduct.image} alt={selectedProduct.name}/><span className="image-chip">THE EVERYDAY COLLECTION</span></div><div className="product-information"><p className="eyebrow">{selectedProduct.category.toUpperCase()} / H&H EDIT</p><h1>{selectedProduct.name}</h1><p className="product-description">{selectedProduct.description}</p><div className="product-price">{formatINR(selectedProduct.price)} <span>Inclusive of all taxes</span></div><div className="detail-rule"/><p className="field-label">Colour / finish</p><div className="variant-list">{selectedProduct.variants.map((v,i)=><button key={v} className={(selectedVariant[selectedProduct.id]||selectedProduct.variants[0])===v?'variant active':'variant'} onClick={()=>setSelectedVariant(s=>({...s,[selectedProduct.id]:v}))}><span className={'variant-swatch swatch-'+i}/>{v}</button>)}</div><div className="detail-rule"/><div className="spec-row"><span>Dimensions</span><strong>{selectedProduct.dimensions}</strong></div><div className="spec-row"><span>Materials</span><strong>{selectedProduct.material}</strong></div><div className="availability-note"><span className="small-dot"/> Demo catalogue item · no live inventory</div><button className="button button-dark add-large" onClick={()=>addToCart(selectedProduct,selectedVariant[selectedProduct.id])}>Add to bag <span>{formatINR(selectedProduct.price)}</span><ShoppingBag size={18}/></button><p className="demo-disclaimer">This is an independent demo store. Prices and fulfilment options are sample data, not IKEA prices or availability.</p></div></div>
      <section className="related section-wrap"><div className="section-heading"><div><p className="eyebrow">MAKE YOURSELF AT HOME</p><h2>You might also like</h2></div><button className="text-link" onClick={()=>{setPage('shop');setCategory('All products');}}>Browse all <ArrowRight size={16}/></button></div><ProductGrid products={products.filter(p=>p.id!==selectedProduct.id).slice(0,4)} onOpen={openProduct} onAdd={addToCart}/></section>
    </main>}

    {page === 'cart' && <main className="page-wrap cart-page">
      <div className="breadcrumbs"><button onClick={goHome}>Home</button><span>/</span><span>Your bag</span></div><p className="eyebrow">YOUR LITTLE CORNER OF THE WORLD</p><h1>Your bag <span className="cart-title-count">({cartCount} items)</span></h1>
      {!cart.length ? <div className="empty-state cart-empty"><span className="empty-icon"><ShoppingBag/></span><h2>Your bag is taking a breather.</h2><p>Find something useful, beautiful, or a little bit of both.</p><button className="button button-dark" onClick={()=>{setPage('shop');setCategory('All products');}}>Explore the collection <ArrowRight size={17}/></button></div> :
      <div className="cart-layout"><div className="cart-items">{cart.map(item=><div className="cart-line" key={item.key}><button className="cart-image" onClick={()=>openProduct(item.product)}><img src={item.product.image} alt={item.product.name}/></button><div className="cart-line-info"><button className="cart-product-name" onClick={()=>openProduct(item.product)}>{item.product.name}</button><span>{item.variant} · {item.product.category}</span><span className="cart-unit-price">{formatINR(item.product.price)}</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={()=>changeQuantity(item.key,-1)}><Minus size={14}/></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={()=>changeQuantity(item.key,1)}><Plus size={14}/></button></div></div><div className="cart-line-end"><strong>{formatINR(item.product.price*item.quantity)}</strong><button className="remove-button" onClick={()=>changeQuantity(item.key,-item.quantity)}>Remove</button></div></div>)}</div><aside className="order-summary"><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div><div className="summary-row"><span>Demo delivery</span><span>{deliveryFee ? formatINR(deliveryFee) : 'Calculated next'}</span></div><div className="summary-row summary-total"><strong>Total</strong><strong>{formatINR(total)}</strong></div><p className="summary-note">Delivery is estimated demo pricing and is confirmed on the next step.</p><button className="button button-dark checkout-button" onClick={()=>{setPage('checkout');setCheckoutStep(1);window.scrollTo({top:0,behavior:'smooth'});}}>Continue to checkout <ArrowRight size={17}/></button><button className="continue-shopping" onClick={()=>setPage('shop')}><ArrowLeft size={15}/> Continue shopping</button><div className="safe-note"><Check size={15}/> Simulated checkout · no payment collected</div></aside></div>}
    </main>}

    {page === 'checkout' && <main className="page-wrap checkout-page"><div className="breadcrumbs"><button onClick={goHome}>Home</button><span>/</span><button onClick={()=>setPage('cart')}>Your bag</button><span>/</span><span>Checkout demo</span></div><p className="eyebrow">A FEW LITTLE DETAILS</p><h1>Let's make it yours.</h1><div className="checkout-steps"><span className={checkoutStep>=1?'current':''}>01 <b>Delivery</b></span><i/><span className={checkoutStep>=2?'current':''}>02 <b>Your details</b></span><i/><span className={checkoutStep>=3?'current':''}>03 <b>Review</b></span></div>
      <div className="checkout-layout"><div className="checkout-main">
        {checkoutStep===1 && <section className="checkout-card"><h2>How would you like to receive it?</h2><p className="muted">These are demo options, not live service availability.</p><div className="delivery-options"><button className={delivery==='home'?'delivery-option selected':'delivery-option'} onClick={()=>setDelivery('home')}><Truck/><span><strong>Home delivery</strong><small>Demo fee based on cart value</small></span><span className="radio-dot"/></button><button className={delivery==='pickup'?'delivery-option selected':'delivery-option'} onClick={()=>setDelivery('pickup')}><ShoppingBag/><span><strong>Click & Collect</strong><small>Choose a demo collection point</small></span><span className="radio-dot"/></button></div><label className="form-label">PIN code <span>6 digits</span><input inputMode="numeric" maxLength="6" value={postcode} onChange={e=>{setPostcode(e.target.value.replace(/\\D/g,'').slice(0,6));setPostcodeChecked(false);}} placeholder="e.g. 500001"/></label><button className="button button-outline postcode-check" onClick={checkPostcode}>Check demo options</button>{postcodeChecked && <div className="postcode-result"><Check size={17}/><div><strong>Demo options available</strong><span>PIN {postcode} is accepted for this prototype. This does not confirm actual delivery coverage.</span></div></div>}{delivery==='pickup' && <label className="form-label">Collection point<select className="form-input" defaultValue="studio"><option value="studio">Haven & Hearth Studio · Demo location</option><option value="city">City collection point · Demo location</option></select></label>}<button className="button button-dark full-button" onClick={()=>{if(!postcodeChecked){flash('Check the demo PIN code to continue');return;}setCheckoutStep(2);window.scrollTo({top:0,behavior:'smooth'});}}>Continue to details <ArrowRight size={17}/></button></section>}
        {checkoutStep===2 && <form className="checkout-card" onSubmit={e=>{e.preventDefault();setCheckoutStep(3);window.scrollTo({top:0,behavior:'smooth'});}}><button type="button" className="back-link" onClick={()=>setCheckoutStep(1)}><ArrowLeft size={15}/> Back to delivery</button><h2>Your details</h2><p className="muted">Use fictional details while testing this demo.</p><label className="form-label">Full name<input required value={form.name} onChange={e=>setFormValue('name',e.target.value)} placeholder="Your name"/></label><div className="form-two"><label className="form-label">Email address<input required type="email" value={form.email} onChange={e=>setFormValue('email',e.target.value)} placeholder="you@example.com"/></label><label className="form-label">Phone number<input required type="tel" pattern="[0-9 +()-]{8,15}" value={form.phone} onChange={e=>setFormValue('phone',e.target.value)} placeholder="Phone number"/></label></div>{delivery==='home' && <label className="form-label">Delivery address<textarea required rows="3" value={form.address} onChange={e=>setFormValue('address',e.target.value)} placeholder="Demo address"/></label>}<div className="demo-alert"><Check size={16}/> No information is sent to a server. This demo runs in your browser.</div><button className="button button-dark full-button" type="submit">Review your order <ArrowRight size={17}/></button></form>}
        {checkoutStep===3 && <section className="checkout-card"><button className="back-link" onClick={()=>setCheckoutStep(2)}><ArrowLeft size={15}/> Back to details</button><h2>One last look.</h2><p className="muted">Check your demo order before creating a confirmation.</p><div className="review-items">{cart.map(item=><div className="review-item" key={item.key}><img src={item.product.image} alt=""/><div><strong>{item.product.name}</strong><span>{item.variant} · Qty {item.quantity}</span></div><b>{formatINR(item.product.price*item.quantity)}</b></div>)}</div><div className="review-delivery"><span>{delivery==='home'?'Home delivery':'Click & Collect'}</span><strong>{delivery==='home'?'Demo PIN '+postcode:'Demo collection point'}</strong></div><div className="demo-alert"><Check size={16}/> Demo payment only. No payment details are requested or collected.</div><button className="button button-dark full-button" onClick={placeDemoOrder}>Place demo order · {formatINR(total)} <ArrowRight size={17}/></button></section>}
      </div><aside className="order-summary checkout-summary"><h2>In your bag <span>({cartCount})</span></h2>{cart.map(item=><div className="mini-order-item" key={item.key}><img src={item.product.image} alt=""/><div><strong>{item.product.name}</strong><span>{item.variant} · Qty {item.quantity}</span></div><b>{formatINR(item.product.price*item.quantity)}</b></div>)}<div className="summary-row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div><div className="summary-row"><span>{delivery==='home'?'Demo delivery':'Collection'}</span><span>{delivery==='home'?formatINR(deliveryFee):'Free demo'}</span></div><div className="summary-row summary-total"><strong>Total</strong><strong>{formatINR(total)}</strong></div><p className="summary-note">All products, fees and fulfilment are sample data for demonstration.</p></aside></div>
    </main>}

    {page === 'confirmation' && order && <main className="page-wrap confirmation-page"><div className="confirmation-mark"><Check size={34}/></div><p className="eyebrow">ORDER PLACED · DEMO ONLY</p><h1>Thank you, {order.name.split(' ')[0]}.</h1><p className="confirmation-lede">Your little home refresh is on its way — in this prototype, at least.</p><div className="confirmation-card"><div className="confirmation-top"><span>DEMO ORDER REFERENCE</span><strong>{order.reference}</strong></div><div className="confirmation-top"><span>FULFILMENT</span><strong>{order.delivery==='home'?'Home delivery':'Click & Collect'}</strong></div><div className="confirmation-top"><span>DEMO TOTAL</span><strong>{formatINR(order.total)}</strong></div><div className="review-items">{order.items.map(item=><div className="review-item" key={item.key}><img src={item.product.image} alt=""/><div><strong>{item.product.name}</strong><span>{item.variant} · Qty {item.quantity}</span></div><b>{formatINR(item.product.price*item.quantity)}</b></div>)}</div><p className="demo-alert"><Check size={16}/> This is a simulated order. No payment was taken and no order was sent to a fulfilment service.</p></div><button className="button button-dark" onClick={goHome}>Back to home <ArrowRight size={17}/></button></main>}

    <footer className="site-footer"><div className="footer-top"><div><button className="brand footer-brand" onClick={goHome}><span className="brand-mark">h<span>·</span>h</span><span className="brand-name">haven <i>&</i> hearth</span></button><p>Thoughtful pieces for everyday living.</p></div><div className="footer-links"><span>EXPLORE</span><button onClick={()=>{setPage('shop');setCategory('All products');}}>All products</button><button onClick={()=>flash('Room notes are coming soon')}>Room notes</button><button onClick={()=>flash('Support pages are outside this MVP')}>Help & support</button></div><div className="footer-note"><span>THE SMALL PRINT</span><p>An independent storefront prototype. Not affiliated with IKEA. Product names, prices and delivery options are illustrative demo data.</p></div></div><div className="footer-bottom"><span>© 2026 Haven & Hearth · Prototype</span><span>Made for real living, not real transactions.</span></div></footer>
  </div>;
}

function ProductGrid({products:items,onOpen,onAdd}) {
  return <div className="product-grid">{items.map((p,i)=><article className="product-card" key={p.id}><div className="product-card-image"><button className="product-image-button" onClick={()=>onOpen(p)} aria-label={'View '+p.name}><img src={p.image} alt={p.name} loading={i>2?'lazy':'eager'}/></button><span className="product-tag">{p.tag}</span><button className="quick-add" aria-label={'Add '+p.name+' to bag'} onClick={()=>onAdd(p,p.variants[0])}><Plus size={19}/></button></div><button className="product-card-title" onClick={()=>onOpen(p)}>{p.name}</button><span className="product-category">{p.category} · {p.material.split(' · ')[0]}</span><div className="product-card-bottom"><strong>{formatINR(p.price)}</strong><button className="small-add" onClick={()=>onAdd(p,p.variants[0])}>Add <Plus size={14}/></button></div></article>)}</div>;
}
function ArrowUpRightFallback(){return <ArrowRight size={17}/>;}
