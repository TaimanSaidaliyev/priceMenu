export function formatDate(inputDate: string) {
    const [year, month, day] = inputDate.split("-");
    return `${day}.${month}.${year}`;
}