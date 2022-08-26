// https://caniuse.com/viewport-unit-variants
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

  function update() {
    values.svh = root.clientHeight * 0.01;
    values.dvh = window.innerHeight * 0.01;
    values.lvh = lvhEl.clientHeight * 0.01;
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
  }

  return { values: update(), update, destroy };
}
