
export function t(obj, lang) {
  if (!obj) return "";
  return obj[lang] || obj.en || "";
}

export { navbar } from "./navbar"
export {banner} from "./banner"
export  {timings} from "./timings"
export  {recipes} from "./recipes"

