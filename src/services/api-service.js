import axios from 'axios'
import moment from 'moment'

let baseUri = 'https://api.covidtracking.com/api/v1'

let getRunningAverages = (data, key, index, count) => {
  let end = index + count;
  if (end > data.length) {
    return null;
  }
  let dataArr = [ ...data ].slice(index, end).map(item => item[key]);
  return dataArr.reduce((a, b) => a + b) / count;
}

let getPositivityRate = (item) => {
  let rate = parseFloat(
    ((item.positiveIncrease / item.totalTestResultsIncrease) * 100).toFixed(
      2,
    ),
  );
  return isNaN(rate) ? 0 : rate;
}

let getColor = (item) => {
  return item.positivityRate < 5 ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
}

let mapData = (data) => {
  let returnData = data.map((item) => {
    return {
      ...item,
      positivityRate: getPositivityRate(item),
    }
  });
  return returnData.map((item, index) => {
    return {
      ...item,
      color: getColor(item),
      avg14Days: getRunningAverages(returnData, 'positivityRate', index, 14),
      avg5Days: getRunningAverages(returnData, 'positivityRate', index, 5),
    }
  }).filter(item => {
    let date = new Date(item.dateChecked);
    return date > new Date('2020-03-01T00:00:00Z')
  });
}

export default {
  getDailyCasesByState(state) {
    return axios.get(`${baseUri}/states/${state.toLowerCase()}/daily.json`).then(res => mapData(res.data));
  },
  getDailyCasesUS() {
    return axios.get(`${baseUri}/us/daily.json`).then(res => mapData(res.data));
  },
}