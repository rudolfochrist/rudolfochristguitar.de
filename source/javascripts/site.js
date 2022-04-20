// This is where it all goes :)

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

docReady(() => {
  const events = document.querySelector("#events");
  if (events != null) {
    sortEvents();
  }

  const cookieBtn = document.querySelector("#cookie-settings");
  if (cookieBtn) {
    cookieBtn.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('called handler');
      cc.eraseCookies(['cc_cookie', 'cc_youtube']);
      window.location.reload();
    });
  }
});
