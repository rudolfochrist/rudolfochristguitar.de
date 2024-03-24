// This is where it all goes :)

const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const anchorLinks = document.querySelectorAll(".anchor-link");
const iconClose = document.querySelector(".icon-close");
const iconBurger = document.querySelector(".icon-burger");

mobileNavToggle.addEventListener("click", toggleNav);
anchorLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    toggleNav();
    window.location = e.target.href;
  });
});

function docReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  }
  else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function sortEvents() {
  const $events = document.querySelector("#events");
  const $upcomingContainer = document.querySelector("#upcoming");
  const today = new Date();

  // sort them in reverse
  [...$events.children]
    .sort((a, b) => new Date(a.dataset.date) < new Date(b.dataset.date) ? 1 : -1)
    .forEach(node => $events.appendChild(node));

  // move to upcoming
  [...$events.children].forEach((event) => {
    const eventDate = new Date(event.dataset.date);
    if (eventDate >= today) $upcomingContainer.appendChild(event);
  });

  const $noUpcomingNote = document.querySelector("#no-upcoming-note");
  if ($upcomingContainer.children.length === 0) {
    $noUpcomingNote.classList.remove("hidden");
  } else {
    [...$upcomingContainer.children]
      .sort((a, b) => new Date(a.dataset.date) > new Date(b.dataset.date) ? 1 : -1)
      .forEach(node => $upcomingContainer.appendChild(node));
  }
}

function toggleNav() {
  primaryNav.toggleAttribute("data-visible");
  iconBurger.classList.toggle("display-none");
  iconClose.classList.toggle("display-none");
  primaryNav.hasAttribute("data-visible")
    ? mobileNavToggle.setAttribute("aria-expanded", true)
    : mobileNavToggle.setAttribute("aria-expanded", false);
}
