
export function t(obj, lang) {
  if (!obj) return "";
  return obj[lang] || obj.en || "";
}

export { navbar } from "./navbar"

