import pytest
from fastapi.testclient import TestClient

from naep.app import app


@pytest.fixture
def client():
    return TestClient(app)
