export function loadFromEnv(key) {
  return import.meta.env[`VITE_${key}`]
}
