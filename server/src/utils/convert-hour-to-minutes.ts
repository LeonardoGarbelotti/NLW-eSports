// função utilizada para transformar a hora recebida em "hh:mm" para minutos

export function convertHourToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number)

    const minutesAmount = (hours * 60) + minutes;

    return minutesAmount;
}