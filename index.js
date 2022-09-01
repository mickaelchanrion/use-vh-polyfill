export default function () {
  const lvhEl = document.createElement("div");
  lvhEl.classList.add("vh-polyfill-lvh");
  Object.entries({
    width: "1px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    visibility: "hidden",
  }).forEach(([prop, value]) => (lvhEl.style[prop] = value));
  document.body.appendChild(lvhEl);

  const root = document.documentElement;
  const values = { svh: 0, lvh: 0, dvh: 0 };
  let shouldUpdateLvh = true;

  function update() {
    values.svh = root.clientHeight * 0.01;
    values.dvh = window.innerHeight * 0.01;
    if (shouldUpdateLvh) {
      values.lvh = lvhEl.clientHeight * 0.01;
    }
    requestAnimationFrame(() => {
      root.style.setProperty("--svh", values.svh + "px");
      root.style.setProperty("--lvh", values.lvh + "px");
      root.style.setProperty("--dvh", values.dvh + "px");
    });
    return values;
  }

  function destroy() {
    ["--svh", "--dvh", "--lvh"].forEach((prop) =>
      root.style.setProperty(prop, null)
    );
    document.body.removeChild(lvhEl);

    if (isAndroid) {
      document.removeEventListener("focus", onFocus);
    }
  }

  // On Android, the on-screen keyboard shrinks the viewport but we don't want
  // to update lvh
  function onFocus(event) {
    if (!event.isTrusted) return;
    const tagName = event.target.tagName.toLowerCase();
    const types = [
      "email",
      "number",
      "password",
      "search",
      "tel",
      "text",
      "url",
    ];

    if (
      (tagName === "input" && types.includes(event.target.type)) ||
      tagName === "textarea" ||
      event.target.getAttribute("contenteditable") === "true"
    ) {
      shouldUpdateLvh = false;
      const prevLvh = values.lvh;
      // Listen to resize and wait until lvh gets back to it's previous value
      const onResize = () => {
        if (prevLvh === lvhEl.clientHeight * 0.01) {
          shouldUpdateLvh = true;
          window.removeEventListener("resize", onResize);
        }
      };
      window.addEventListener("resize", onResize);
    }
  }

  const isAndroid = /android/i.test(navigator.userAgent);
  if (isAndroid) {
    document.addEventListener("focus", onFocus, true);
  }

  return { values: update(), update, destroy };
}
