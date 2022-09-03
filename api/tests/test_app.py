from typing import TYPE_CHECKING, Final

from hypothesis import HealthCheck, assume, example, given, settings
from hypothesis.strategies import floats, integers

if TYPE_CHECKING:
    from flask.testing import FlaskClient


@settings(suppress_health_check=(HealthCheck.function_scoped_fixture,))
@given(x=floats(), y=floats())
def test_add_float(client: 'FlaskClient', x: float, y: float):
    response = client.post('/api/add', json={'x': x, 'y': y})

    expect: Final[float] = x + y
    assert response.get_data(as_text=True) == str(expect)


@settings(suppress_health_check=(HealthCheck.function_scoped_fixture,))
@given(x=integers(), y=integers())
@example(x=7, y=72057594037928162)
def test_add_int_return_float(client: 'FlaskClient', x: int, y: int):
    response = client.post('/api/add', json={'x': x, 'y': y})

    # MUST cast to float before operating
    expect: Final[float] = float(x) + float(y)
    assert response.get_data(as_text=True) == str(expect)


@settings(suppress_health_check=(HealthCheck.function_scoped_fixture,))
@given(x=floats(), y=floats())
def test_subtract(client: 'FlaskClient', x: float, y: float):
    response = client.post('/api/subtract', json={'x': x, 'y': y})

    expect: Final[float] = x - y
    assert response.get_data(as_text=True) == str(expect)


@settings(suppress_health_check=(HealthCheck.function_scoped_fixture,))
@given(x=floats(), y=floats())
def test_multiply(client: 'FlaskClient', x: float, y: float):
    response = client.post('/api/multiply', json={'x': x, 'y': y})

    expect: Final[float] = x * y
    assert response.get_data(as_text=True) == str(expect)


@settings(suppress_health_check=(HealthCheck.function_scoped_fixture,))
@given(x=floats(), y=floats())
def test_divide(client: 'FlaskClient', x: float, y: float):
    assume(y != 0)

    response = client.post('/api/divide', json={'x': x, 'y': y})

    expect: Final[float] = x / y
    assert response.get_data(as_text=True) == str(expect)


def test_divide_by_zero(client: 'FlaskClient'):
    response = client.post('/api/divide', json={'x': 1, 'y': 0})
    assert response.data == b'Cannot divide by 0'
