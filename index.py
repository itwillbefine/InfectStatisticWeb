from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
from datetime import timedelta
import tools
import json

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)


@app.route('/')  # （）里的是网址的访问路径
#  这是函数
def index():
    #  返回的是网页内容
    return render_template('index.html')


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


@app.route('/postdata', methods=['GET', 'POST'])
def postdata():
    if request.method == "POST":
        json_data = request.get_json()
        return jsonify(json_data)
    if request.method == "GET":
        return jsonify()


@app.route('/province')
def province():
    #  返回的是网页内容
    return render_template('province.html')


if __name__ == '__main__':
    app.run(debug=True)
