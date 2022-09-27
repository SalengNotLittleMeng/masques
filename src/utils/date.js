/** 验证一个日期是不是今天
 * @param  {string} val 需要验证的日期
 * @return {boolean} 返回布尔值
 */
export function isToday(val) {
  return new Date().toLocaleDateString() === new Date(val).toLocaleDateString();
}
/** 返回两个时间戳之间的时间
 *  @param {*} startTime 开始时间的时间戳
 *  @param {*} endTime 结束时间的时间戳
 *  @return {string} str 返回时间字符串
 */
export function getTimeInterval(startTime, endTime) {
  let runTime = parseInt((endTime - startTime) / 1000);
  const year = Math.floor(runTime / 86400 / 365);
  runTime = runTime % (86400 * 365);
  const month = Math.floor(runTime / 86400 / 30);
  runTime = runTime % (86400 * 30);
  const day = Math.floor(runTime / 86400);
  runTime = runTime % 86400;
  const hour = Math.floor(runTime / 3600);
  runTime = runTime % 3600;
  const minute = Math.floor(runTime / 60);
  runTime = runTime % 60;
  const second = runTime;
  let str = '';
  if (year > 0) {
    str = year + '年';
  }
  if (year <= 0 && month > 0) {
    str = month + '月';
  }
  if (year <= 0 && month <= 0 && day > 0) {
    str = day + '天';
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
    str = hour + '小时';
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
    str = minute + '分钟';
  }
  if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
    str += second + '秒';
  }
  str += '前';
  return str;
}
/** 设置几天后的日期
 * @param  {string} date 起始日期
 * @param  {number} day 向后的天数
 * @return {string} 返回想要得到的日期
 */
export function convertDate(date, day) {
  const tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + day);
  const Y = tempDate.getFullYear();
  const M =
    tempDate.getMonth() + 1 < 10 ? '0' + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
  const D = tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate();
  const result = Y + '-' + M + '-' + D;
  return result;
}
/**
 * 验证日期是否有效-短时间，如 (10:24:06)
 * @param  {string} str 需要验证的短时间
 * @return {boolean} 返回布尔值
 */
export function isTime(str) {
  const a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
  if (a == null) {
    return false;
  }
  if (a[1] >= 24 || a[3] >= 60 || a[4] >= 60) {
    return false;
  }
  return true;
}

/**
 * 验证日期是否有效-短日期，形如 (2019-10-24)
 * @param  {string} str 需要验证的短时间
 * @return {boolean} 返回布尔值
 */
export function strDateTime(str) {
  const result = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (result == null) {
    return false;
  }
  const d = new Date(result[1], result[3] - 1, result[4]);
  return (
    d.getFullYear() === result[1] && d.getMonth() + 1 === result[3] && d.getDate() === result[4]
  );
}
/**
 *比较两个日期大小
 * 例："2019-10-24" 和 "2019-10-25"
 * @param  {string} d1需要验证的日期1
 * @param  {string} d2需要验证的日期2
 * @return {boolean} 返回布尔值
 */
export function compareDate(d1, d2) {
  return new Date(d1.replace(/-/g, '/')) < new Date(d2.replace(/-/g, '/'));
}

/**
 * 验证日期是否有效-长日期时间，形如 (2019-10-24 10:24:06)
 * @param  {string} str 需要验证的短时间
 * @return {boolean} 返回布尔值
 */
export function strDateTimeLong(str) {
  const result = str.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
  if (result == null) {
    return false;
  }
  const d = new Date(result[1], result[3] - 1, result[4], result[5], result[6], result[7]);
  return (
    d.getFullYear() === result[1] &&
    d.getMonth() + 1 === result[3] &&
    d.getDate() === result[4] &&
    d.getHours() === result[5] &&
    d.getMinutes() === result[6] &&
    d.getSeconds() === result[7]
  );
}

/** 获取n天以后的时间戳
 * @param {number} n 天数
 * @returns {Number} 返回值为时间毫秒值
 */
export function toNextTimes(n) {
  const timestamp = +new Date() + n * 86400000;
  return timestamp;
}
/** 按类型格式化日期
 * @param {*} date 具体日期变量
 * @param {string} dateType 需要返回类型
 * @return {string} dateText 返回为指定格式的日期字符串
 */
export function getFormatDate(date, dateType) {
  const dateObj = new Date(date);
  let month = dateObj.getMonth() + 1;
  let strDate = dateObj.getDate();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds;
  }

  let dateText =
    dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日';
  if (dateType === 'yyyy-mm-dd') {
    dateText = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate();
  }
  if (dateType === 'yyyy.mm.dd') {
    dateText = dateObj.getFullYear() + '.' + (dateObj.getMonth() + 1) + '.' + dateObj.getDate();
  }
  if (dateType === 'yyyy-mm-dd MM:mm:ss') {
    dateText =
      dateObj.getFullYear() +
      '-' +
      month +
      '-' +
      strDate +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
  }
  if (dateType === 'mm-dd MM:mm:ss') {
    dateText = month + '-' + strDate + ' ' + hours + ':' + minutes + ':' + seconds;
  }
  if (dateType === 'yyyy年mm月dd日 MM:mm:ss') {
    dateText =
      dateObj.getFullYear() +
      '年' +
      month +
      '月' +
      strDate +
      '日' +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
  }
  return dateText;
}
