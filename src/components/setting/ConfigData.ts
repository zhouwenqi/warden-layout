import { Warden } from "@/typings"
/**
 * Theme color configuration
 * id：locale key
 */
const ThemeColors: Warden.IColor[] = [
  { color: '#417ffb', id: 'config.theme.color.blue' },
  { color: '#f21934', id: 'config.theme.color.red' },
  { color: '#f8512a', id: 'config.theme.color.orange' },
  { color: '#f8ac2f', id: 'config.theme.color.yellow' },
  { color: '#25c3c1', id: 'config.theme.color.cyan' },
  { color: '#409f46', id: 'config.theme.color.green' },
  { color: '#e857a9', id: 'config.theme.color.pink' },
  { color: '#712fce', id: 'config.theme.color.purple' },
]
const Languages: Array<Warden.IRegion> = [
  { language: 'zh-CN', name: '简体中文' },
  { language: 'en-US', name: 'English' },
]
export { ThemeColors,Languages }
