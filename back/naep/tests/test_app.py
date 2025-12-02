from http import HTTPStatus


def test_root_deve_retornar_ok_e_ola_mundo(client):
    response = client.get('/')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'message': 'test'}


def test_create_pesquisador(client):
    payload = {
        'nome': 'Carlos Silva',
        'email': 'carlos@example.com',
        'cpf': '123.456.789-00',
        'data_nasc': '1990-01-01',
        'telefones': ['11999999999', '11888888888'],
        'endereco': {
            'rua': 'Rua das Flores',
            'cidade': 'São Paulo',
            'estado': 'SP',
        },
    }

    response = client.post('/pesquisadores/', json=payload)

    assert response.status_code == HTTPStatus.CREATED


def test_read_pesquisadores(client):
    response = client.get('/pesquisadores/')
    assert response.status_code == HTTPStatus.OK
    assert isinstance(response.json()['pesquisadores'], list)


def test_update_pesquisador(client):
    response_create = client.post(
        '/pesquisadores/',
        json={
            'nome': 'Maria da Silva',
            'email': 'maria@teste.com',
            'cpf': '123.456.789-00',
            'data_nasc': '1985-05-20',
            'telefones': ['11999990000'],
            'endereco': {
                'rua': 'Rua A',
                'cidade': 'São Paulo',
                'estado': 'SP',
            },
        },
    )
    user_id = response_create.json()['id']

    pesquisador_update = {
        'nome': 'Maria Souza',
        'email': 'maria.souza@teste.com',
        'cpf': '123.456.789-00',
        'data_nasc': '1985-05-20',
        'telefones': ['11999990000', '21988887777'],
        'endereco': {
            'rua': 'Rua A',
            'cidade': 'Rio de Janeiro',
            'estado': 'RJ',
        },
    }

    response = client.put(f'/pesquisadores/{user_id}', json=pesquisador_update)

    assert response.status_code == HTTPStatus.OK

    expected_response = pesquisador_update.copy()
    expected_response['id'] = user_id

    assert response.json() == expected_response


def test_delete_pesquisador(client):
    response = client.delete('/pesquisadores/1')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'message': 'Pesquisador deleted'}


def test_create_pesquisa(client):
    st = client.post('/status-pesquisa/', json={'status': 'Nova'}).json()
    pesq = client.post(
        '/pesquisadores/',
        json={
            'nome': 'Lider',
            'email': 'l@l.com',
            'cpf': '1',
            'data_nasc': '1990-01-01',
            'telefones': [],
            'endereco': {'rua': 'x', 'cidade': 'x', 'estado': 'x'},
        },
    ).json()
    eq = client.post(
        '/equipes/', json={'nome': 'Eq1', 'ids_pesquisadores': [pesq['id']]}
    ).json()

    payload = {
        'descricao': 'Análise da Água',
        'data_inicio': '2025-01-01',
        'data_fim': '2025-02-01',
        'id_status_pesquisa': st['id'],
        'id_equipe': eq['id'],
        'ids_frequencias': [],
    }

    response = client.post('/pesquisas/', json=payload)

    assert response.status_code == HTTPStatus.CREATED
    assert response.json()['descricao'] == 'Análise da Água'
    assert response.json()['id_equipe'] == eq['id']


def test_update_pesquisa(client):
    pesquisas = client.get('/pesquisas/').json()['pesquisas']
    if not pesquisas:
        test_create_pesquisa(client)
        pesquisas = client.get('/pesquisas/').json()['pesquisas']

    pesquisa_alvo = pesquisas[0]

    pesquisa_update = pesquisa_alvo.copy()
    pesquisa_update['descricao'] = 'Análise da Água (Atualizada)'
    del pesquisa_update['id']

    response = client.put(
        f'/pesquisas/{pesquisa_alvo["id"]}', json=pesquisa_update
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json()['descricao'] == 'Análise da Água (Atualizada)'
    assert response.json()['id'] == pesquisa_alvo['id']


def test_delete_pesquisa(client):
    response = client.delete('/pesquisas/1')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'message': 'Pesquisa deleted'}
