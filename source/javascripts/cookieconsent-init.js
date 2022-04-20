// obtain iframemanager object
var manager = iframemanager();

// obtain cookieconsent plugin
var cc = initCookieConsent();

// Configure with youtube embed
manager.run({
  currLang: 'de',
  services : {
    youtube : {
      embedUrl: 'https://www.youtube-nocookie.com/embed/{data-id}',
      thumbnailUrl: '',
      iframe : {
        allow : 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
      },
      cookie : {
        name : 'cc_youtube'
      },
      languages : {
        de : {
          notice: 'Dieser Inhalt ist bei einem externen Dienstleister gehostet. Wenn Sie diesen Inhalt anschauen, akzeptieren Sie die  <a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Bedingungn" target="_blank">Bedingungen</a> von YouTube.com.',
          loadBtn: 'Video anzeigen',
          loadAllBtn: 'Immer anzeigen'
        }
      }
    }
  }
});

// run plugin with config object
cc.run({
  current_lang: 'de',
  autoclear_cookies: true,                    // default: false
  gui_options: {
    consent_modal: {
      layout: 'cloud',                    // box,cloud,bar
      position: 'bottom center',          // bottom,middle,top + left,right,center
      transition: 'slide'                 // zoom,slide
    },
    settings_modal: {
      layout: 'bar',                      // box,bar
      position: 'left',                   // right,left (available only if bar layout selected)
      transition: 'slide'                 // zoom,slide
    }
  },

  onFirstAction: function(){
  },

  onAccept: function(){
    if(cc.allowedCategory('youtube')){
      manager.acceptService('youtube');
    }
  },

  onChange: function (cookie, changed_preferences) {
    if(!cc.allowedCategory('youtube')){
      manager.rejectService('youtube');
    }else{
      manager.acceptService('youtube');
    }
  },

  languages: {
    'de': {
      consent_modal: {
        title: 'Wir verwenden Cookies!',
        description: 'Diese verwendet Cookies von Drittanbietern:<br/>' +
          '<br/>- Cookies von YouTube durch eingebundene YouTube Videos<br/>' +
          '<br/>Durch klicken auf Akzeptieren erklären Sie sich damit ' +
          'einverstanden. Über die Cookie-Einstellungen im Footer können ' +
          'Sie Ihre Entscheidung jederzeit ändern.' +
          '<br/><a href="/de/privacy-policy/">Mehr Informationen</a>.',
        primary_btn: {
          text: 'Akzeptieren',
          role: 'accept_all'      //'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: 'Ablehnen',
          role: 'accept_necessary'       //'settings' or 'accept_necessary'
        },
      },
      settings_modal: {
        title: 'Cookie settings',
        save_settings_btn: 'Save current selection',
        accept_all_btn: 'Accept all',
        reject_all_btn: 'Reject all',
        close_btn_label: 'Close',
        cookie_table_headers: [
          {col1: 'Name'},
          {col2: 'Domain'},
          {col3: 'Expiration'}
        ],
        blocks: [
          {
            title: 'Cookie Einstellungen',
          },
          {
            title: 'YouTube',
            description: "Von YouTube benutzte Cookies",
            toggle: {
              value: 'youtube',
              enabled: false,
              readonly: false
            },
            cookie_table: [
              {
                col1: '^_ga',
                col2: 'yourdomain.com',
                col3: 'description ...',
                is_regex: true
              },
              {
                col1: '_gid',
                col2: 'yourdomain.com',
                col3: 'description ...',
              },
              {
                col1: 'cc_youtube',
                col2: 'yourdomain.com',
                col3: 'Cookie set by iframemanager'
              }
            ]
          }]
      }
    }
  }
});
