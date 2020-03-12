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
            $(".div-small h3").eq(3).text(data.cure);
            $(".div-small span").eq(3).text(data.cure_add);
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

//setInterval(get_data,1000)