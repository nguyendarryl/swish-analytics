 export const filters = {
   betType: {
     moneyline: {
       statType: "moneyline",
       statTypeSelection: [],
       xAxis: "accepted_datetime_utc",
       yAxis: "book_risk",
     },
     spread: {
       statType: "spread",
       statTypeSelection: [],
       xAxis: "accepted_datetime_utc",
       yAxis: "book_risk",
     },
     totals: {
       statType: "totals",
       statTypeSelection: ["over", "under"],
       xAxis: "accepted_datetime_utc",
       yAxis: "book_risk",
     },
   },
 };
