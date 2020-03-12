var dom = document.getElementById("echarts");
//var title=document.getElementById("province");
//title.innerHTML=JSON.parse(window.localStorage.getItem('provinceName'));
var myChart = echarts.init(dom);
var app = {};
option = null;

data = [
    ["1.27",116],["1.28",129],["1.29",135],["1.30",86],["1.31",73],["2.1",85],["2.2",73],["2.3",68],["2.4",92],["2.5",130],["2.6",245],["2.7",139],["2.8",115],["2.9",111],["2.10",309],["2.11",206],["2.12",137],["2.13",128],["2.14",85],["2.15",94],["2.16",71],["2.17",106],["2.18",84],["2.19",93],["2.20",85],["2.21",73],["2.22",83],["2.23",125],["2.24",107],["2.25",82]];

var dateList = data.map(function (item) {
    return item[0];
});
var valueList = data.map(function (item) {
    return item[1];
});
option = {
    visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
    }],
    title: [{
        left: 'left',
        //text: JSON.parse(window.localStorage.getItem('provinceName'))
    }],
    tooltip: {
        trigger: 'axis'
    },
    xAxis: [{
        data: dateList
    }],
    yAxis: [{
        splitLine: {show: false}
    }],
    grid: [{
        top:'10%',
        bottom: '10%'
    }],
    series: [{
        type: 'line',
        showSymbol: false,
        data: valueList
    }]
};
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}
