import pymysql
import json
import requests
import pypinyin


def get_conn():
    conn = pymysql.connect(host="localhost",
                           user="root",
                           password="misswang",
                           db="cov",
                           charset="utf8"
                           )
    cursor = conn.cursor()
    return conn, cursor


def close_conn(conn, cursor):
    if cursor:
        cursor.close()
    if conn:
        conn.close()


def query(sql, *args):
    conn, cursor = get_conn()
    cursor.execute(sql, args)
    res = cursor.fetchall()
    close_conn(conn, cursor)
    return res


def get_data():
    sql = "select * from history order by ds desc limit 2"
    res = query(sql)
    return res[0], res[1]


def get_province_data(province_name):
    province_name = change_to_pinyin(province_name)
    url = 'https://gwpre.sina.cn/interface/news/wap/historydata.d.json?province=' + province_name
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/63.0.3239.132 Safari/537.36',
    }
    res = requests.get(url, headers)
    data_all = json.loads(res.text)
    data = data_all["data"]
    history_list = data["historylist"]
    print(history_list)


def change_to_pinyin(word):
    province_name = ''
    for i in pypinyin.pinyin(word, style=pypinyin.NORMAL):
        province_name += ''.join(i)
    return province_name


def get_foreign_data():
    url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_other"
    res = requests.get(url)
    d = json.loads(res.text)
    data_all = json.loads(d["data"])
    foreign_list = {}
    data_foreign = data_all["foreignList"]
    for foreign_infos in data_foreign:
        name = foreign_infos["name"]
        confirm = foreign_infos["confirm"]
        now_confirm = foreign_infos["nowConfirm"]
        foreign_list[name] = {"confirm": confirm, "now_confirm": now_confirm}
    url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5"
    res = requests.get(url)
    d = json.loads(res.text)
    data_all = json.loads(d["data"])
    confirm = data_all["chinaTotal"]["confirm"]
    now_confirm = data_all["chinaTotal"]["nowConfirm"]
    foreign_list['中国'] = {"confirm": confirm, "now_confirm": now_confirm}
    return foreign_list


if __name__ == '__main__':
    print(get_foreign_data())