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
