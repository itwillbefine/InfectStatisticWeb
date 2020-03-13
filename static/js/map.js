var china = document.getElementById("echarts");
var china_chart = echarts.init(china);

var data= JSON.parse(window.localStorage.getItem('chinadata'));
var con_list= [];
var now_list= [];

for(var i=0;i<data["data"].length;i++){
    var temp={
        "name":data["data"][i]["name"],
        "value":data["data"][i]["con_value"]
    }
    var temp2={
        "name":data["data"][i]["name"],
        "value":data["data"][i]["now_value"]
    }
    con_list.push(temp);
    now_list.push(temp2);
}

var app = {};
var option = {
  title: {
    text: '中国疫情图',
    left: 'center'
},
tooltip: {
    trigger: 'item'
},
legend: {
    orient: 'vertical',
    left: 'left',
    data: ['中国疫情图']
},
visualMap: {
    type: 'piecewise',
    pieces: [
        {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '确诊500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '确诊100-499人', color: '#974236'},
        {min: 10, max: 99, label: '确诊10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7'},
    ],
    color: ['#E0022B', '#E09107', '#A3E00B']
},
roamController: {
    show: true,
    left: 'right',
    mapTypeControl: {
        'china': true
    }
},
series: [
    {
        showLegendSymbol: false,
        name: '确诊数',
        type: 'map',
        mapType: 'china',
        zoom:1,
        roam: false,
        label: {
            show: true,
            color: 'rgb(249, 249, 249)'
        },
        data:con_list
    }
]
};;

china_chart.setOption(option, true);

china_chart.on("click",function(e) {
    $.ajax({
        type:"POST",
        url: "/postdata",
        data: JSON.stringify(e.name),
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function(data) {
            localStorage.clear();
            console.log(data);
            window.localStorage.setItem('initdata',JSON.stringify(data));
            location.href = 'province?index='+e.name;
        },
        error: function(xhr, type) {
        }
    });
})