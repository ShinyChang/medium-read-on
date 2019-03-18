const MEDIUM_SITE_SELECTOR =
  'meta[property="al:android:package"][content="com.medium.reader"]';
const CONTENT_SELECTOR = ".postArticle-content";
const PAYWALL_SELECTOR = ".js-paywall";

let fetching = false;
const load = () => {
  if (document.querySelector(MEDIUM_SITE_SELECTOR)) {
    if (document.querySelector(PAYWALL_SELECTOR)) {
      if (!fetching) {
        fetching = true;
        fetch(window.location.href, {
          mode: "cors",
          credentials: "omit",
          referrerPolicy: "no-referrer"
        })
          .then(res => res.text())
          .then(html => {
            fetching = false;
            const doc = new DOMParser().parseFromString(html, "text/html");
            const content = document.querySelector(CONTENT_SELECTOR);
            const xhrContent = doc.querySelector(CONTENT_SELECTOR);
            if (content && xhrContent) {
              content.innerHTML = xhrContent.innerHTML;
            }
          })
          .catch(() => {
            fetching = false;
          });
      }
    }
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "update") {
    load();
  }
});

load();
