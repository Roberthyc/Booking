import { useGlobalStore ,useBookStore} from '@/store';

const global=useGlobalStore()
const book=useBookStore()
const {studentID,URL} = global
const {bookMeetingRoom}=book
const getUrl=`${URL}/getEmptyTime`

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "学术报告",
    start: todayStr
  },
  {
    id: createEventId(),
    title: "团队组会",
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

async function fetchData(getUrl,locationId){
  let url=`${getUrl}?dateTime=2023-12-04&locationId=1`
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // 设置请求头为 JSON
        // 其他请求头，如果有的话
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // 解析响应体为 JSON
  })  
  .catch(error => {
      console.error('There was an error!', error);
  });

}