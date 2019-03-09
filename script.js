let fetching = false;
const load = () => {
  if (
    document.head.querySelector(
      'meta[property="al:android:package"][content="com.medium.reader"]'
    )
  ) {
    if (document.querySelector(".js-paywall")) {
      if (!fetching) {
        fetching = true;
        fetch(window.location.href, {
          mode: "cors",
          credentials: "omit",
          referrerPolicy: "no-referrer",
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "upgrade-insecure-requests": 1
          }
        })
          .then(res => res.text())
          .then(html => {
            fetching = false;
            const doc = new DOMParser().parseFromString(html, "text/html");
            if (
              document.querySelector(".section-content") &&
              doc.querySelector(".section-content")
            ) {
              document.querySelector(
                ".section-content"
              ).innerHTML = doc.querySelector(".section-content").innerHTML;
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
