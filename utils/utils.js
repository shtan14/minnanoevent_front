// 日時をフォーマットする関数
export function formatDatetime(datetimeString) {
  const datetime = new Date(datetimeString);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const day = datetime.getDate();
  const hour = datetime.getHours();
  const minute = datetime.getMinutes();
  const second = datetime.getSeconds();
  const dayOfWeek = weekdays[datetime.getDay()];

  return `${year}年${month}月${day}日（${dayOfWeek}）${hour}時${minute}分${second}秒`;
}
