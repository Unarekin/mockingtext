function mockChar(char: string): string {
  return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
}

export default function mock(text: string): string {
  let mocked = text.split("").map(mockChar).join("");

  return mocked;
}