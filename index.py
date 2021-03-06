from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
from datetime import timedelta
import datetime
import tools

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)


@app.route('/')  # （）里的是网址的访问路径
#  这是函数
def index():
    #  返回的是网页内容
    return render_template('index.html')


# 获得全国静态数据
@app.route('/data')
def get_data():
    data = tools.get_data()
    data_old = data[1]
    data_new = data[0]
    return jsonify({"confirm": data_new[1], "confirm_add": data_new[2], "suspect": data_new[3],
                    "suspect_add": data_new[4], "heal": data_new[5], "heal_add": data_new[6],
                    "dead": data_new[7], "dead_add": data_new[8], "now_confirm": data_new[9],
                    "now_confirm_add": data_new[9]-data_old[9], "now_severe": data_new[10],
                    "now_severe_add": data_new[10]-data_old[10]})


# 获得全国趋势数据
@app.route('/get_line_data')
def get_line_data():
    data = tools.get_china_data()
    return jsonify({"line_data": data})


# 获得全国地图数据
@app.route('/get_con_data')
def get_con_data():
    res = []
    for tup in tools.get_con_data():
        now = int(tup[1])-int(tup[2])-int(tup[3])
        res.append({"name": tup[0], "con_value": int(tup[1]), "now_value": int(now)})
    return jsonify({"data": res})


# 获得全球地图数据
@app.route('/get_world_data')
def get_world_data():
    return jsonify(tools.get_foreign_data())


# 获得省份数据
@app.route('/post_data', methods=['POST'])
def post_data():
    province_name = request.get_json()
    res = tools.get_province_data(province_name)
    return jsonify({"data": res})


@app.route('/province')
def province():
    #  返回的是网页内容
    return render_template('province.html')


if __name__ == '__main__':
    app.run(debug=True)
