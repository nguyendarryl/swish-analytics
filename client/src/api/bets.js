/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const resource = "/api/bets";
const instance = axios.create({
  baseURL: "",
});

export default {
  getBets(statType, statTypeSelection, xAxis, yAxis) {
    return instance.get(`${resource}`, {
      params: {
        statType,
        statTypeSelection,
        xAxis,
        yAxis,
      },
    });
  },

  getHighlights(statType, statTypeSelection, yAxis) {
    return instance.get(`${resource}/highlights`, {
      params: {
        statType,
        statTypeSelection,
        yAxis,
      },
    });
  },
};
