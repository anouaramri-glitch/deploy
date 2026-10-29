/* Document viewer: no external verification service is assumed to be configured. */
(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  // These documentary details are printed on the supplied PDF, not inferred from its filename.
  const documentInfo = {
    owner: $("ownerName").textContent.trim(),
    issuer: "ESGCV – ESGF",
    title: "Expert en ingénierie financière",
    issuedAt: "2021-01-21",
    number: "FR-F-20-283"
  };
  const defaultPdf = $("sourcePdf").getAttribute("href").split("?")[0];
  const publicPageUrl = document.querySelector('link[rel="canonical"]').href;
  const T = {
    "fr": {},
    "en": {
      "hi": "Congratulations!",
      "congrats": "You opened a duly certified Smart Certificate document issued by <b>ESGF</b>. Any change to the file is detectable and its owner's identity is attested.",
      "owner_lbl": "Document's owner",
      "owner_link": "View owner profile",
      "issuer_tile": "Click here to learn more about<br>ESG Finance.",
      "vid_t": "How it works, in 16 seconds",
      "vid_s": "Click to play the walkthrough",
      "step0": "01 · Fingerprint",
      "step1": "02 · Signature",
      "step2": "03 · Bitcoin",
      "step3": "04 · Verification",
      "f0b": "The PDF is reduced to 64 characters",
      "f1b": "The issuer seals the PDF with its key",
      "f1s": "PAdES signature (ETSI EN 319 142) embedded in the file: any edit breaks it.",
      "f2b": "The fingerprint is anchored in Bitcoin",
      "f2s": "Through OpenTimestamps: a proof of date nobody, us included, can rewrite.",
      "f3b": "Anyone re-checks it, no account needed",
      "f3s": "QR code or link → this page recomputes the fingerprint and compares it.",
      "secured": "This document is secured by <b>Smart Certificate</b>",
      "see": "See how",
      "loading": "Loading preview…",
      "preview_unavailable": "Preview unavailable. You can still open the source PDF below.",
      "source_pdf": "Open the source PDF",
      "back_document": "Back to document",
      "b1": "Download blockchain<br>receipt",
      "b2": "Validate blockchain<br>receipt",
      "b3": "Download secure<br>PDF",
      "how_t": "What is Smart Certificate ?",
      "how_l": "It is a document that certifies 3 fundamental things:",
      "how1t": "Integrity",
      "how1": "We guarantee that the document has not been modified since its creation. It contains a valid signature and an immutable footprint stored on the Bitcoin blockchain, providing a decentralized method to verify its integrity.",
      "how2t": "Authenticity",
      "how2": "We certify the identity of the issuer. This ensures that the organization and its members are legitimate and authorized to issue this document.",
      "how3t": "Validity",
      "how3": "We ensure the real-time validity of the document. Any change, such as an update, revocation, expiration, or validity extension, is instantly reflected on this page.",
      "own_t": "Owner profile",
      "own_l": "What the issuer checked about this person before issuing the document.",
      "iss_t": "The issuer",
      "mail_t": "Share by email",
      "mail_l": "Open your mail app, or copy the verification link and paste it anywhere.",
      "mail_open": "Open my mail app",
      "copy": "Copy",
      "val_t": "Integrity verification",
      "val_l": "The PDF’s <b>SHA-256</b> fingerprint is computed in your browser and compared with the downloadable receipt. This comparison checks that the file matches the published version exactly.",
      "drop1": "Received a copy of this PDF?",
      "drop2": "Drop it or pick it here",
      "drop3": "to check it has not been modified. The file never leaves your device.",
      "foot": "Document no.",
      "foot2": "SHA-256 fingerprint",
      "iss_l": "ESGF."
    }
  };
  document.querySelectorAll("[data-i]").forEach(el => { T.fr[el.dataset.i] = el.innerHTML; });

  const L = {
    fr: {
      calc: "Calcul de l'empreinte…", hash: "Empreinte calculée", expected: "Empreinte du reçu",
      c1: "Le PDF correspond à l'empreinte du reçu", c1bad: "Le PDF ne correspond pas à l'empreinte du reçu",
      c1missing: "Comparaison avec le reçu indisponible",
      merkle: "Preuve Merkle cohérente à l'intérieur du reçu", merkleBad: "Preuve Merkle invalide ou absente",
      merkleDetail: "Ce contrôle interne ne confirme ni le lien avec le PDF publié, ni un ancrage Bitcoin.",
      signature: "Signature et identité de l'émetteur non vérifiées",
      signatureDetail: "Cette page ne valide pas les signatures numériques de l'émetteur.",
      revocation: "Révocation non vérifiée", revocationDetail: "Aucun service de révocation n'est configuré.",
      pdfMissing: "Le PDF n'a pas pu être chargé.", receiptMissing: "Le reçu n'a pas pu être chargé ou son JSON est invalide.",
      same: "Identique au PDF publié. Cette comparaison ne certifie ni son origine ni son ancrage.",
      different: "Différent du PDF publié. Ce fichier n'est pas la même copie.",
      fileError: "Impossible de comparer ce fichier.", copied: "Lien copié.",
      copyFallback: "Copie automatique indisponible. Le lien est sélectionné : utilisez la commande Copier de votre appareil.",
      downloadError: "Téléchargement indisponible. Ouvrez le fichier source.",
      name: "Nom", title: "Titre", issuer: "Émetteur indiqué sur le PDF", identity: "Identité de l'émetteur",
      unverified: "Non vérifiée par cette page", signedIdentity: "Identité déclarée dans le reçu",
      website: "Site de l'émetteur", websiteMissing: "Lien officiel non configuré",
      search: "Rechercher", close: "Fermer", share: "Partager", language: "Langue actuelle : français. Passer en anglais.",
      preview: "Visualiser le document PDF", thumbnail: "Aperçu du certificat", video: "Lire la présentation",
      mail: "Partager par e-mail", copyLabel: "Lien de vérification", shareText: "Mon certificat vérifiable : "
    },
    en: {
      calc: "Computing fingerprint…", hash: "Computed fingerprint", expected: "Receipt fingerprint",
      c1: "The PDF matches the receipt's fingerprint", c1bad: "The PDF does not match the receipt's fingerprint",
      c1missing: "Comparison with the receipt is unavailable",
      merkle: "The receipt's internal Merkle proof is consistent", merkleBad: "Invalid or missing Merkle proof",
      merkleDetail: "This internal check confirms neither a link to the published PDF nor a Bitcoin anchor.",
      signature: "Issuer signature and identity not verified",
      signatureDetail: "This page does not validate the issuer's digital signatures.",
      revocation: "Revocation not verified", revocationDetail: "No revocation service is configured.",
      pdfMissing: "The PDF could not be loaded.", receiptMissing: "The receipt could not be loaded or its JSON is invalid.",
      same: "Identical to the published PDF. This comparison certifies neither its origin nor its anchoring.",
      different: "Different from the published PDF. This is not the same copy.",
      fileError: "This file could not be compared.", copied: "Link copied.",
      copyFallback: "Automatic copying is unavailable. The link is selected: use your device's Copy command.",
      downloadError: "Download unavailable. Open the source file.",
      name: "Name", title: "Title", issuer: "Issuer shown on the PDF", identity: "Issuer identity",
      unverified: "Not verified by this page", signedIdentity: "Identity declared in the receipt",
      website: "Issuer website", websiteMissing: "Official link not configured",
      search: "Search", close: "Close", share: "Share", language: "Current language: English. Switch to French.",
      preview: "View the PDF document", thumbnail: "Certificate preview", video: "Play the walkthrough",
      mail: "Share by email", copyLabel: "Verification link", shareText: "My verifiable certificate: "
    }
  };
  let lang = "fr";
  try { if (localStorage.getItem("scelle_lang") === "en") lang = "en"; } catch {}
  let receipt = null, receiptText = null, configFailed = false;
  let pdfPromise = null, verificationPromise = null, result = null, previewFailed = false;
  const t = key => L[lang][key];
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  function assetUrl(filename) {
    if (typeof filename !== "string" || !filename) throw new Error("Missing asset path");
    // JSON contains literal filenames; encoding each segment also protects spaces, #, ? and accents.
    const url = new URL(filename.split("/").map(encodeURIComponent).join("/"), document.baseURI);
    if (url.origin !== location.origin) throw new Error("Expected a same-origin document asset");
    // Keep filenames stable; the version query prevents reusing an older document or preview.
    url.searchParams.set("v", receipt?.targetHash || "8342cb58c95d55daadcb20df1130e0572595a19996e0fd7a3048acedd9abf636");
    return url.href;
  }
  const pdfUrl = () => {
    const url = new URL(assetUrl(receipt?.pdf_file || defaultPdf));
    url.searchParams.set("v", receipt?.targetHash || "8342cb58c95d55daadcb20df1130e0572595a19996e0fd7a3048acedd9abf636");
    return url.href;
  };
  async function request(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url, { cache: "no-store", signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      // Read the body before clearing the timeout, not merely the response headers.
      return await response.arrayBuffer();
    } finally { clearTimeout(timeout); }
  }
  function toast(message) {
    const node = document.createElement("div");
    node.className = "toast"; node.setAttribute("role", "status"); node.textContent = message;
    document.body.append(node); setTimeout(() => node.remove(), 5000);
  }
  function kv(rows) {
    return rows.map(([key, value]) => `<dt>${esc(key)}</dt><dd>${esc(value)}</dd>`).join("");
  }
  function render() {
    $("ownerName").textContent = $("pName").textContent = documentInfo.owner;
    $("pIss").textContent = documentInfo.issuer;
    $("pT").textContent = documentInfo.title;
    $("pS").textContent = documentInfo.number;
    $("pSearch").placeholder = t("search"); $("pSearch").setAttribute("aria-label", t("search"));
    $("ownerKv").innerHTML = kv([[t("name"), documentInfo.owner], [t("title"), documentInfo.title]]);
    $("issuerKv").innerHTML = kv([[t("issuer"), documentInfo.issuer], [t("website"), ""]]);
    const schoolLink = document.createElement("a");
    schoolLink.href = "https://www.esgf.com/"; schoolLink.textContent = "ESG Finance";
    schoolLink.target = "_blank"; schoolLink.rel = "noopener noreferrer";
    $("issuerKv").lastElementChild.append(schoolLink);
    $("fHash").textContent = result?.pdfHash ? "SHA-256 " + result.pdfHash : t("calc");
    $("integrityStatus").textContent = result?.error ? t("pdfMissing")
      : result ? (result.matches ? t("c1") : t("c1bad")) : t("calc");
    $("integrityIcon").toggleAttribute("hidden", !result?.matches);
    $("previewMessage").textContent = previewFailed ? T[lang].preview_unavailable : T[lang].loading;
    filterProfile();
    const url = publicPageUrl, encodedUrl = encodeURIComponent(url);
    const text = encodeURIComponent(t("shareText") + documentInfo.title);
    $("shIn").href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodedUrl;
    $("shFb").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl;
    $("shX").href = "https://twitter.com/intent/tweet?url=" + encodedUrl + "&text=" + text;
    $("shWa").href = "https://wa.me/?text=" + text + "%20" + encodedUrl;
    $("mailLink").href = "mailto:?subject=" + text + "&body=" + text + "%0A%0A" + encodedUrl;
    $("copyUrl").value = url;
  }
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i]").forEach(el => {
      const text = T[lang][el.dataset.i]; if (text != null) el.innerHTML = text;
    });
    $("lang").textContent = lang.toUpperCase();
    $("lang").setAttribute("aria-label", t("language"));
    $("lang").title = t("language");
    $("previewLink").setAttribute("aria-label", t("preview"));
    $("preview").alt = t("thumbnail"); $("video").setAttribute("aria-label", t("video"));
    $("copyUrl").setAttribute("aria-label", t("copyLabel"));
    document.querySelector("nav.share").setAttribute("aria-label", t("share"));
    document.querySelectorAll("[data-close]").forEach(button => button.setAttribute("aria-label", t("close")));
    ["shIn", "shFb", "shX", "shWa"].forEach((id, index) => $(id).setAttribute("aria-label", (lang === "fr" ? "Partager sur " : "Share on ") + ["LinkedIn", "Facebook", "X (Twitter)", "WhatsApp"][index]));
    document.querySelector(".s-ml").setAttribute("aria-label", t("mail"));
    render();
  }
  $("lang").addEventListener("click", () => {
    lang = lang === "fr" ? "en" : "fr";
    try { localStorage.setItem("scelle_lang", lang); } catch {}
    applyLang();
  });

  function preparePreview() {
    $("sourcePdf").href = $("previewLink").href = pdfUrl();
    const image = $("preview"), thumb = $("pImg");
    image.onload = () => { image.hidden = false; $("ph").hidden = true; $("previewMag").hidden = false; };
    image.onerror = () => { previewFailed = true; image.hidden = true; $("ph").hidden = false; $("previewMag").hidden = true; render(); };
    thumb.onload = () => { thumb.hidden = false; $("pPlaceholder").hidden = true; $("profileMag").hidden = false; };
    thumb.onerror = () => { thumb.hidden = true; $("pPlaceholder").hidden = false; $("profileMag").hidden = true; };
    image.src = thumb.src = assetUrl(receipt?.preview || "preview-diplome-0fee65e7c793.png");
    if (image.complete) (image.naturalWidth ? image.onload : image.onerror)();
    if (thumb.complete) (thumb.naturalWidth ? thumb.onload : thumb.onerror)();
  }
  function prepareLogo() {
    const image = $("logoImg"), fallback = $("logoWord");
    const showImage = () => { image.hidden = false; fallback.hidden = true; };
    const showFallback = () => { image.hidden = true; fallback.hidden = false; };
    image.addEventListener("load", showImage);
    image.addEventListener("error", showFallback);
    if (image.complete) (image.naturalWidth ? showImage : showFallback)();
  }
  async function getPdf() {
    if (!pdfPromise) {
      pdfPromise = request(pdfUrl()).then(buffer => {
        if (new TextDecoder().decode(new Uint8Array(buffer, 0, Math.min(5, buffer.byteLength))) !== "%PDF-") {
          throw new Error("Response is not a PDF");
        }
        return buffer;
      }).catch(error => { pdfPromise = null; throw error; });
    }
    return pdfPromise;
  }
  async function sha256Hex(buffer) {
    if (!globalThis.crypto?.subtle) throw new Error("SHA-256 requires a secure context");
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  }
  const isHash = value => typeof value === "string" && /^[a-f0-9]{64}$/i.test(value);
  async function verifyMerkle() {
    if (!isHash(receipt?.targetHash) || !isHash(receipt?.merkleRoot) || !Array.isArray(receipt?.proof)) return false;
    let current = receipt.targetHash.toLowerCase();
    for (const step of receipt.proof) {
      if (!step || typeof step !== "object" || Object.keys(step).length !== 1) return false;
      const side = Object.keys(step)[0];
      if (!["left", "right"].includes(side) || !isHash(step[side])) return false;
      const hex = side === "left" ? step.left + current : current + step.right;
      current = await sha256Hex(Uint8Array.from(hex.match(/../g), byte => parseInt(byte, 16)));
    }
    return current === receipt.merkleRoot.toLowerCase();
  }
  async function runChecks() {
    // A click while receipt.json is still loading must not cache a failed verification.
    if (!receipt && !configFailed) return;
    if (!verificationPromise) {
      verificationPromise = (async () => {
        try {
          if (!receipt) throw new Error("Receipt unavailable");
          const pdfHash = await sha256Hex(await getPdf());
          const canCompare = isHash(receipt.targetHash);
          const merkle = receipt.type === "ChainpointSHA256v2" ? await verifyMerkle() : null;
          result = { pdfHash, canCompare, matches: canCompare && pdfHash === receipt.targetHash.toLowerCase(), merkle };
        } catch { result = { error: true }; }
        render();
      })();
    }
    await verificationPromise;
  }
  async function load() {
    try {
      receiptText = new TextDecoder().decode(await request(assetUrl("receipt.json")));
      receipt = JSON.parse(receiptText);
      if (!receipt || typeof receipt !== "object" || Array.isArray(receipt)) throw new Error("Invalid receipt");
      for (const key of ["pdf_file", "preview"]) {
        if (receipt[key] != null && (typeof receipt[key] !== "string" || !receipt[key].trim())) throw new Error(`Invalid ${key}`);
      }
      if (receipt.type === "SHA256FileChecksum" && (receipt.version !== 1 || receipt.hashAlgorithm !== "SHA-256" || !isHash(receipt.targetHash))) {
        throw new Error("Invalid SHA-256 checksum receipt");
      }
    } catch { receipt = null; receiptText = null; configFailed = true; }
    preparePreview(); render(); await runChecks();
  }

  // Only one modal is open at a time. Background content is inert until focus returns.
  let currentModal = null, lastFocus = null, previousOverflow = "";
  const background = [document.querySelector("header"), document.querySelector("main"), $("profil")];
  function openModal(id) {
    if (currentModal) closeModal(false);
    const veil = $(id); if (!veil) return;
    lastFocus = document.activeElement; currentModal = veil;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    background.forEach(node => { node.inert = true; });
    veil.hidden = false;
    (id === "mValidate" ? veil.querySelector("[role=dialog]") : veil.querySelector("[data-close]")).focus();
    if (id === "mValidate") void runChecks();
  }
  function closeModal(restore = true) {
    if (!currentModal) return;
    currentModal.hidden = true; currentModal = null;
    background.forEach(node => { node.inert = false; });
    document.body.style.overflow = previousOverflow;
    if (restore && lastFocus?.isConnected) lastFocus.focus();
  }
  document.querySelectorAll("[data-open]").forEach(button => button.addEventListener("click", () => openModal(button.dataset.open)));
  document.querySelectorAll(".veil").forEach(veil => veil.addEventListener("click", event => {
    if (event.target === veil || event.target.closest("[data-close]")) closeModal();
  }));
  document.addEventListener("keydown", event => {
    if (!currentModal) return;
    if (event.key === "Escape") { event.preventDefault(); closeModal(); }
    if (event.key !== "Tab") return;
    const focusable = [...currentModal.querySelectorAll("button, a[href], input, [tabindex='0']")]
      .filter(node => !node.disabled && node.getClientRects().length);
    if (!focusable.length) {
      event.preventDefault(); currentModal.querySelector("[role=dialog]").focus(); return;
    }
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (!focusable.includes(document.activeElement)) {
      event.preventDefault(); (event.shiftKey ? last : first).focus(); return;
    }
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  async function download(button, filename, getBlob) {
    button.disabled = true; button.setAttribute("aria-busy", "true");
    try {
      const blob = await getBlob(), url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch { toast(t("downloadError")); }
    finally { button.disabled = false; button.removeAttribute("aria-busy"); }
  }
  $("btnPdf").addEventListener("click", event => {
    void download(event.currentTarget, (receipt?.pdf_file || defaultPdf).split("/").pop(), async () => new Blob([await getPdf()], { type: "application/pdf" }));
  });
  $("btnReceipt").addEventListener("click", event => {
    if (!receiptText) { toast(t("receiptMissing")); return; }
    void download(event.currentTarget, "receipt.json", async () => new Blob([receiptText], { type: "application/json" }));
  });
  $("copyBtn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText($("copyUrl").value); toast(t("copied")); }
    catch { $("copyUrl").focus(); $("copyUrl").select(); toast(t("copyFallback")); }
  });

  // Keep the tile unchanged: open only the configured external video, with no embedded player.
  $("video").addEventListener("click", () => {
    const source = receipt?.video_url;
    if (!source) { toast(lang === "fr" ? "Le lien de la vidéo n’est pas encore configuré." : "The video link has not been configured yet."); return; }
    try {
      const url = new URL(source);
      if (!["https:", "http:"].includes(url.protocol)) throw new Error("Invalid video URL");
      window.open(url.href, "_blank", "noopener,noreferrer");
    } catch { toast(lang === "fr" ? "Le lien de la vidéo est invalide." : "The video link is invalid."); }
  });
  function filterProfile() {
    const query = $("pSearch").value.trim().toLocaleLowerCase(lang);
    $("pCard").hidden = !!query && !$("pCard").textContent.toLocaleLowerCase(lang).includes(query);
  }
  function route() {
    closeModal(false);
    const profile = location.hash === "#profil";
    $("profil").hidden = !profile; document.querySelector("main.wrap").hidden = profile;
    window.scrollTo(0, 0);
  }
  $("pSearch").addEventListener("input", filterProfile);
  addEventListener("hashchange", route);
  prepareLogo(); preparePreview(); applyLang(); route(); void load();
})();
