// This is where it all goes :)

function docReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  }
  else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function showNoUpcomingEventsNote() {
  const upcomingEvents = document.getElementById("upcoming-events");
  const upcomingNote = document.getElementById("no-upcoming-note");
  if (upcomingEvents && upcomingEvents.children.length === 0) {
    upcomingNote.classList.remove('hidden');
  }
}

docReady(() => {
  showNoUpcomingEventsNote();
});
