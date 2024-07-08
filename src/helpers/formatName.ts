export default function formatName(name: string) {
  return name.includes('-')
    ? name.split('-').join('\n')
    : name.charAt(0).toUpperCase() + name.slice(1);
}
