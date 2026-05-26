let dataTree = {};
let selectedCat = '';
let selectedSubcat = 'Todos';
let searchQuery = '';
let isAllTemplates = true; // Inicia na vista global

let currentTemplate = null;
let currentTemplateCat = ''; // Guarda a categoria do template aberto no modal
let currentTheme = 'dark'; 
let currentRoute = '';
let availableRoutes = [];

const categoriesList = document.getElementById('categories-list');
const templatesGrid = document.getElementById('templates-grid');
const currentCatTitle = document.getElementById('current-category-title');
const subcatFilters = document.getElementById('subcat-filters');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');
const btnAllTemplates = document.getElementById('btn-all-templates');

// Dicionário de Estilos Híbridos para os Tiers (Gamificação)
const TIER_STYLES = {
  1: {
    name: "Standard",
    badge: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    card: "border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
  },
  2: {
    name: "Premium",
    badge: "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.2)]",
    card: "border-zinc-700 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
  },
  3: {
    name: "Boutique",
    badge: "bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.4)]",
    card: "border-purple-900/40 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
  }
};

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderGrid();
});

async function init() {
  const res = await fetch('/api/templates');
  dataTree = await res.json();
  
  const categories = Object.keys(dataTree);
  if (categories.length === 0) {
    templatesGrid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center h-full text-zinc-600 mt-20">
        <i data-lucide="folder-search" class="w-12 h-12 mb-4 opacity-50"></i>
        <p class="text-base font-medium">A biblioteca de templates está vazia.</p>
      </div>`;
    lucide.createIcons();
    return;
  }

  categoriesList.innerHTML = categories.map(cat => {
    return `
      <button onclick="selectCategory('${cat}', this)" class="nav-item w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 flex items-center gap-3">
        <i data-lucide="folder" class="w-4 h-4"></i>
        <span class="capitalize truncate">${cat.replace(/-/g, ' ')}</span>
      </button>`;
  }).join('');

  // Arranca com a vista "Todos os Templates"
  selectAllTemplates(btnAllTemplates);
}

function selectAllTemplates(element) {
  isAllTemplates = true;
  currentCatTitle.innerText = "TODOS OS TEMPLATES";
  selectedSubcat = 'Todos'; 
  searchQuery = '';
  searchInput.value = '';
  subcatFilters.classList.add('hidden');

  // Limpa estados ativos das categorias
  Array.from(categoriesList.children).forEach(child => {
    child.classList.remove('active', 'text-zinc-100', 'bg-zinc-800/60');
    child.classList.add('text-zinc-400');
  });

  // Ativa o botão global
  element.classList.add('ring-2', 'ring-zinc-600');

  renderGrid();
}

function selectCategory(cat, element) {
  isAllTemplates = false;
  selectedCat = cat;
  currentCatTitle.innerText = cat.replace(/-/g, ' ').toUpperCase();
  selectedSubcat = 'Todos'; 
  searchQuery = '';
  searchInput.value = '';

  btnAllTemplates.classList.remove('ring-2', 'ring-zinc-600');

  Array.from(categoriesList.children).forEach(child => {
    child.classList.remove('active', 'text-zinc-100', 'bg-zinc-800/60');
    child.classList.add('text-zinc-400');
  });
  element.classList.add('active', 'text-zinc-100', 'bg-zinc-800/60');
  element.classList.remove('text-zinc-400');

  const catData = dataTree[cat] || { subcategories: [], templates: [] };
  const subcats = catData.subcategories;
  
  if (subcats.length > 0) {
    subcatFilters.classList.remove('hidden');
    const allFilters = ['Todos', ...subcats];
    
    subcatFilters.innerHTML = allFilters.map(sub => `
      <button onclick="filterSubcategory('${sub}', this)" class="subcat-btn px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${sub === 'Todos' ? 'bg-zinc-200 text-black shadow-sm' : 'bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700'}">
        ${sub}
      </button>
    `).join('');
  } else {
    subcatFilters.classList.add('hidden');
  }
  renderGrid();
}

function filterSubcategory(subcat, btnElement) {
  selectedSubcat = subcat;
  Array.from(subcatFilters.children).forEach(btn => {
    btn.classList.remove('bg-zinc-200', 'text-black', 'shadow-sm');
    btn.classList.add('bg-zinc-800/50', 'text-zinc-400');
  });
  btnElement.classList.remove('bg-zinc-800/50', 'text-zinc-400');
  btnElement.classList.add('bg-zinc-200', 'text-black', 'shadow-sm');
  renderGrid();
}

function renderGrid() {
  let templates = [];

  if (isAllTemplates) {
    Object.keys(dataTree).forEach(c => {
      // Injeta o nome da categoria no objeto do template para usarmos no modal
      const catsTemplates = dataTree[c].templates.map(t => ({ ...t, parentCategory: c }));
      templates.push(...catsTemplates);
    });
  } else {
    const catData = dataTree[selectedCat] || { templates: [] };
    templates = catData.templates.map(t => ({ ...t, parentCategory: selectedCat }));
    
    if (selectedSubcat !== 'Todos') {
      templates = templates.filter(t => t.subcategory === selectedSubcat);
    }
  }

  if (searchQuery.trim() !== '') {
    templates = templates.filter(t => t.name.toLowerCase().includes(searchQuery));
  }

  // Ordena por Tier (Boutique > Premium > Standard)
  templates.sort((a, b) => (b.tier || 1) - (a.tier || 1));

  if (templates.length === 0) {
    templatesGrid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center mt-20 text-zinc-600">
        <i data-lucide="search-x" class="w-10 h-10 mb-3 opacity-50"></i>
        <p class="text-sm">Nenhum template encontrado.</p>
      </div>`;
    lucide.createIcons();
    return;
  }

  templatesGrid.innerHTML = templates.map(t => {
    let coverImgName = t.images.find(img => img.includes('1-landing') && img.includes('dark'));
    if (!coverImgName) coverImgName = t.images.find(img => img.includes('1-landing'));
    if (!coverImgName) coverImgName = t.images[0];

    const coverImg = coverImgName ? `/preview/${encodeURIComponent(t.parentCategory)}/${encodeURIComponent(t.subcategory)}/${encodeURIComponent(t.id)}/${encodeURIComponent(coverImgName)}` : null;
    
    const tierLvl = t.tier || 1;
    const style = TIER_STYLES[tierLvl] || TIER_STYLES[1];
    
    return `
      <div onclick="openModal('${t.id}', '${t.parentCategory}')" class="group flex flex-col bg-[#121214] border ${style.card} rounded-xl overflow-hidden cursor-pointer transition-all duration-500 relative">
        
        <div class="aspect-[4/3] bg-zinc-900 relative overflow-hidden flex items-center justify-center">
          ${coverImg 
            ? `<img src="${coverImg}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
               <div style="display:none;" class="items-center justify-center h-full w-full bg-zinc-900 text-zinc-700"><i data-lucide="image-off" class="w-6 h-6"></i></div>` 
            : `<i data-lucide="image-off" class="w-6 h-6 text-zinc-700"></i>`}
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
             <span class="text-xs font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg w-fit flex items-center gap-2">
                <i data-lucide="eye" class="w-3 h-3"></i> Inspecionar
             </span>
          </div>
        </div>

        <div class="p-4 flex flex-col gap-2 border-t border-zinc-800/50 relative bg-[#121214] z-10">
          <div class="flex justify-between items-start gap-2">
            <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider truncate">${t.subcategory}</span>
            <span class="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${style.badge} shrink-0">
              Tier ${tierLvl}
            </span>
          </div>
          <h3 class="text-sm font-bold text-zinc-100 truncate">${t.name}</h3>
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function openModal(id, category) {
  currentTemplateCat = category;
  const catData = dataTree[category] || { templates: [] };
  currentTemplate = catData.templates.find(x => x.id === id);
  
  const tierLvl = currentTemplate.tier || 1;
  const style = TIER_STYLES[tierLvl] || TIER_STYLES[1];

  document.getElementById('modal-title').innerHTML = `
    ${currentTemplate.name} 
    <span class="ml-3 px-2 py-0.5 rounded-full text-[9px] align-middle uppercase tracking-widest ${style.badge}">
      Tier ${tierLvl} - ${style.name}
    </span>
  `;
  document.getElementById('modal-desc').innerText = `${category.replace(/-/g, ' ')} / ${currentTemplate.subcategory}`;
  
  const routeSet = new Set();
  (currentTemplate.images || []).forEach(img => {
    const cleanName = img
      .replace(/-(dark|light)\.(webp|png|jpg|jpeg)$/i, '')
      .replace(/-part\d+\.(webp|png|jpg|jpeg)$/i, '')
      .replace(/\.(webp|png|jpg|jpeg)$/i, '');
    routeSet.add(cleanName);
  });
  
  availableRoutes = Array.from(routeSet).sort();
  currentRoute = availableRoutes.length > 0 ? availableRoutes[0] : '';
  currentTheme = 'dark'; 
  
  renderModalTabs();
  updatePreviewImage();
  updateThemeIcon();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => { modal.classList.remove('opacity-0'); lucide.createIcons(); }, 10);
}

function renderModalTabs() {
  const tabsContainer = document.getElementById('modal-tabs');
  if (availableRoutes.length === 0) {
    tabsContainer.innerHTML = '';
    return;
  }

  tabsContainer.innerHTML = availableRoutes.map(route => {
    let cleanName = route.replace(/^\d+-/, ''); 
    cleanName = cleanName.replace(/-part\d+$/i, '');
    cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    
    const isActive = route === currentRoute;
    
    return `
      <button onclick="switchTab('${route}')" class="tab-btn px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${isActive ? 'active' : 'text-zinc-400 border-transparent hover:bg-zinc-800 hover:text-white'}">
        ${cleanName}
      </button>
    `;
  }).join('');
}

function switchTab(route) {
  if (currentRoute === route) return;
  currentRoute = route;
  document.getElementById('browser-frame').scrollTo({ top: 0 });
  renderModalTabs();
  updatePreviewImage();
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  updateThemeIcon();
  updatePreviewImage();
}

function updateThemeIcon() {
  const btn = document.getElementById('theme-icon');
  btn.setAttribute('data-lucide', currentTheme === 'dark' ? 'moon' : 'sun');
  lucide.createIcons();
}

function updatePreviewImage() {
  const imgEl = document.getElementById('preview-img');
  const emptyEl = document.getElementById('carousel-empty');

  if (!currentRoute || !currentTemplate.images || currentTemplate.images.length === 0) {
    imgEl.style.display = 'none';
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    return;
  }

  emptyEl.classList.add('hidden');
  emptyEl.classList.remove('flex');
  imgEl.style.display = 'block';
  
  let targetImageName = currentTemplate.images.find(img => img.startsWith(currentRoute) && img.includes(currentTheme) && !img.includes('-part'));
  if (!targetImageName) targetImageName = currentTemplate.images.find(img => img.startsWith(currentRoute) && img.includes(currentTheme));
  if (!targetImageName) targetImageName = currentTemplate.images.find(img => img.startsWith(currentRoute));
  
  imgEl.removeAttribute('data-error');
  imgEl.style.opacity = '0';
  
  setTimeout(() => {
    if (targetImageName) {
      imgEl.src = `/preview/${encodeURIComponent(currentTemplateCat)}/${encodeURIComponent(currentTemplate.subcategory)}/${encodeURIComponent(currentTemplate.id)}/${encodeURIComponent(targetImageName)}`;
      imgEl.style.opacity = '1';
    } else {
       handleImageError();
    }
  }, 150);
}

function handleImageError() {
  const imgEl = document.getElementById('preview-img');
  if (!imgEl.hasAttribute('data-error')) {
     imgEl.setAttribute('data-error', 'true');
     imgEl.style.display = 'none';
     const emptyEl = document.getElementById('carousel-empty');
     emptyEl.classList.remove('hidden');
     emptyEl.classList.add('flex');
  }
}

function closeModal() {
  modal.classList.add('opacity-0');
  setTimeout(() => { modal.classList.add('hidden'); modal.classList.remove('flex'); }, 300);
}

async function confirmSelection() {
  const btn = document.getElementById('btn-confirm');
  btn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Preparando Código...`;
  lucide.createIcons();
  
  await fetch('/api/select', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      template: currentTemplate.id, 
      category: currentTemplateCat,
      subcategory: currentTemplate.subcategory
    })
  });

  closeModal();
  const successOverlay = document.getElementById('success-overlay');
  const successCard = document.getElementById('success-card');
  
  successOverlay.classList.remove('hidden');
  successOverlay.classList.add('flex');
  
  setTimeout(() => { 
    successOverlay.classList.remove('opacity-0'); 
    successCard.classList.remove('scale-95');
    successCard.classList.add('scale-100');
  }, 10);
  
  setTimeout(() => window.close(), 1500);
}

window.onload = init;