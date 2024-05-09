export const generateRandomNumbers = (min:number, max :number) =>  {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

export const random = (): string => {
    const randomNumber = Math.floor(Math.random() * (100000 - 1 + 50) + 1);
  
    for (let i = 1; i < 5; i++) {
      if (randomNumber.toString().length == 5) {
        return String(randomNumber);
      } else {
        return String(randomNumber) + '1';
      }
    }

    return String(randomNumber);
  };

  export const chageformatDate = (dateStr :string) => {
    const parts = dateStr.split(/[.,: ]/);
        const fromDateFormatted = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0]),
    );
    fromDateFormatted.setHours(+parts[3], +parts[4], 0, 0);
    return fromDateFormatted;
}