### Date对象
- Date对象比较少用，这次负责的项目中有涉及到日历，觉得有必要重新整理一下Date对象及相关的API。
1. Date()是一个构造函数，其实例化对象返回当日的日期和时间
    - ```javascript
        var date = new Date()
        console.log(date)// Thu Dec 07 2017 14:00:15 GMT+0800 (中国标准时间)
      ```
2. Date的常用方法
    - 首先，是get方法
    - getDate() 从Date对象中，返回当天的日期（1~31）
        - ```javascript
            var date = new Date()
            console.log(date.getDate())// 7 12月7号
          ```
    - getDay() 从Date对象中，返回当天的星期数(0~6 注意 `0就是星期天`)
        - ```javascript
            var date = new Date()
            console.log(date.getDay())// 4 星期四
           ```
    - getMonth() 从 Date 对象返回月份 (0 ~ 11)
         - ```javascript
            var date = new Date()
            console.log(date.getMonth())// 12 12月
           ```
    - getFullYear() 从 Date 对象以`四位数字`返回年份。
         - ```javascript
            var date = new Date()
            console.log(date.getFullYear())// 2017 2017年
           ```
    - getHours() 返回 Date 对象的小时 (0 ~ 23)
        - ```javascript
            var date = new Date()
            console.log(date.getHours())// 14  下午2点
           ```
    - getMinutes() 返回 Date 对象的分钟 (0 ~ 59)
        - ```javascript
            var date = new Date()
            console.log(date.getMinutes())// 0  0分
           ```
    - getSeconds() 返回 Date 对象的秒数 (0 ~ 59)
        - ```javascript
            var date = new Date()
            console.log(date.getSeconds())// 15  15秒
           ```
    - 然后是set方法
    - setDate() 用setDate函数在`某个日期上加减天数 如果往前算就传入负数,往后算就传入正数`
         - ```javascript
            var date = new Date()
            console.log(date.setDate(31))// 返回值: 1514700015102 (调整过的日期的毫秒表示)
            需要使用Date返回正常值

            var baz = new Date(1514700015102)
            console.log(baz) // Sun Dec 31 2017 14:00:15 GMT+0800 (中国标准时间)
           ```
    - setMonth(month, day) 设置 Date 对象中月份 (0 ~ 11)
        - 参数: month[必需] 一个表示月份的数值，该值介于 0（一月） ~ 11（十二月） 之间；day[可选] 一个表示月的某一天的数值，该值介于 1 ~ 31 之间
         - ```javascript
            var date = new Date()
            console.log(date.setMonth(1))// 返回值: 1488520815102 (调整过的日期的毫秒表示)
            需要使用Date返回正常值

            var baz = new Date(1514700015102)
            console.log(baz) // SFri Mar 03 2017 14:00:15 GMT+0800 (中国标准时间)
           ```
    - setFullYear(year, month, day) 用于设置年份。
        - 参数: year[必需] 表示年份的四位整数;  month[可选] 表示月份的数值，介于 0 ~ 11 之间; day[可选] 表示月中某一天的数值，介于 1 ~ 31 之间
         - ```javascript
            var date = new Date()
            console.log(date.setFullYear(2008))// 返回值: 1204524015102 (调整过的日期的毫秒表示)
            需要使用Date返回正常值

            var baz = new Date(1204524015102)
            console.log(baz) // Mon Mar 03 2008 14:00:15 GMT+0800 (中国标准时间)
           ```
    - setHours(hour,min,sec,millisec) 用于设置指定的时间的小时字段。
        - 参数： hour[必需] 表示小时的数值，介于 0（午夜） ~ 23（晚上11点） 之间；
        min[可选] 表示分钟的数值，介于 0 ~ 59 之间； sec[可选] 可选。表示秒的数值，介于 0 ~ 59 之间；millisec[可选] 表示毫秒的数值，介于 0 ~ 999之间
        - ```javascript
            var date = new Date()
            console.log(date.setHours(0))// 返回值: 1204473615102 (调整过的日期的毫秒表示)
            需要使用Date返回正常值

            var baz = new Date(1204473615102)
            console.log(baz) // Mon Mar 03 2008 00:00:15 GMT+0800 (中国标准时间)
           ```