import { useGlobalStore ,useBookStore} from '@/store';

const global=useGlobalStore()
const book=useBookStore()
const {studentID,URL} = global
const {bookMeetingRoom}=book
const getUrl=`${URL}/getEmptyTime`

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [


]

export function createEventId() {
  return String(eventGuid++)
}

