/* =============================================
   app.js — NEXO Store
   ============================================= */

// ── DADOS DOS PRODUTOS ───────────────────────
const produtos = [
  // Eletrônicos
  { id: 1, nome: "Fone Bluetooth Pro", cat: "eletronicos", emoji: "🎧", preco: 349.90, estrelas: 5, badge: "Novo", desc: "Som imersivo com cancelamento de ruído ativo, bateria de 30h e conforto premium para uso prolongado." },
  { id: 2, nome: "Smartwatch Series X", cat: "eletronicos", emoji: "⌚", preco: 799.00, estrelas: 4, badge: null, desc: "Monitore sua saúde, receba notificações e controle sua música. Resistente à água até 50m." },
  { id: 3, nome: "Teclado Mecânico RGB", cat: "eletronicos", emoji: "⌨️", preco: 289.90, estrelas: 5, badge: "Popular", desc: "Switches tácteis de alta durabilidade, retroiluminação RGB por tecla e design compacto TKL." },
  { id: 4, nome: "Mouse Gamer 16000 DPI", cat: "eletronicos", emoji: "🖱️", preco: 199.00, estrelas: 4, badge: null, desc: "Sensor óptico de precisão, 8 botões programáveis e memória interna para perfis." },
  { id: 5, nome: "SSD Portátil 1TB", cat: "eletronicos", emoji: "💾", preco: 459.00, estrelas: 5, badge: "Oferta", desc: "Velocidade de leitura 1050 MB/s, carcaça em alumínio resistente a quedas e choques." },
  { id: 6, nome: "Câmera de Segurança 4K", cat: "eletronicos", emoji: "📷", preco: 329.00, estrelas: 4, badge: null, desc: "Resolução 4K, visão noturna colorida, IA para detecção de movimento e armazenamento em nuvem." },

  // Moda
  { id: 7, nome: "Tênis Urban Runner", cat: "moda", emoji: "👟", preco: 389.90, estrelas: 5, badge: "Novo", desc: "Solado em borracha EVA ultraleve, cabedal respirável e design minimalista para o dia a dia." },
  { id: 8, nome: "Jaqueta Corta-vento", cat: "moda", emoji: "🧥", preco: 249.00, estrelas: 4, badge: null, desc: "Impermeável, resistente ao vento e com design slim fit. Perfeita para dias frios ou chuvosos." },
  { id: 9, nome: "Óculos Polarizados", cat: "moda", emoji: "🕶️", preco: 179.00, estrelas: 4, badge: "Oferta", desc: "Proteção UV400, armação em acetato italiano e lentes polarizadas para máximo conforto visual." },
  { id: 10, nome: "Mochila Urbana 25L", cat: "moda", emoji: "🎒", preco: 219.00, estrelas: 5, badge: null, desc: "Compartimento acolchoado para notebook 15\", porta USB externa e material impermeável." },

  // Casa
  { id: 11, nome: "Luminária Nórdica", cat: "casa", emoji: "💡", preco: 159.00, estrelas: 4, badge: null, desc: "Design escandinavo, luz quente 3000K regulável e cabo têxtil de 1,5m. Ideal para leituras." },
  { id: 12, nome: "Kit Cactos Decorativos", cat: "casa", emoji: "🌵", preco: 89.90, estrelas: 5, badge: "Popular", desc: "Conjunto de 3 cactos artificiais de alta qualidade, vasinhos em cerâmica artesanal." },
  { id: 13, nome: "Difusor de Aromas", cat: "casa", emoji: "🕯️", preco: 119.00, estrelas: 5, badge: null, desc: "Ultrassônico, cobre até 30m², timer programável e LED colorido para criar ambientes únicos." },
  { id: 14, nome: "Porta-retratos 3D", cat: "casa", emoji: "🖼️", preco: 69.90, estrelas: 4, badge: "Oferta", desc: "Quadro shadow box em madeira escura com efeito tridimensional. Para fotos 10x15." },

  // Esporte
  { id: 15, nome: "Garrafa Térmica 1L", cat: "esporte", emoji: "🍶", preco: 129.00, estrelas: 5, badge: null, desc: "Aço inox 18/8, mantém quente 12h e frio 24h. Boca larga para gelo e fácil higienização." },
  { id: 16, nome: "Tapete de Yoga 6mm", cat: "esporte", emoji: "🧘", preco: 149.00, estrelas: 4, badge: "Novo", desc: "Material antiderrapante, alinhamento guia impresso, inclui alça de transporte e bolsa." },
  { id: 17, nome: "Corda de Pular Speed", cat: "esporte", emoji: "🪢", preco: 79.00, estrelas: 5, badge: null, desc: "Rolamento de aço para alta rotação, cabo ajustável em aço revestido e punho emborrachado." },
  { id: 18, nome: "Luvas de Treino", cat: "esporte", emoji: "🥊", preco: 99.00, estrelas: 4, badge: "Popular", desc: "Couro sintético premium, palma ventilada e velcro reforçado para suporte máximo do pulso." },
];

// ── ESTADO ───────────────────────────────────
let carrinhoItens = [];
let catAtiva = "todos";
let buscaTermo = "";
let ordenacao = "default";

// ── ELEMENTOS DOM ────────────────────────────
const grid = document.getElementById("produtosGrid");
const emptyMsg = document.getElementById("emptyMsg");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const toast = document.getElementById("toast");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

// ── FILTRO + ORDENAÇÃO ───────────────────────
function produtosFiltrados() {
  let lista = [...produtos];

  // Filtro por categoria
  if (catAtiva !== "todos") lista = lista.filter(p => p.cat === catAtiva);

  // Filtro por busca
  if (buscaTermo) {
    const t = buscaTermo.toLowerCase();
    lista = lista.filter(p => p.nome.toLowerCase().includes(t) || p.cat.toLowerCase().includes(t));
  }

  // Ordenação
  if (ordenacao === "preco-asc") lista.sort((a, b) => a.preco - b.preco);
  if (ordenacao === "preco-desc") lista.sort((a, b) => b.preco - a.preco);
  if (ordenacao === "nome") lista.sort((a, b) => a.nome.localeCompare(b.nome));

  return lista;
}

// ── RENDERIZAÇÃO DOS CARDS ───────────────────
function renderProdutos() {
  const lista = produtosFiltrados();
  grid.innerHTML = "";

  if (!lista.length) { emptyMsg.style.display = "block"; return; }
  emptyMsg.style.display = "none";

  lista.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "produto-card";
    card.style.animationDelay = `${i * 0.06}s`;

    card.innerHTML = `
        ${p.badge ? `<div class="card-badge">${p.badge}</div>` : ""}
        <div class="card-img-wrap">${p.emoji}</div>
        <div class="card-body">
          <div class="card-cat">${catLabel(p.cat)}</div>
          <div class="card-name">${p.nome}</div>
          <div class="card-stars">${estrelas(p.estrelas)}</div>
          <div class="card-footer">
            <span class="card-price">${formatPrice(p.preco)}</span>
            <button class="card-add" data-id="${p.id}">+ Adicionar</button>
          </div>
        </div>
      `;

    // Click no card → abre modal
    card.addEventListener("click", e => {
      if (!e.target.classList.contains("card-add")) abrirModal(p);
    });

    // Botão adicionar
    card.querySelector(".card-add").addEventListener("click", e => {
      e.stopPropagation();
      adicionarAoCarrinho(p);
    });

    grid.appendChild(card);
  });
}

// ── HELPERS ──────────────────────────────────
const formatPrice = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const estrelas = n => "★".repeat(n) + "☆".repeat(5 - n);
const catLabel = c => ({ eletronicos: "Eletrônicos", moda: "Moda", casa: "Casa", esporte: "Esporte" }[c] || c);

// ── CARRINHO ─────────────────────────────────
function adicionarAoCarrinho(produto) {
  const idx = carrinhoItens.findIndex(i => i.id === produto.id);
  if (idx >= 0) carrinhoItens[idx].qty++;
  else carrinhoItens.push({ ...produto, qty: 1 });
  atualizarCarrinho();
  showToast(`✔ ${produto.nome} adicionado ao carrinho!`);
}

function removerDoCarrinho(id) {
  carrinhoItens = carrinhoItens.filter(i => i.id !== id);
  atualizarCarrinho();
}

function alterarQty(id, delta) {
  const item = carrinhoItens.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removerDoCarrinho(id);
  else atualizarCarrinho();
}

function atualizarCarrinho() {
  // Contagem
  const total = carrinhoItens.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = total;

  // Itens
  cartItems.innerHTML = "";
  carrinhoItens.forEach(item => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
        <div class="cart-item-icon">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nome}</div>
          <div class="cart-item-price">${formatPrice(item.preco)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">🗑</button>
      `;
    cartItems.appendChild(el);
  });

  // Total
  const soma = carrinhoItens.reduce((s, i) => s + i.preco * i.qty, 0);
  cartTotal.textContent = formatPrice(soma);

  // Eventos dinâmicos
  cartItems.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const delta = btn.dataset.action === "inc" ? 1 : -1;
      alterarQty(Number(btn.dataset.id), delta);
    });
  });
  cartItems.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => removerDoCarrinho(Number(btn.dataset.id)));
  });
}

// ── ABRIR / FECHAR CARRINHO ───────────────────
function abrirCarrinho() { cartDrawer.classList.add("open"); cartOverlay.classList.add("open"); }
function fecharCarrinho() { cartDrawer.classList.remove("open"); cartOverlay.classList.remove("open"); }

cartBtn.addEventListener("click", abrirCarrinho);
closeCart.addEventListener("click", fecharCarrinho);
cartOverlay.addEventListener("click", fecharCarrinho);

// Finalizar compra
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!carrinhoItens.length) { showToast("⚠ Seu carrinho está vazio!"); return; }
  carrinhoItens = [];
  atualizarCarrinho();
  fecharCarrinho();
  showToast("🎉 Compra finalizada! Obrigado!");
});

// ── MODAL ────────────────────────────────────
function abrirModal(p) {
  modalContent.innerHTML = `
      <div class="modal-icon">${p.emoji}</div>
      <div class="modal-cat">${catLabel(p.cat)}</div>
      <div class="modal-name">${p.nome}</div>
      <div class="modal-stars">${estrelas(p.estrelas)} <small style="color:var(--muted)">(${p.estrelas}.0)</small></div>
      <div class="modal-desc">${p.desc}</div>
      <div class="modal-price">${formatPrice(p.preco)}</div>
      <button class="modal-add" id="modalAddBtn">🛒 Adicionar ao Carrinho</button>
    `;
  modalOverlay.classList.add("open");
  document.getElementById("modalAddBtn").addEventListener("click", () => {
    adicionarAoCarrinho(p);
    fecharModal();
  });
}

function fecharModal() { modalOverlay.classList.remove("open"); }
modalClose.addEventListener("click", fecharModal);
modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) fecharModal(); });

// ── TOAST ─────────────────────────────────────
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ── FILTROS: PILLS + NAV ──────────────────────
function setCategoria(cat) {
  catAtiva = cat;
  document.querySelectorAll(".cat-pill").forEach(b => b.classList.toggle("active", b.dataset.cat === cat));
  document.querySelectorAll(".nav-link").forEach(a => a.classList.toggle("active", a.dataset.cat === cat));
  renderProdutos();
}

document.querySelectorAll(".cat-pill").forEach(btn => {
  btn.addEventListener("click", () => setCategoria(btn.dataset.cat));
});
document.querySelectorAll(".nav-link").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    setCategoria(a.dataset.cat);
    document.getElementById("categorias").scrollIntoView({ behavior: "smooth" });
  });
});

// ── BUSCA ─────────────────────────────────────
searchInput.addEventListener("input", () => {
  buscaTermo = searchInput.value.trim();
  renderProdutos();
});

// ── ORDENAÇÃO ─────────────────────────────────
sortSelect.addEventListener("change", () => {
  ordenacao = sortSelect.value;
  renderProdutos();
});

// ── INIT ──────────────────────────────────────
renderProdutos();