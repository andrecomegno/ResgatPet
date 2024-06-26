// ALTERAR PARA TRUE QUANDO FOR EM PRODUÇÃO
const AMBIENTE_DESENVOLVIMENTO = false; 

export const api = {

    // LOGIN
    Logar: async (EMAIL: string, SENHA: string) => {
        const response = await fetch(`${AMBIENTE_DESENVOLVIMENTO ? 'http://localhost:3005' : 'https://resgatpetapi.onrender.com'}/usuarios/login`, {
            method: 'POST',
            body: JSON.stringify({
                EMAIL: EMAIL,
                SENHA: SENHA
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });

        let json = await response.json()
        return (json)
    },

    // CRIAR NOVA CONTA 
    CriarConta: async (NOMECOMPLETO: string, CPF_CNPJ: string, TELEFONE: string, EMAIL: string, SENHA: string, LEVEL: string) => {
        const response = await fetch(`${AMBIENTE_DESENVOLVIMENTO ? 'http://localhost:3005' : 'https://resgatpetapi.onrender.com'}/usuarios`, {
            method: 'POST',
            body: JSON.stringify({
                NOMECOMPLETO: NOMECOMPLETO,
                CPF_CNPJ: CPF_CNPJ,
                TELEFONE: TELEFONE,
                EMAIL: EMAIL,
                SENHA: SENHA,
                LEVEL: LEVEL
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });

        let json = await response.json()
        return (json)
    },

    // CARREGAR TODOS OS FORMULARIOS
    CarregarTodosFormularios: async () => {
        const response = await fetch(`${AMBIENTE_DESENVOLVIMENTO ? 'http://localhost:3005' : 'https://resgatpetapi.onrender.com'}/formulario`);
        let json = await response.json();
        return json;
    },

    // NOVO FORMULARIO
    CriarFormulario: async (ENDERECO: string, CIDADE: string, RACA: string, SEXO: string,
        COR: string, SAUDE: string, ACESSORIO: string, DATAENTRADA: string, STATUS: string, USUARIO?: string, ARQUIVOS?: string) => {
        const response = await fetch(`${AMBIENTE_DESENVOLVIMENTO ? 'http://localhost:3005' : 'https://resgatpetapi.onrender.com'}/formulario`, {
            method: 'POST',
            body: JSON.stringify({
                ENDERECO: ENDERECO,
                CIDADE: CIDADE,
                RACA: RACA,
                SEXO: SEXO,
                COR: COR,
                SAUDE: SAUDE,
                ACESSORIO: ACESSORIO,
                DATAENTRADA: DATAENTRADA,
                STATUS: STATUS,                
                USUARIO: USUARIO,
                ARQUIVOS: ARQUIVOS
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });

        let json = await response.json()
        return (json)
    },

    // ATUALIZAR IMAGEM
    UpdateImage: async (formData: FormData) => {
        let response = await fetch(`${AMBIENTE_DESENVOLVIMENTO ? 'http://localhost:3005' : 'https://resgatpetapi.onrender.com'}/arquivos`, {
            method: 'POST',
            body: formData,
        });
        let json = await response.json()
        return (json)
    },
}
