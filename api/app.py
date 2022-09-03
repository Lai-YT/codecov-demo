from typing import List

from flask import Flask, request

from api.calculator import Calculator

app = Flask(__name__)


@app.route('/api/add', methods=['POST'])
def add() -> str:
    return operation('add', 2)

@app.route('/api/subtract', methods=['POST'])
def subtract() -> str:
    return operation('subtract', 2)

@app.route('/api/multiply', methods=['POST'])
def multiply() -> str:
    return operation('multiply', 2)

@app.route('/api/divide', methods=['POST'])
def divide() -> str:
    return operation('divide', 2)

def operation(method: str, num_factors: int) -> str:
    factors: List[float] = []
    if num_factors == 2:
        factors.append(float(request.json.get('x')))
        factors.append(float(request.json.get('y')))

    return str(getattr(Calculator, method)(*factors))


if __name__ == '__main__':  # pragma: no cover
    app.run(host='0.0.0.0', port=8080)
