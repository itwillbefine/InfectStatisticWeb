var province = document.getElementById("echarts");
var pro_chart = echarts.init(province);
var app = {};
option = null;

var province_data=JSON.parse(window.localStorage.getItem('initdata'));
var latest_data=province_data["data"][0];

var date_list_add=[];//新增用日期
var date_list=[];//累计用日期
var con_list=[];//累计确诊
var new_list=[];//新增确诊
var cure_list=[];//治愈
var dead_list=[];//死亡

for(var i=province_data["data"].length-1;i>=0;i--){
    if (i<=province_data["data"].length-2) {
            date_list_add.push(province_data["data"][i]["date"]);
            new_list.push(province_data["data"][i]["conNum"]-province_data["data"][i+1]["conNum"]);
    }
    if (province_data["data"][i]["deathNum"]=="") province_data["data"][i]["deathNum"]=0;
    if (province_data["data"][i]["cureNum"]=="") province_data["data"][i]["cureNum"]=0;
    date_list.push(province_data["data"][i]["date"]);
    con_list.push(province_data["data"][i]["conNum"]);
    cure_list.push(province_data["data"][i]["cureNum"]);
    dead_list.push(province_data["data"][i]["deathNum"]);
}
//console.log(con_list);
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
        text: '新增确诊趋势图',
        subtext: '数据来源新浪',
    }],
    color:['#DC143C','#A52A2A','#10aeb5','#000000'],
    legend: {
        show:false,
        data: ['新增确诊', '累计确诊', '累计治愈', '累计死亡'],
        selected:{
            '新增确诊':true,
            '累计确诊':false,
            '累计治愈':false,
            '累计死亡':false
        }
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
        name:'新增确诊',
        type: 'line',

        showSymbol: false,
        data: new_list
    },
    {
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
init_province();
if (option && typeof option === "object") {
    pro_chart.setOption(option, true);
}
