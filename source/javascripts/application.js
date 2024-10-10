// This is where it all goes :)

const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const anchorLinks = document.querySelectorAll(".anchor-link");
const iconClose = document.querySelector(".icon-close");
const iconBurger = document.querySelector(".icon-burger");


function toggleNav() {
  primaryNav.toggleAttribute("data-visible");
  iconBurger.classList.toggle("display-none");
  iconClose.classList.toggle("display-none");
  primaryNav.hasAttribute("data-visible")
    ? mobileNavToggle.setAttribute("aria-expanded", true)
    : mobileNavToggle.setAttribute("aria-expanded", false);
}

mobileNavToggle.addEventListener("click", toggleNav);
anchorLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    toggleNav();
    window.location = e.target.href;
  });
});

const im = iframemanager();

CookieConsent.run({
  categories: {
    necessary: {
      enabled: true,
      readOnly: true
    },
    videos: {
      services: {
        youtube: {
          label: "YouTube",
          onAccept: () => im.acceptService('youtube'),
          onReject: () => im.rejectService('youtube')
        }
      }
    }
  },

  language: {
    default: "en",
    autoDetect: 'document',
    translations: {
      de: {
        consentModal: {
          title: "&#127850; Wir brauchen Ihre Zustimmung!",
          description: "Wir haben Dienste von Drittanbietern eingebunden. Mehr Information über die verwendeten Cookies und Skipte finden Sie in unserer <a href=\"de/privacy-policy.html\">Datenschutzerklärung</a>. Mit Klick auf den 'Alle akzeptieren'-Button, stimmen Sie der Verwendung der Dienste von Drittanbietern zu. Wenn Sie nicht zustimmen, werden keine Cookies oder Skipte, außer den technisch erforderlichen, gesetz oder geladen. Unter 'Einstellungen' können Sie einzelen Dienste aktivieren oder deaktivieren.",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Alle ablehnen",
          showPreferencesBtn: "Einstellungen"
        },
        preferencesModal: {
          title: 'Cookie Einstellungen',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Alle ablehnen',
          savePreferencesBtn: 'Auswahl speichern',
          closeIconLabel: 'Close modal',
          sections: [
            {
              title: 'Wir brauchen Ihre Zustimmung!',
              description: "Wir haben Dienste von Drittanbietern eingebunden. Mehr Information über die verwendeten Cookies un Skipte finden Sie in unserer <a href=\"de/privacy-policy.html\">Datenschutzerklärung</a>. Mit Klick auf den 'Alle akzeptieren'-Button, stimmen Sie der Verwendung der Dienste von Drittanbietern zu. Wenn Sie nicht zustimmen, werden keine Cookies oder Skipte, außer den technisch erforderlichen, gesetz oder geladen. Unter 'Einstellungen' können Sie einzelen Dienste aktivieren oder deaktivieren.",
            },
            {
              title: "Technisch erforderliche Cookies",
              description: "Diese Cookies sind essentiell für die korrekte Funktionsweise der Webseite und können nicht deaktiviert werden.",
              linkedCategory: 'necessary'
            },
            {
              title: 'Videos',
              description: "Eingebundene Videos von externen Video-Diensten.",
              linkedCategory: 'videos'
            },
          ]
        }
      },
      en: {
        consentModal: {
          title: "&#127850; We need your permission!",
          description: "We're using services that use cookies and scripts. Please refer to our <a href=\"en/privacy-policy.html\"> privacy policy</a> to learn more about third-party cookies and scripts and services we use. If you click 'Accept all' you grant us permission to use those. By clicking 'Reject all' no cookies or scripts will be set or executed. Click 'Manage preferences' to select and deselect specific services.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences"
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Accept selection',
          closeIconLabel: 'Close modal',
          sections: [
            {
              title: 'We need your permission!',
              description: "We're using services that use Cookies and scripts. Please refere to our <a href=\"privacy-policy.html\"> privacy policy</a> to learn more about third-party cookies and scripts and services we use. If you click 'Accept all' you grant us permission to use those. By clicking 'Reject all' no cookies or scripts will be set or executed. Click 'Manage preferences' to select and deselect specific services."
            },
            {
              title: "Functional Necessary Cookies",
              description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
              linkedCategory: 'necessary'
            },
            {
              title: 'Videos',
              description: 'Embedded videos hosted on external video services.',
              linkedCategory: 'videos'
            },
          ]
        }
      }
    }
  }
});


im.run({
  onChange: ({ changedServices, eventSource }) => {
    if(eventSource.type === 'click') {
      const servicesToAccept = [
        ...CookieConsent.getUserPreferences().acceptedServices['videos'],
        ...changedServices
      ];

      CookieConsent.acceptService(servicesToAccept, 'videos');
    }
  },
  autoLang: true,
  services: {
    youtube: {
      embedUrl: 'https://www.youtube-nocookie.com/embed/{data-id}',
      iframe: {
        allow: 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
      },

      languages: {
        de: {
          notice: 'Dieser Inhalt ist bei einem Drittanbieter gehosted. Wenn Sie diesen Inhalt laden, akzeptieren Sie die <a rel="noreferrer noopener" href="https://www.youtube.com/t/terms" target="_blank">Nutzungsbedingungen</a> von youtube.com',
          loadAllBtn: 'Akzeptieren'
        },
        en: {
          notice: 'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer noopener" href="https://www.youtube.com/t/terms" target="_blank">terms and conditions</a> of youtube.com.',
          loadAllBtn: 'Accept'
        }
      }
    }
  }
});
