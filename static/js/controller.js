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

function get_world_data() {
    $.ajax({
        url:"/get_world_data",
        success:function (data) {
           window.localStorage.setItem('worlddata',JSON.stringify(data));
        },
        error:function (xhr, type, errorThrown) {
        }
    })
}

function get_line_data() {
    $.ajax({
        url:"/get_line_data",
        success:function (data) {
           window.localStorage.setItem('line_data',JSON.stringify(data));
        },
        error:function (xhr, type, errorThrown) {
        }
    })
}

function GMT_to_str(time){
    let date = new Date(time);
    let str=(date.getMonth()+1)+'.'+date.getDate();
    return str;
}

function get_url_param(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var param_name = window.location.search.substr(1).match(reg);
      if(param_name != null){
          return decodeURIComponent(param_name[2]); //decodeURIComponent 处理中文乱码
      }
      return null;
}

function change_to_now() {
    china_option.series[0].data=cnow_list;
    china_chart.setOption(china_option, true);
}

function change_to_con() {
    china_option.series[0].data=ccon_list;
    china_chart.setOption(china_option, true);
}

function change_to_wnow() {
    world_option.series[0].data=wnow_list;
    world_chart.setOption(world_option, true);
}

function change_to_wcon() {
    world_option.series[0].data=wcon_list;
    world_chart.setOption(world_option, true);
}

function init_province() {
    $(".divLeft h3").eq(0).text(latest_data.econNum);
    $(".divLeft h3").eq(1).text(latest_data.conNum);
    $(".divLeft h3").eq(2).text(latest_data.cureNum);
    $(".divLeft h3").eq(3).text(latest_data.deathNum);
    $(".title p").text(get_url_param('index'));
}

function change_to_procon() {
    option.xAxis.data=date_list;
    option.title={left: 'left',text: '累计确诊趋势图'};
    option.legend.selected ={'新增确诊':false,'累计确诊':true,'累计治愈':false,'累计死亡':false};
    pro_chart.setOption(option, true);
}

function change_to_sum() {
    option.xAxis.data=date_list_add;
    option.title={left: 'left',text: '新增确诊趋势图'};
    option.legend.selected ={'新增确诊':true,'累计确诊':false,'累计治愈':false,'累计死亡':false};
    pro_chart.setOption(option, true);
}

function change_to_cure_dead() {
    option.xAxis.data=date_list;
    option.title={left: 'left',text: '累计治愈/死亡趋势图'};
    option.legend.selected ={'新增确诊':false,'累计确诊':false,'累计治愈':true,'累计死亡':true};
    pro_chart.setOption(option, true);
}

get_data();
get_con_data();
get_world_data();
get_line_data();
//setInterval(get_data,1000)