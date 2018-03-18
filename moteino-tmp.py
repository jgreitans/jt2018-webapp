from flask import Flask, jsonify, g
import serial

app = Flask(__name__)
cache = {}

@app.route('/')
def index():
	return app.send_static_file('index.html')

@app.route('/temperature')
def temperature():
	result = getTemperature()
	return jsonify(result)

def getTemperature():
	if 'serialport' not in cache:
		cache['serialport'] = serial.Serial('COM6', 115200, timeout=1, write_timeout=1)
	serialport = cache['serialport']
	serialport.write(b't')
	line = serialport.readline().decode("utf-8").strip()
	return float(line)
