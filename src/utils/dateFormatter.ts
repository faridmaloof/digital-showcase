interface DateObject {
  year: number;
  month?: string;
  day?: number;
}

const monthNames: { [key: string]: string } = {
  "Ene": "Enero", "Feb": "Febrero", "Mar": "Marzo", "Abr": "Abril", "May": "Mayo", "Jun": "Junio",
  "Jul": "Julio", "Ago": "Agosto", "Sep": "Septiembre", "Oct": "Octubre", "Nov": "Noviembre", "Dic": "Diciembre"
};

const formatDate = (dateObj: DateObject | string): string => {
  if (typeof dateObj === 'string') return dateObj;
  if (!dateObj || !dateObj.year) return '';

  const month = dateObj.month ? `${monthNames[dateObj.month] || dateObj.month} ` : '';
  const day = dateObj.day ? `${dateObj.day} ` : '';
  return `${day}${month}${dateObj.year}`;
};

export const formatDateRange = (startDate: DateObject, endDate?: DateObject | string): string => {
  const start = formatDate(startDate);
  
  if (!endDate) {
    return start;
  }
  
  const end = formatDate(endDate);
  
  return start === end ? start : `${start} - ${end}`;
};