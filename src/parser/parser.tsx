export default function parseString(input: string) {
    const regex = /i(\d{1,5})c(\d{1,3})/g;
    const matches = [...input.matchAll(regex)];
  
    const result = matches.map(match => ({
      id: parseInt(match[1]),
      count: parseInt(match[2])
    }));
  
    return result;
}

export function stringifyArray(data: any[]) {
  return data.map(item => `i${padNumber(item.id, 5)}c${padNumber(item.count, 3)}`).join('');
}

function padNumber(number: number, length: number) {
  return number.toString().padStart(length, '0');
}