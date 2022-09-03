from typing import Literal, Union


class Calculator:
    @staticmethod
    def add(x: float, y: float) -> float:
        return x + y

    @staticmethod
    def subtract(x: float, y: float) -> float:
        return x - y

    @staticmethod
    def multiply(x: float, y: float) -> float:
        return x * y

    @staticmethod
    def divide(x: float, y: float) -> Union[float, Literal['Cannot divide by 0']]:
        try:
            return x * 1.0 / y
        except ZeroDivisionError:
            return 'Cannot divide by 0'
