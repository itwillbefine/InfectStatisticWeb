import pymysql


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


if __name__ == '__main__':
    res = get_data()
    print(res[1])