var province = document.getElementById("line");
var line_chart = echarts.init(province);
var app = {};

var line_data=JSON.parse(window.localStorage.getItem('line_data'));
//console.log(line_data);
//c=GMT_to_str(line_data["line_data"][0][0]);
//console.log(c);
var date_list_add=[];//新增用日期
var con_list=[];//累计确诊
var cure_list=[];//治愈
var dead_list=[];//死亡

for(var i=0;i<line_data["line_data"].length;i++){
    if (line_data["line_data"][i][7]=="") line_data["line_data"][i][7]=0;
    if (line_data["line_data"][i][5]=="") line_data["line_data"][i][5]=0;
    date_list_add.push(GMT_to_str(line_data["line_data"][i][0]));
    con_list.push(line_data["line_data"][i][1]);
    cure_list.push(line_data["line_data"][i][5]);
    dead_list.push(line_data["line_data"][i][7]);
}
var line_option = {
    visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
    }],
    title: [{
        left: 'left',
        text: '全国 累计确诊/治愈/死亡 趋势图'
    }],
    color:['#DC143C','#10aeb5','#000000'],
    legend: {
        show:true,
        left:'right',
        data: ['累计确诊', '累计治愈', '累计死亡'],
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: [{
        data: date_list_add
    }],
    yAxis: [{
        splitLine: {show: false}
    }],
    grid: [{
        bottom: '10%'
    }],
    series: [{
        showLegendSymbol: false,
        name:'累计确诊',
        type: 'line',
        showSymbol: false,
        data: con_list
    },
    {
        showLegendSymbol: false,
        name:'累计治愈',
        type: 'line',
        showSymbol: false,
        data: cure_list
    },
    {
        showLegendSymbol: false,
        name:'累计死亡',
        type: 'line',
        showSymbol: false,
        data: dead_list
    }
    ]
};;
line_chart.setOption(line_option, true);
