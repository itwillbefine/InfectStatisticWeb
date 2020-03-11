from flask import Flask
from flask import request
from flask import render_template
from datetime import timedelta

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)

@app.route('/')  # （）里的是网址的访问路径
#  这是函数
def index():
    #  返回的是网页内容
    return render_template('index.html')

@app.route('/province')
def province():
    #  返回的是网页内容
    return render_template('province.html')

if __name__ == '__main__':
    app.run(debug=True)
