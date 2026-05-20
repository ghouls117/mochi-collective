export function scrollToId(id: string, offset = 60): void {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - offset,
    behavior: "smooth",
  });
}
