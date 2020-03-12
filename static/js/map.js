var dom = document.getElementById("echarts");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
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
toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
    }
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
        name: '确诊数',
        type: 'map',
        mapType: 'china',
        zoom:1,
        roam: false,
        label: {
            show: true,
            color: 'rgb(249, 249, 249)'
        },
        data: [
           {
              name: '北京',
              value: 181
            }, {
              name: '天津',
              value: 45
            }, {
              name: '上海',
              value: 65
            }, {
              name: '重庆',
              value: 221
            }, {
              name: '河北',
              value: 64
            }, {
              name: '河南',
              value: 262
            }, {
              name: '云南',
              value: 43
            }, {
              name: '辽宁',
              value: 37
            }, {
              name: '黑龙江',
              value: 227
            }, {
              name: '湖南',
              value: 255
            }, {
              name: '安徽',
              value: 270
            }, {
              name: '山东',
              value: 401
            }, {
              name: '新疆',
              value: 44
            }, {
              name: '江苏',
              value: 173
            }, {
              name: '浙江',
              value: 410
            }, {
              name: '江西',
              value: 251
            }, {
              name: '湖北',
              value: 43334
            }, {
              name: '广西',
              value: 116
            }, {
              name: '甘肃',
              value: 9
            }, {
              name: '山西',
              value: 39
            }, {
              name: '内蒙古',
              value: 41
            }, {
              name: '陕西',
              value: 66
            }, {
              name: '吉林',
              value: 31
            }, {
              name: '福建',
              value: 97
            }, {
              name: '贵州',
              value: 41
            }, {
              name: '广东',
              value: 534
            }, {
              name: '青海',
              value: 0
            }, {
              name: '西藏',
              value: 0
            }, {
              name: '四川',
              value: 242
            }, {
              name: '宁夏',
              value: 10
            }, {
              name: '海南',
              value: 41
            }, {
              name: '台湾',
              value: 25
            }, {
              name: '香港',
              value: 60
            }, {
              name: '澳门',
              value: 4
            }
        ]
    }
]
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);

}
myChart.on("click",function(e) {
    //console.log(e);
    $.ajax({
        type: 'POST',
        url: "/postdata",
        data: JSON.stringify(e.name),//{"2.1":134,"2.2":522},
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        success: function(data) {
            window.localStorage.setItem('initdata',JSON.stringify(data));
        },
        error: function(xhr, type) {
        }
    });
    location.href = 'province';
})