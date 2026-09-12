const KEY_SERVICE = "calypso_selected_service";
const KEY_DESC    = "calypso_selected_desc";

export function setSelectedService(service: string, desc: string) {
  sessionStorage.setItem(KEY_SERVICE, service);
  sessionStorage.setItem(KEY_DESC, desc);
  window.dispatchEvent(new CustomEvent("calypso:service-selected", { detail: { service, desc } }));
}

export function getSelectedService(): { service: string; desc: string } {
  return {
    service: sessionStorage.getItem(KEY_SERVICE) ?? "",
    desc:    sessionStorage.getItem(KEY_DESC)    ?? "",
  };
}

export function clearSelectedService() {
  sessionStorage.removeItem(KEY_SERVICE);
  sessionStorage.removeItem(KEY_DESC);
}
