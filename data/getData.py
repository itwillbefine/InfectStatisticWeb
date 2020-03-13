import requests
import json
import time
import pymysql
import traceback


def get_data():
    url = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_other'
    url1 = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5'
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/80.0.3987.87 Safari/537.36',
    }
    r = requests.get(url, headers)
    res = json.loads(r.text)  # json字符串转字典
    data_all = json.loads(res['data'])
    history = {}  # 历史数据
    for i in data_all["chinaDayList"]:
        ds = "2020." + i["date"]
        tup = time.strptime(ds, "%Y.%m.%d")
        ds = time.strftime("%Y-%m-%d", tup)  # 改变时间格式
        confirm = i["confirm"]
        suspect = i["suspect"]
        heal = i["heal"]
        dead = i["dead"]
        now_confirm = i["nowConfirm"]
        now_severe = i["nowSevere"]
        history[ds] = {"confirm": confirm, "suspect": suspect, "heal": heal, "dead": dead, "now_confirm": now_confirm,
                       "now_severe": now_severe}
    for i in data_all["chinaDayAddList"]:
        ds = "2020." + i["date"]
        tup = time.strptime(ds, "%Y.%m.%d")
        ds = time.strftime("%Y-%m-%d", tup)  # 改变时间格式
        confirm = i["confirm"]
        suspect = i["suspect"]
        heal = i["heal"]
        dead = i["dead"]
        history[ds].update({"confirm_add": confirm, "suspect_add": suspect, "heal_add": heal, "dead_add": dead})

    r1 = requests.get(url1, headers)
    res1 = json.loads(r1.text)  # json字符串转字典
    data_all = json.loads(res1['data'])
    details = []  # 当日详细数据
    update_time = data_all["lastUpdateTime"]
    data_country = data_all["areaTree"]  # list 25个国家
    data_province = data_country[0]["children"]  # 中国各省
    for pro_infos in data_province:
        province = pro_infos["name"]  # 省名
        for city_infos in pro_infos["children"]:
            city = city_infos["name"]
            confirm = city_infos["total"]["confirm"]
            confirm_add = city_infos["today"]["confirm"]
            heal = city_infos["total"]["heal"]
            dead = city_infos["total"]["dead"]
            details.append([update_time, province, city, confirm, confirm_add, heal, dead])
    print(history)
    return history, details


def get_conn():
    conn = pymysql.connect(host="localhost",
                           user="root",
                           password="12345678",
                           db="a",
                           charset="utf8"
                           )
    cursor = conn.cursor()
    return conn, cursor


def close_conn(conn, cursor):
    if cursor:
        cursor.close()
    if conn:
        conn.close()


def insert_history():
    cursor = None
    conn = None
    try:
        dic = get_data()[0]  # 0是历史数据字典，1是最新详细数据
        print(f"{time.asctime()}开始插入数据")
        conn, cursor = get_conn()
        sql = "insert into history values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        for k, v in dic.items():
            cursor.execute(sql, [k, v.get("confirm"), v.get("confirm_add"), v.get("suspect"),
                                 v.get("suspect_add"), v. get("heal"), v.get("heal_add"), v.get("dead"),
                                 v.get("dead_add"), v.get("now_confirm"),v.get("now_severe")])
        conn.commit()
        print(f"{time.asctime()}插入历史数据完毕")
    except:
        traceback.print_exc()
    finally:
        close_conn(conn, cursor)


def update_history():
    cursor = None
    conn = None
    try:
        dic = get_data()[0]  # 0是历史数据字典，1是最新详细数据
        print(f"{time.asctime()}开始插入数据")
        conn, cursor = get_conn()
        sql = "insert into history values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        for k, v in dic.items():
            cursor.execute(sql, [k, v.get("confirm"), v.get("confirm_add"), v.get("suspect"),
                                 v.get("suspect_add"), v. get("heal"), v.get("heal_add"), v.get("dead"),
                                 v.get("dead_add"), v.get("now_confirm"), v.get("now_severe")])
        conn.commit()
        print(f"{time.asctime()}插入历史数据完毕")
    except:
        traceback.print_exc()
    finally:
        close_conn(conn, cursor)


def update_details():
    cursor = None
    conn = None
    try:
        li = get_data()[1]  # 0是历史数据字典，1是最新详细数据
        conn, cursor = get_conn()
        sql = "insert into details(update_time, province, city, confirm, confirm_add, heal, dead) " \
              "values(%s, %s, %s, %s, %s, %s, %s)"
        sql_query = 'select %s=(select update_time from details order by id desc limit 1)'  # 对比当前最大时间戳
        cursor.execute(sql_query, li[0][0])
        if not cursor.fetchone()[0]:
            print(f"{time.asctime()}开始更新数据")
            for item in li:
                cursor.execute(sql, item)
            conn.commit()
            print(f"{time.asctime()}更新最新数据完毕")
        else:
            print(f"{time.asctime()}已是最新数据")
    except:
        traceback.print_exc()
    finally:
        close_conn(conn, cursor)


#insert_history()#爬取历史数据
#update_history()#后续爬取历史数据更新
#update_details()#爬取具体数据