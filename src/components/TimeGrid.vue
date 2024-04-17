<script>
import { defineComponent } from 'vue'
import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'
import zh from '@fullcalendar/core/locales/zh-cn'
import { ref } from "vue"
import { useGlobalStore, useBookStore } from '@/store';
import { storeToRefs } from 'pinia'

const global = useGlobalStore()
const book = useBookStore()
const {studentID, URL}=global
const { date } = storeToRefs(global)
const { bookMeetingRoom, freeTime } = storeToRefs(book)
const freeTimeUrl = `${URL}/getEmptyTime/`
const postUrl = `${URL}/save`
const getUrl = `${URL}/getEmptyTime`
export default defineComponent({

  components: {
    FullCalendar,
  },
  data() {

    return {
      date: date,
      bookMeetingRoom: bookMeetingRoom,
      show: false,
      title: ' ',
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        themeSystem: 'bootstrap',
        height: "auto",
        handleWindowResize: true,
        locale: zh,
        customButtons: {
          myCustomButton: {
            text: 'custom!',
          }
        },
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'today',

        },
        scrollTime: "12:00:00",//设置默认滚动到的时间点
        longPressDelay:'100',
        views: {
          timeGridDay: { // name of view
            titleFormat: { day: '2-digit', month: '2-digit' },
            // other view-specific options here
            allDaySlot: false
          },

        },
        initialView: 'timeGridDay',
        stickyHeaderDates: true,
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        events: freeTime.value,
        editable: false,
        selectable: true,
        selectOverlap:false,
        selectMirror: false,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventsSet: this.handleEvents,
        eventClick: this.handleEventClick,
        datesSet: this.dateSet,
        /* you can update a remote database when these fire:
        
        eventChange:
        eventRemove:
        */
      },

    }
  },
  methods: {
    async postData(url, selectInfo) {
      const regex = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/;
      let start = selectInfo.startStr.match(regex).slice(1, 3).join(' ');
      let end = selectInfo.endStr.match(regex).slice(1, 3).join(' ');
      console.log(url)
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 设置请求头为 JSON
          // 其他请求头，如果有的话
        },
        body: JSON.stringify({
          "endTime": end,
          "id": 1,
          "locationId": bookMeetingRoom.value,
          "organizerId": studentID,
          "resComment": "我是一个测试预约内容",
          "startTime": start,
          "status": 0,
          "title": this.title
        }), // 将数据转换为 JSON 字符串并作为请求体发送
      })
        .then(response => {
          console.log(response);
          if (!response.ok) {
           confirm('创建失败');
           return false;
          }
          confirm('创建成功');
         return true;// 解析响应体为 JSON
        })
        .catch(error => {
          console.error('There was an error!', error);
        });



    },
    dateSet(dateInfo) {
      date.value = dateInfo.startStr.replace(/T.*$/, '')
    },
    async handleDateSelect(selectInfo) {
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); 
     // clear date selection
      if(!bookMeetingRoom.value){
        confirm('请先选择地址'); 
        return;
      }
      this.title = prompt("请输入会议标题", "郑腾创建的会议");
     
      console.log(this.title)
      if (this.title) {
        if(!await this.postData(postUrl, selectInfo)) return;
        calendarApi.addEvent({
          id: createEventId(),
          title: this.title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: false
        })
      }
    },
    handleEventClick(clickInfo) {
      console.log(freeTime)
      confirm(`该时间段已被占用`)

      //       let calendarApi = this.$refs.fullCalendar.getApi()
      //       calendarApi.addEvent(  {

      // title: 'Timed event',
      // start: '2024-04-10' + 'T16:00:00',
      // end:'2024-04-10' + 'T20:00:00'
      // }
      //         )

    },
    handleEvents(events) {
      this.currentEvents = events

    },
    async getFreeTime(date, bookMeetingRoom) {
      if(!bookMeetingRoom.value) return;
      let calendarApi = this.$refs.fullCalendar.getApi()
      let events=calendarApi.getEvents()
      console.log(date,bookMeetingRoom)
      for(let e of events ){
        e.remove();
      }
      let url = `${freeTimeUrl}?dateTime=${date.value}&locationId=${bookMeetingRoom.value}`;
      let value = (await(await fetch(url).catch(e=>console.log("未选择地址"))).json()).data;
      if(value){
        for (let item of value) {
          const { title: title, startTime: start, endTime: end } = item
          calendarApi.addEvent({ title: title, start: start, end: end })
        }
      }
    },
  },


    watch: {
      bookMeetingRoom: function (newRoom, oldRoom) {
        this.getFreeTime(date,bookMeetingRoom)
      },
      date:function(newDate){
        let calendarApi = this.$refs.fullCalendar.getApi()
        calendarApi.gotoDate(newDate)
        this.getFreeTime(date,bookMeetingRoom)
      }
    },
    mounted() {

    },

  })

</script>

<template >

      <FullCalendar class='demo-app-calendar' ref="fullCalendar" :options='calendarOptions' />

</template>

<style lang='css'>
.fc .fc-button {
  border: 0 !important;
  border-radius: 0 !important;
  background-color: var(--color-primary);
}

.fc .fc-button-primary:disabled {
  background-color: var(--color-primary);
}

.fc .fc-toolbar {
  background-color: var(--color-primary);
  color: #fff;
  margin-top: -1px;
}

.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 0;
}
</style>
