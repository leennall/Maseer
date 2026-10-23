// عناصر الصفحة المشتركة
const $ = (selector) => document.querySelector(selector);
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);

// navigation bar
const navigation = [
  ["index.html", "الرئيسية", "home"],
  ["index.html#map", "الخريطة التفاعلية", "map"],
  ["crafts.html", "الحرف التقليدية", "crafts"],
  ["quiz.html", "اكتشف حرفتك", "discover"],
  ["about.html", "عن مسير", "about"],
];

const navigationLinks = navigation
  .map(([url, label, name]) => {
    const isCurrent = name === page || (page === "craft" && name === "crafts");
    return `<a href="${url}"${isCurrent ? ' aria-current="page"' : ""}>${label}</a>`;
  })
  .join("");

$("#hdr").innerHTML = `
  <div class="hdr-in">
    <a href="index.html" class="lg">
      <img src="logo.png" alt="مسير">
    </a>

    <nav>${navigationLinks}</nav>

    ${
      sessionStorage.getItem("maseerDemoUser") === "true"
        ? `<button type="button" class="btn login" id="userLogoutBtn">
             تسجيل الخروج
           </button>`
        : `<a class="btn login" href="login.html">
             تسجيل الدخول
           </a>`
    }
  </div>`;
  document.getElementById("userLogoutBtn")
  ?.addEventListener("click", function () {
    sessionStorage.removeItem("maseerDemoUser");
    window.location.href = "index.html";
  });
$("#ftr").innerHTML = `
  <div class="ft-in">
    <nav>${navigationLinks}</nav>
    <p>مسير رحلة في الحرف اليدوية السعودية</p>
  </div>`;

//  بطاقة حرفة 
function createCraftCard(craft) {
  return `
    <a class="card" href="craft.html?id=${craft.id}">
      <img src="img/${craft.img}.jpg" alt="${craft.name}" loading="lazy">
      <div>
        <h3>${craft.name}</h3>
        <small>${craft.region}</small>
        <p>${craft.summary}</p>
      </div>
    </a>`;
}

// pin on home page
if (page === "home") {
  const stage = $("#stage");
  let popup = null;

  stage.insertAdjacentHTML(
    "beforeend",
    CRAFTS.map((craft) => `
      <button class="pin" data-id="${craft.id}"
        aria-label="${craft.name}"
        style="left:${craft.pos[0]}%;top:${craft.pos[1]}%">
        <img src="pin.png" alt="">
      </button>`).join("")
  );

  function closePopup() {
    if (popup) popup.remove();
    popup = null;
    stage.querySelectorAll(".pin.on").forEach((pin) => pin.classList.remove("on"));
  }

  stage.addEventListener("click", (event) => {
    const pin = event.target.closest(".pin");

    if (!pin) {
      if (!event.target.closest(".pop")) closePopup();
      return;
    }

    const wasOpen = pin.classList.contains("on");
    closePopup();
    if (wasOpen) return;

    const craft = CRAFTS.find((item) => item.id === pin.dataset.id);
    if (!craft) return;

    pin.classList.add("on");
    const isNearBottom = craft.pos[1] > 85;
    popup = document.createElement("div");
    popup.className = `pop${isNearBottom ? " up" : ""}`;
    popup.style.left = `${craft.pos[0]}%`;
    popup.style.top = isNearBottom ? `calc(${craft.pos[1]}% - 44px)` : `${craft.pos[1]}%`;
    popup.style.marginTop = isNearBottom ? "0" : "8px";
    popup.innerHTML = `
      <img src="img/${craft.img}.jpg" alt="${craft.name}">
      <div>
        <h3>${craft.name}</h3>
        <p>${craft.summary}</p>
        <a class="btn" href="craft.html?id=${craft.id}">عرض تفاصيل الحرفة</a>
      </div>`;
    stage.append(popup);
  });
}

//  search and filter
if (page === "crafts") {
  const searchInput = $("#q");
  const regionSelect = $("#r");
  const results = $("#out");
  const regions = [...new Set(CRAFTS.map((craft) => craft.region))];

  regionSelect.innerHTML = `
    <option value="">كل المناطق</option>
    ${regions.map((region) => `<option>${region}</option>`).join("")}`;

  function showCrafts() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedRegion = regionSelect.value;
    const filteredCrafts = CRAFTS.filter((craft) => {
      const matchesRegion = !selectedRegion || craft.region === selectedRegion;
      const searchableText = `${craft.name} ${craft.summary}`.toLowerCase();
      return matchesRegion && searchableText.includes(searchText);
    });

    results.innerHTML = filteredCrafts.map(createCraftCard).join("") ||
      '<p class="hint">لا توجد حرف مطابقة.</p>';
  }

  searchInput.addEventListener("input", showCrafts);
  regionSelect.addEventListener("change", showCrafts);
  showCrafts();
}

//  تفاصيل الحرفة
if (page === "craft") {
  const craftId = params.get("id");
  const craft = CRAFTS.find((item) => item.id === craftId) || CRAFTS[0];
  document.title = `مسير | ${craft.name}`;

  function createSectionContent(content) {
    if (Array.isArray(content)) {
      return `<ol>${content.map((item) => `<li>${item}</li>`).join("")}</ol>`;
    }
    return `<p>${content}</p>`;
  }

  const sections = craft.secs.map(([heading, content]) => `
    ${heading ? `<h3>${heading}</h3>` : ""}
    ${createSectionContent(content)}`).join("");

  const comparison = craft.then ? `
    <h2 class="t">بين الأمس واليوم</h2>
    <div class="dual">
      <div class="was">
        <span class="badge">الأمس</span>
        <h3>${craft.then[0]}</h3><p>${craft.then[1]}</p>
      </div>
      <div class="now">
        <span class="badge">اليوم</span>
        <h3>${craft.then[2]}</h3><p>${craft.then[3]}</p>
      </div>
    </div>` : "";

  const diagram = craft.diagram
    ? `<img class="shot" src="img/${craft.diagram}.jpg" alt="صورة توضيحية للحرفة">`
    : "";

  $("#root").innerHTML = `
    <header class="dh"><img src="img/${craft.img}.jpg" alt="${craft.name}"></header>
    <div class="wrap dt">
      <h1>${craft.name}</h1>
      <p>${craft.region} — ${craft.summary}</p>
    </div>
    <div class="wrap">
      <div class="sec">${sections}${diagram}</div>
      ${comparison}
      <div class="nextj">
        <h2 class="t">واصل رحلتك في مسير</h2>
        <a class="btn" href="index.html#map">العودة إلى الخريطة</a>
        <a class="btn alt" href="crafts.html">كل الحرف</a>
      </div>
    </div>`;
}

// تمييز رابط الخريطة   
if (page === "home") {
  const homeLink = $('#hdr nav a[href="index.html"]');
  const mapLink = $('#hdr nav a[href="index.html#map"]');
  const mapSection = $("#map");

  function updateActiveLink() {
    const bounds = mapSection.getBoundingClientRect();
    const mapIsActive = location.hash === "#map" ||
      (bounds.top < innerHeight * 0.45 && bounds.bottom > innerHeight * 0.3);

    mapLink.toggleAttribute("aria-current", mapIsActive);
    homeLink.toggleAttribute("aria-current", !mapIsActive);
  }

  addEventListener("scroll", updateActiveLink, { passive: true });
  addEventListener("hashchange", updateActiveLink);
  updateActiveLink();
}
