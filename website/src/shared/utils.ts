import dayjs from 'dayjs';

export const formatDate = (time: number) =>
  dayjs(time).format('YY-MM-DD HH:mm');

export const formatFileSize = (size: number) =>
  Number((size / 1000).toFixed(2));

export const formatSecond = (ms: number) => Number((ms / 1000).toFixed(2));
