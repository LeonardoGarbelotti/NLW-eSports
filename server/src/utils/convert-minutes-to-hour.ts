// função utilizada para transformar os minutos recebidos em horas "hh:mm"
// Math.floor irá arredondar valor para baixo

//String(hours).padStart(2, '0') serve para converter o valor em string e adicionar um 0 
//caso não possua 2 caracteres

export function convertMinutesToHour(minutesValue: number) {
    const hours = Math.floor(minutesValue / 60);
    const minutes = minutesValue % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}