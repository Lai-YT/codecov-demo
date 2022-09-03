from typing import TYPE_CHECKING

import pytest

from api.app import app

if TYPE_CHECKING:
    from flask import Flask

@pytest.fixture
def _app():
    yield app

@pytest.fixture
def client(_app: 'Flask'):
    return _app.test_client()
