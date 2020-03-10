from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)


@app.route('/')  # （）里的是网址的访问路径
#  这是函数
def index():
    #  返回的是网页内容
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
