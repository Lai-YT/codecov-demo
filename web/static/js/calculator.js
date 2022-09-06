'use strict'

export class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    this.validOperand = true
  }

  delete() {
    this.currentOperand = _deleteLastChar(this.currentOperand.toString())
  }

  appendNumber(number) {
    if (!this.validOperand) {
      return
    }
    if (number === '.' && _hasDecimalPoint(this.currentOperand)) {
      return
    }
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this._hasValidOperands()) {
      this.compute()
    }
    if (this._hasValidCurrentOperands()) {
      this.operation = operation
      this._passCurrentOperandToPrevious()
    }
  }

  _hasValidOperands() {
    return this._hasValidCurrentOperands()
      && _isNumberOrNumberString(this.previousOperand)
  }

  _hasValidCurrentOperands() {
    return this.validOperand === true
      && _isNumberOrNumberString(this.currentOperand)
  }

  _passCurrentOperandToPrevious() {
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    let operation
    switch (this.operation) {
      case '+':
        operation = 'add'
        break
      case '-':
        operation = 'subtract'
        break
      case '*':
        operation = 'multiply'
        break
      case '÷':
        operation = 'divide'
        break
      default:
        return
    }
    this.callApi(operation)
  }

  async callApi(operation) {
    const response = await fetch('/api/' + operation, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        x: this.previousOperand,
        y: this.currentOperand
      })
    })
    if (!response.ok) {
      throw new Error('Error: ' + response.status)
    }
    this.currentOperand = await response.json()
    this.operation = undefined
    this.previousOperand = ''
    this.updateDisplay()
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = stringNumber
      if (stringNumber.length > 0) {
        this.validOperand = false
      }
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

function _deleteLastChar(str) {
  return str.slice(0, -1)
}

export function _isNumberOrNumberString(number) {
  return typeof(number) === 'number' || _isNumberString(number)
}

function _isNumberString(numberStr) {
  return /^-?\d+\.?\d*$/.test(numberStr)
}

function _hasDecimalPoint(numberStr) {
  numberStr.includes('.')
}
