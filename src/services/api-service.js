import axios from 'axios'
import moment from 'moment'

let baseUri = 'https://covidtracking.com/api/v1/'

let getRunningAverages = (data, index, count) => {
  let end = index + count;
  if (end > data.length) {
    return null;
  }
  let dataArr = [ ...data ].slice(index, end).map(item => item.positivityRate);
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
      avg14Days: getRunningAverages(returnData, index, 14),
      avg5Days: getRunningAverages(returnData, index, 5),
    }
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