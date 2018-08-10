/**
 * 时间转换成周
 * @param startTime 开始时间
 * @param endTime  结束时间
 */
const convertTimeToWeek = function (startTime, endTime) {
  let weekendDays = 0; //周末的多少天
  let dayMilliseconds = 1000 * 60 * 60 * 24; //一天的秒数
  while (startTime <= endTime) {
    let day = startTime.getDay();
    if (day === 0) {
      weekendDays++;
    } else if (startTime - endTime === 0) {
      weekendDays++;
    }
    startTime = new Date(+startTime + dayMilliseconds);
  }
  return weekendDays;
};
/**
 * 获取结束时间
 * @param startTime 开始时间
 * @param weeks    周数目
 */
const getEndTime = function (startTime, weeks) {
  let dayMilliseconds = 1000 * 60 * 60 * 24; //一天的秒数
  let endTime = new Date(+startTime + dayMilliseconds);
  let tempWeeks = 0;
  while (tempWeeks < weeks) {
    let day = endTime.getDay();
    if (day === 0) {
      tempWeeks++;
    }
    endTime = new Date(+endTime + dayMilliseconds);
  }
  return new Date(+endTime - dayMilliseconds);
};

/**
 * 格式化日期
 * @param sdate 传递的日期
 * @param fmt 格式化形式
 * @returns {*}
 */
const formatDate = function (sdate, fmt) {
  if (sdate) {
    sdate = sdate.replace(/-/g, "/");
    let date = new Date(sdate);
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
      }
      return fmt;
    }
  }
}


function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

//给指定时间加上分钟返回，timeStr为格式化的字符串（不是date），plusMinutes为分钟数
const addMinutes = function (timeStr, plusMinutes) {
  var time = new Date(timeStr.replace("-", "/"));
  return new Date(time.setMinutes(time.getMinutes() + parseInt(plusMinutes), time.getSeconds(), 0));
};

/**
 * 获取传递的日期是当年第几周
 * @param year
 * @param month
 * @param day
 * @returns {number}
 */
const getWeeks = function (year, month, day) {
  var day1 = new Date(year, month - 1, day);
  var day2 = new Date(year, 0, 1);

  var firstweek = day2.getDay();//1月1日是星期几
  if (firstweek == 0) {
    firstweek = 6;
  } else {
    firstweek = firstweek - 1;
  }//转化为0表示星期一,6表示星期日
  firstweek = (7 - firstweek) % 7;//计算1月1日离第一周的天数
  var day3 = new Date(year, 0, 1 + firstweek)
  var result = Math.round((day1.getTime() - day3.getTime()) / (1000 * 60 * 60 * 24));
  result = Math.floor(result / 7) + 2;//这个地方应该用floor返回最小次数然后+2
  return result;
};

export {convertTimeToWeek, getEndTime, formatDate, addMinutes, getWeeks};
