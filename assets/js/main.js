// Team page accordion behavior
document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".team-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const member = toggle.closest(".team-member");
      const bio = member.querySelector(".team-bio");
      const isOpen = member.classList.contains("open");

      if (isOpen) {
        member.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        bio.style.maxHeight = null;
      } else {
        member.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
        bio.style.maxHeight = bio.scrollHeight + "px";
      }
    });
  });
});

// Lightbox: click any image with class "lightbox-img" to view full size
document.addEventListener("DOMContentLoaded", () => {
  const lightboxImgs = document.querySelectorAll(".lightbox-img");
  if (lightboxImgs.length === 0) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close full size image">&times;</button>
    <img src="" alt="">
  `;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector("img");
  const closeBtn = overlay.querySelector(".lightbox-close");

  function openLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt;
    overlay.classList.add("open");
  }

  function closeLightbox() {
    overlay.classList.remove("open");
    overlayImg.src = "";
  }

  lightboxImgs.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  closeBtn.addEventListener("click", closeLightbox);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeLightbox();
  });
});
