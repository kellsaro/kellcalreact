import moment from 'moment'

export const formatedDate = (d) => {
  return moment(d).format('MMMM DD YYYY, h:mm:ss a ');
}
