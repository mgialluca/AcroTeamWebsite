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

// Lightbox: click any image ("lightbox-img") or video ("lightbox-video")
// to view/play it full size. Thumbnail videos stay muted and paused —
// playback (with sound) only starts once opened in the lightbox.
document.addEventListener("DOMContentLoaded", () => {
  const lightboxImgs = document.querySelectorAll(".lightbox-img");
  const lightboxVideos = document.querySelectorAll(".lightbox-video");
  if (lightboxImgs.length === 0 && lightboxVideos.length === 0) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close full size view">&times;</button>
    <img class="lightbox-media" src="" alt="">
    <video class="lightbox-media" controls playsinline></video>
  `;
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector("img");
  const overlayVideo = overlay.querySelector("video");
  const closeBtn = overlay.querySelector(".lightbox-close");

  function closeLightbox() {
    overlay.classList.remove("open");
    overlayImg.style.display = "none";
    overlayImg.src = "";
    overlayVideo.pause();
    overlayVideo.removeAttribute("src");
    overlayVideo.load();
    overlayVideo.style.display = "none";
  }

  function openImage(src, alt) {
    closeLightbox();
    overlayImg.src = src;
    overlayImg.alt = alt;
    overlayImg.style.display = "block";
    overlay.classList.add("open");
  }

  function openVideo(src) {
    closeLightbox();
    overlayVideo.src = src;
    overlayVideo.muted = true;
    overlayVideo.style.display = "block";
    overlay.classList.add("open");
    overlayVideo.play();
  }

  lightboxImgs.forEach((img) => {
    img.addEventListener("click", () => openImage(img.src, img.alt));
  });

  lightboxVideos.forEach((video) => {
    video.addEventListener("click", () => {
      const source = video.querySelector("source");
      const fullSrc = source.getAttribute("src").split("#")[0];
      openVideo(fullSrc);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeLightbox();
  });
});

// Contact form: use the user's typed subject as the actual email subject line
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const subjectField = form.querySelector("#subject");
  const hiddenSubject = form.querySelector("#subject-hidden");

  form.addEventListener("submit", () => {
    if (subjectField.value.trim()) {
      hiddenSubject.value = subjectField.value.trim();
    }
  });
});
