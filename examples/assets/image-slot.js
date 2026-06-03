class ImageSlot extends HTMLElement {
  connectedCallback() {
    if (this.querySelector("img")) return;

    const src = this.getAttribute("src");
    if (!src) return;

    const img = document.createElement("img");
    img.src = src;
    img.alt = this.getAttribute("placeholder") || "";
    img.loading = "lazy";
    img.decoding = "async";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.display = "block";

    this.appendChild(img);
  }
}

if (!customElements.get("image-slot")) {
  customElements.define("image-slot", ImageSlot);
}
