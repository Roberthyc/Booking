export const useGlobalStore = defineStore('global', () => {
  const studentID=window.location.href.match(/(?<=name=)\w\d+/) ? window.location.href.match(/(?<=name=)\w\d+/)[0]:"S231231095";
  console.log(studentID)
  const URL=ref('http://113.250.189.122:8090/api/wechat')
  const date=ref(new Date().toISOString().replace(/T.*$/, ''))
  const today=ref('')
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    today.value= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return {studentID,URL,today,date,getCurrentDateTime}
})

export const useBookStore = defineStore('Book', () => {
  const bookMeetingRoom=ref('')
  const freeTime=ref([])
  return {bookMeetingRoom,freeTime}
})
