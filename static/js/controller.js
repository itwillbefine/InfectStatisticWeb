function get_data() {
    $.ajax({
        url:"/data",
        success:function (data) {
            $(".div-small h3").eq(0).text(data.now_confirm);
            $(".div-small span").eq(0).text(data.now_confirm_add);
            $(".div-small h3").eq(1).text(data.confirm);
            $(".div-small span").eq(1).text(data.confirm_add);
            $(".div-small h3").eq(2).text(data.suspect);
            $(".div-small span").eq(2).text(data.suspect_add);
            $(".div-small h3").eq(3).text(data.heal);
            $(".div-small span").eq(3).text(data.heal_add);
            $(".div-small h3").eq(4).text(data.now_severe);
            $(".div-small span").eq(4).text(data.now_severe_add);
            $(".div-small h3").eq(5).text(data.dead);
            $(".div-small span").eq(5).text(data.dead_add);
        },
        error:function (xhr, type, errorThrown) {
        }
    })
}
get_data();
function get_con_data() {
    $.ajax({
        url:"/get_con_data",
        success:function (data) {
           window.localStorage.setItem('chinadata',JSON.stringify(data));
        },
        error:function (xhr, type, errorThrown) {
        }
    })
}
get_con_data();

function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var paramName = window.location.search.substr(1).match(reg);
      if(paramName != null){
          return decodeURIComponent(paramName[2]); //decodeURIComponent 处理中文乱码
      }
      return null;
}

function change_to_now() {
    option.series[0].data=now_list;
    china_chart.setOption(option, true);
}

function change_to_con() {
    option.series[0].data=con_list;
    china_chart.setOption(option, true);
}

function init_province() {
    $(".divLeft h3").eq(0).text(latest_data.econNum);
    $(".divLeft h3").eq(1).text(latest_data.conNum);
    $(".divLeft h3").eq(2).text(latest_data.cureNum);
    $(".divLeft h3").eq(3).text(latest_data.deathNum);
    $(".title p").text(getUrlParam('index'));
}

function change_to_procon() {
    option.xAxis.data=date_list;
    option.legend.selected ={'新增确诊':false,'累计确诊':true,'累计治愈':false,'累计死亡':false};
    pro_chart.setOption(option, true);
}

function change_to_sum() {
    option.xAxis.data=date_list_add;
    option.legend.selected ={'新增确诊':true,'累计确诊':false,'累计治愈':false,'累计死亡':false};
    pro_chart.setOption(option, true);
}

function change_to_cure_dead() {
    option.xAxis.data=date_list;
    option.legend.selected ={'新增确诊':false,'累计确诊':false,'累计治愈':true,'累计死亡':true};
    pro_chart.setOption(option, true);
}

//setInterval(get_data,1000)