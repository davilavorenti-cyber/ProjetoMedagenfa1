# MedAgenda — Frontend demonstrativo

Projeto de interface feito somente com **HTML, CSS e JavaScript puro**. Não utiliza framework nem backend.

## Como executar

1. Extraia a pasta do projeto, se ela estiver compactada.
2. Abra `index.html` em um navegador atualizado (Chrome, Edge ou Firefox).
3. Navegue pelas opções do menu lateral.

Para uma melhor experiência de desenvolvimento, também é possível abrir a pasta em um editor como o Visual Studio Code e executar `index.html` com a extensão Live Server.

## Funcionalidades incluídas

- Painel inicial com indicadores e acesso rápido.
- Telas de médicos, consultas, pacientes e planos de saúde.
- Busca, filtros e paginação nas tabelas.
- Cadastro, edição e exclusão com validação básica.
- Agendamento com calendário, escolha de horário e prevenção de conflito para o mesmo médico/data/horário.
- Dados demonstrativos salvos no `localStorage` do navegador.
- Layout responsivo para computador, tablet e celular.

## Importante

Esta é apenas a camada visual/frontend. Os registros são exemplos fictícios e são armazenados no navegador; ainda não existe autenticação real, API ou banco de dados. Para restaurar os dados iniciais, abra o console do navegador e execute `localStorage.removeItem('medagenda_frontend_v2')`, depois atualize a página.

## Novidades (versão 1.1)

- **Login** com dois perfis. Administrador: `admin@medagenda.com` / `admin123`. Paciente de teste: `maria.silva@email.com` / `123456` (todos os pacientes de exemplo usam `123456`).
- **Área do paciente**: início, minhas consultas (agendar e cancelar) e meus dados. Pacientes também podem criar a própria conta.
- **Cadastros com validação**: CPF com dígito verificador, CRM (12345-PR), telefone e CPF com máscara, data de nascimento em calendário, valor do plano em moeda, e-mail e CPF sem duplicidade.
- **Agendamento**: não permite data/horário passados; o plano vem do cadastro do paciente; médico inativo não é trocado ao editar.
- **Painel**: contadores calculados e próximas consultas ordenadas por data e hora. Dados de exemplo sempre começam a partir de amanhã.

> Atenção: login e senhas são uma simulação no navegador (localStorage). Para uso real, a autenticação precisa ser feita em um servidor.

## Novidades (versão 1.2)

- **Área do médico** (login ou cadastro pela aba "Sou médico"): início com indicadores, Minha Agenda (confirmar, concluir, remarcar e cancelar consultas), Mensagens com pacientes, Receitas e Atestados (emissão e impressão) e Meus Dados com as avaliações recebidas. Médico de teste: `carlos@clinica.com` / `123456` (os médicos de exemplo usam a senha `123456`).
- **Área do paciente**: Mensagens, Receitas e Atestados recebidos, Avaliações (1 a 5 estrelas, onde 5 é o máximo) e Feedback (críticas, sugestões e elogios ao site ou a um médico).
- **Administrador**: nova tela "Feedbacks" com tudo que foi enviado e a nota média de cada médico. Ao cadastrar médico, o administrador define a senha de acesso dele.
- Renomear uma operadora atualiza os pacientes, e plano com pacientes não pode ser excluído.
- Nenhum texto menor que 12px, e o projeto não depende mais de fontes externas (funciona offline).
- Para testar conversas: abra duas abas (uma como médico e outra como paciente). As mensagens aparecem nas duas sem recarregar.
