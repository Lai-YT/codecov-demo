const calc = require('./calculator')

describe('Number utility test suite', () => {
  test('works on number string', () => {
    expect(calc._isNumberOrNumberString('123')).toBe(true)
    expect(calc._isNumberOrNumberString('123.456')).toBe(true)
    expect(calc._isNumberOrNumberString('123.456.789')).toBe(false)
  })

  test('works on number', () => {
    expect(calc._isNumberOrNumberString(123)).toBe(true)
    expect(calc._isNumberOrNumberString(123.456)).toBe(true)
  })
})

describe('Calculator test suite', () => {
  let calculator

  beforeEach(() => {
    calculator = new calc.Calculator();
  })

  test('calculator clears', () => {
    calculator.clear()

    expect(calculator.currentOperand).toBe('')
    expect(calculator.previousOperand).toBe('')
    expect(calculator.operation).toBe(undefined)
    expect(calculator.validOperand).toBe(true)
  })

  test('calculator can input numbers', () => {
    calculator.appendNumber(1)
    expect(calculator.currentOperand).toBe('1')

    calculator.appendNumber(2)
    expect(calculator.currentOperand).toBe('12')
  })

  test('calculator can deletes', () => {
    calculator.appendNumber(12)
    expect(calculator.currentOperand).toBe('12')

    calculator.delete()
    expect(calculator.currentOperand).toBe('1')
    calculator.delete()
    expect(calculator.currentOperand).toBe('')
  })

  test(`choose operator before giving operand,
      shouldn't recode the operation`, () => {
    calculator.chooseOperation('+')
    expect(calculator.operation).toBeUndefined()
  })

  test('test operation transition between single operation', () => {
    calculator.appendNumber(1)
    calculator.appendNumber(2)
    calculator.chooseOperation('+')
    expect(calculator.currentOperand).toBe('')
    expect(calculator.operation).toBe('+')
    expect(calculator.previousOperand).toBe('12')

    calculator.appendNumber(3)
    calculator.appendNumber(4)
    expect(calculator.currentOperand).toBe('34')
    expect(calculator.operation).toBe('+')
    expect(calculator.previousOperand).toBe('12')
  })

  test(`test operation transition cross operations,
      the second operator should trigger computation`, () => {
    jest.spyOn(calculator, 'callApi')
      .mockImplementation(_ => '46')
    jest.spyOn(calculator, 'updateDisplay')
      .mockImplementation(() => { })

    calculator.appendNumber(1)
    calculator.appendNumber(2)
    calculator.chooseOperation('+')
    calculator.appendNumber(3)
    calculator.appendNumber(4)

    calculator.chooseOperation('-')

    expect(calculator.previousOperand).toBe('46')
    expect(calculator.operation).toBe('-')
    expect(calculator.currentOperand).toBe('')
  })
})
