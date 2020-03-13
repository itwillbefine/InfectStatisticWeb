import pymysql
import json
import requests
import pypinyin


def get_conn():
    conn = pymysql.connect(host="localhost",
                           user="root",
                           password="",
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

def get_con_data():
    sql = "select province,sum(confirm),sum(heal),sum(dead) from details " \
          "where update_time=(select update_time from details " \
          "order by update_time desc limit 1) group by province"
    res = query(sql)
    return res

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
    return history_list


def change_to_pinyin(word):
    province_name = ''
    for i in pypinyin.pinyin(word, style=pypinyin.NORMAL):
        province_name += ''.join(i)
    return province_name


if __name__ == '__main__':
    res = get_province_data("福建")
   # res=get_data()
    print(res)
    #print(hp("北京"))
