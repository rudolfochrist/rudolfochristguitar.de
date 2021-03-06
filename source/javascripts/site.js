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
  const $events = document.getElementById("events").children;
  const $upcomingContainer = document.getElementById("upcoming-events");
  const today = new Date();

  for (const $event of $events) {
    const eventDate = new Date($event.dataset['date']);
    if (eventDate >= today) {
      $upcomingContainer.append($event);
    }
  }

  const $noUpcomingNote = document.getElementById("no-upcoming-note");
  if ($upcomingContainer.children.length === 0) {
    $noUpcomingNote.classList.remove("hidden");
  }
}

docReady(() => {
  sortEvents();
});
