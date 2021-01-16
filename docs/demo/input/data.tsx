export default function genString(): string {
  const idx = Math.ceil(Math.random() * 8);
  const val = '123456789'.slice(idx, idx + 3);
  return val;
}
