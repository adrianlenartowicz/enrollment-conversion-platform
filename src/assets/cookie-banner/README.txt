Consent Manager Installation Instructions

1. Extract the contents of this zip file
2. Place the files in your website directory
3. Add the following code to your HTML page, inside the <head> tag:

<link rel="stylesheet" id="silktide-consent-manager-css" href="path-to-css/silktide-consent-manager.css">
<script src="path-to-js/silktide-consent-manager.js"></script>
<script>
silktideCookieBannerManager.updateCookieBannerConfig({
  background: {
    showBackground: true
  },
  cookieIcon: {
    position: "bottomLeft"
  },
  cookieTypes: [
    {
      id: "niezb_dne",
      name: "Niezbędne",
      description: "<p>Te pliki cookie są niezbędne do prawidłowego działania strony internetowej i nie można ich wyłączyć. Pomagają w takich działaniach jak logowanie oraz zapisywanie Twoich preferencji dotyczących prywatności.</p>",
      required: true,
      onAccept: function() {
        console.log('Add logic for the required Niezbędne here');
      }
    },
    {
      id: "analityczne",
      name: "Analityczne",
      description: "<p>Te pliki cookie pomagają nam ulepszać stronę, śledząc, które podstrony są najpopularniejsze oraz w jaki sposób odwiedzający poruszają się po witrynie.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_analityczne',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    },
    {
      id: "reklamowe",
      name: "Reklamowe",
      description: "<p>Te pliki cookie zapewniają dodatkowe funkcje i personalizację, aby poprawić Twoje doświadczenie podczas korzystania ze strony. Mogą być ustawiane przez nas lub przez partnerów, z których usług korzystamy.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_reklamowe',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    }
  ],
  text: {
    banner: {
      description: "<p>Używamy plików cookie na naszej stronie, aby poprawić Twoje doświadczenie użytkownika, dostarczać spersonalizowane treści oraz analizować ruch na stronie <a href=\"https://your-website.com/cookie-policy\" target=\"_blank\">Cookie Policy.</a></p>",
      acceptAllButtonText: "Zaakceptuj wszystkie",
      acceptAllButtonAccessibleLabel: "Zaakceptuj wszystkie pliki cookie",
      rejectNonEssentialButtonText: "Odrzuć opcjonalne",
      rejectNonEssentialButtonAccessibleLabel: "Odrzuć opcjonalne",
      preferencesButtonText: "Preferencje",
      preferencesButtonAccessibleLabel: "Preferencje"
    },
    preferences: {
      title: "Dostosuj swoje preferencje dotyczące plików cookie",
      description: "<p>Szanujemy Twoje prawo do prywatności. Możesz zdecydować, aby nie zezwalać na niektóre typy plików cookie. Twoje preferencje dotyczące plików cookie będą obowiązywać w całej naszej witrynie.</p>",
      creditLinkText: "Get this banner for free",
      creditLinkAccessibleLabel: "Get this banner for free"
    }
  },
  position: {
    banner: "bottomLeft"
  }
});
</script>
