import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import petImageLogo from '../../assents/imagens/logo/ic_resgatpet.png';
import { api } from '../../api';
import MenuLateral from '../../components/menu-lateral';
import { UsuarioLogadoContext } from '../../context/authContext';
import { format } from 'date-fns';
import { Button, Spinner } from 'reactstrap';

function Formulario() {

    // NAVEGAÇÃO DAS PAGINAS 
    const navigate = useNavigate();

    // CONTEXTO USUARIO
    const auth = useContext(UsuarioLogadoContext)

    // UPDATE IMAGEM 
    const fileInput = useRef<HTMLInputElement>(null)

    // DADOS DO PET
    const [petFoto, SetPetImage] = useState<string>('');
    const [petEndereco, SetPetEndereco] = useState('');
    const [petCidade, SetPetCidade] = useState('');
    const [petSexo, SetPetSexo] = useState('');
    const [petRaca, SetPetRaca] = useState('');
    const [petCor, SetPetCor] = useState('');
    const [loading, setLoading] = useState(false);
    const [petAcessorios, SetPetAcessorios] = useState<string[]>([]);
    const [petSaude, SetPetSaude] = useState<string[]>([]);
    const dataAtual = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const Status = 'Em Andamento'

    // ERROS
    const [messageErro, SetMessageErro] = useState('');
    const [messageOk, SetMessageOk] = useState('');
    const handleErro = (mensagem: string) => {
        SetMessageErro(mensagem);
    }

    async function salvarPets() {
        try {
            if (!petFoto) {
                handleErro('Por favor, coloque uma foto.');
                return;
            }

            // VERIFICA SE TODOS OS COMPOS
            if (!petFoto || !petEndereco || !petCidade || !petRaca || !petSexo || !petCor) {
                handleErro('Por favor, preencha todos os campos.');
                return;
            }

            if (petAcessorios.length === 0) {
                handleErro('Por favor, selecione pelo menos um acessório.');
                return;
            }

            if (petSaude.length === 0) {
                handleErro('Por favor, selecione pelo menos uma opção de saúde.');
                return;
            }
            setLoading(true);

            const files = fileInput.current?.files;
            // VERIFICA SE O TAMANHO DA FOTO E MAIOR QUE ZERO
            if (files && files.length > 0) {
                const fileItem = files[0]
                const data = new FormData()
                // ARQUIVO E A PALAVRA CHAVE DO BACK
                data.append('arquivo', fileItem)
                // CHAMA O JSON UPDATE IMAGEM
                let image = await api.UpdateImage(data)
                // CHAMA O JSON CRIAR FORMULARIO
                console.log(image.nomeArquivo)
                let response = await api.CriarFormulario(
                    // SETA A IMAGEM NO FORMULARIO
                    petEndereco,
                    petCidade,
                    petRaca,
                    petSexo,
                    petCor,
                    petSaude.toString(),
                    petAcessorios.toString(),
                    dataAtual,
                    Status,                    
                    auth?.id,// ID USUARIO
                    image.id, // ID IMAGEM
                )
                
                // alert(auth?.id)

                if (response.success) {
                    // IR ATE A PAGINA ACOMPANHAR 
                    navigate('/dashboard/acompanhar')
                    SetMessageOk(response.message)
                    console.log(image)
                }
                else {
                    console.log("ERRO: ", response)
                    SetMessageErro(response.message)
                }
            }
            setLoading(false);
            
        } catch (e) {
            alert('Erro ao salvar pets:' + e);
            setLoading(false);
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type.startsWith('image/')) {
            SetPetImage(URL.createObjectURL(file));
        } else {
            alert('Por favor, selecione uma imagem válida.');
        }
    }

    function handleInputPetCidade(event: React.ChangeEvent<HTMLInputElement>) {
        SetPetCidade(event.target.value);
    }

    function handleInputPetEndereco(event: React.ChangeEvent<HTMLInputElement>) {
        SetPetEndereco(event.target.value);
    }

    function handleInputPetSexo(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            SetPetSexo(event.target.value);
        }
    }

    function handleInputPetRaca(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            SetPetRaca(event.target.value);
        }
    }

    function handleInputPetCor(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            SetPetCor(event.target.value);
        }
    }

    const handleInputPetAcessorios = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        if (checked) {
            // Se marcado, adiciona à lista
            SetPetAcessorios((prevAcessorios) => [...prevAcessorios, name]);
        } else {
            // Se desmarcado, remove da lista
            SetPetAcessorios((prevAcessorios) => prevAcessorios.filter((item) => item !== name));
        }
    }

    const handleInputPetBemEstar = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        if (checked) {
            SetPetSaude((prevBemEstar) => [...prevBemEstar, name]);
        } else {
            SetPetSaude((prevBemEstar) => prevBemEstar.filter((item) => item !== name));
        }
    }

    function handleClickCancelar() {
        navigate(-1);
    }

    return (
        <div>
            <div className='container'>
                <div className='dashboard '>
                    <MenuLateral />
                    <div className='container-painel'>
                        <div className='formulario'>

                            <div className='dados-pessoais'>
                                <h1>Dados Pessoais</h1>

                                <div>
                                    <label>Seu Nome</label>
                                    <input type="text"
                                        className='disabled'
                                        name="user-name"
                                        value={auth?.nome}
                                        disabled
                                    />
                                </div>

                                <div className="rows">
                                    <div>
                                        <label>E-Mail</label>
                                        <input type="email"
                                            className='disabled capitalize'
                                            name="user-email"
                                            value={auth?.email}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label>Telefone</label>
                                        <input type="tel"
                                            className='disabled'
                                            name="user-tel"
                                            value={auth?.telefone}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='dados-pet'>
                                <h1>Pet Econtrado</h1>
                                <div className="img-pet">
                                    <img className='petimg' src={petFoto || petImageLogo} />
                                </div>

                                <input type="file" onChange={handleImageChange} accept="image/*" ref={fileInput} />

                                <label > * Por Favor coloque o Endereço e a Cidade na onde foi encontrado o Pet </label>
                                <div className="rows">
                                    <div>
                                        <label>Endereço</label>
                                        <input type="text" className='left' name="pet-endereco" placeholder='Endereço' value={petEndereco} onChange={handleInputPetEndereco} />
                                    </div>

                                    <div>
                                        <label>Cidade</label>
                                        <input type="text" name="pet-cidade" placeholder='Cidade' value={petCidade} onChange={handleInputPetCidade} />
                                    </div>
                                </div>

                                <h1>Sexo</h1>
                                <div className="column">
                                    <div className="row">
                                        <div>
                                            <input className='radios' type="radio" name="sexo-macho" checked={petSexo === 'Macho'} value="Macho" onChange={handleInputPetSexo} />
                                            <label>Macho </label>
                                        </div>

                                        <div>
                                            <input className='radios' type="radio" name="sexo-femea" checked={petSexo === 'Fêmea'} value="Fêmea" onChange={handleInputPetSexo} />
                                            <label>Fêmea </label>
                                        </div>
                                    </div>
                                </div>

                                <h1>Raça</h1>
                                <div className="column">
                                    <div className="row">
                                        <div>
                                            <input className='radios' type="radio" name="raca-poodle" checked={petRaca === 'Poodle'} value="Poodle" onChange={handleInputPetRaca} />
                                            <label>Poodle </label>
                                        </div>

                                        <div>
                                            <input className='radios' type="radio" name="raca-pitbull" checked={petRaca === 'Pitbull'} value="Pitbull" onChange={handleInputPetRaca} />
                                            <label>Pitbull </label>
                                        </div>

                                        <div>
                                            <input className='radios' type="radio" name="raca-chow" checked={petRaca === 'Chow Chow'} value="Chow Chow" onChange={handleInputPetRaca} />
                                            <label>Chow Chow </label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div>
                                            <input className='radios' type="radio" name="raca-bulldog" checked={petRaca === 'Bulldog'} value="Bulldog" onChange={handleInputPetRaca} />
                                            <label>Bulldog </label>
                                        </div>
                                        <div>
                                            <input className='radios' type="radio" name="raca-srd" checked={petRaca === 'SRD'} value="SRD" onChange={handleInputPetRaca} />
                                            <label>SRD </label>
                                        </div>
                                    </div>
                                </div>

                                <h1>Cor</h1>
                                <div className="column">
                                    <div className="row">
                                        <div>
                                            <input className='radios' type="radio" name="cor-preto" checked={petCor === 'Preto'} value="Preto" onChange={handleInputPetCor} />
                                            <label>Preto </label>
                                        </div>

                                        <div>
                                            <input className='radios' type="radio" name="cor-branco" checked={petCor === 'Branco'} value="Branco" onChange={handleInputPetCor} />
                                            <label>Branco </label>
                                        </div>

                                        <div>
                                            <input className='radios' type="radio" name="cor-cinza" checked={petCor === 'Cinza'} value="Cinza" onChange={handleInputPetCor} />
                                            <label>Cinza </label>
                                        </div>

                                        <div>
                                            <input className='radios' type="radio" name="cor-vermelho" checked={petCor === 'Vermelho'} value="Vermelho" onChange={handleInputPetCor} />
                                            <label>Vermelho </label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div>
                                            <input className='radios' type="radio" name="cor-creme" checked={petCor === 'Creme'} value="Creme" onChange={handleInputPetCor} />
                                            <label>Creme </label>
                                        </div>
                                        <div>
                                            <input className='radios' type="radio" name="cor-marrom" checked={petCor === 'Marrom'} value="Marrom" onChange={handleInputPetCor} />
                                            <label>Marrom </label>
                                        </div>

                                        <div>
                                            <input className='radios' type="radio" name="cor-caramelo" checked={petCor === 'Caramelo'} value="Caramelo" onChange={handleInputPetCor} />
                                            <label>Caramelo </label>
                                        </div>
                                    </div>
                                </div>

                                <h1>Acessórios</h1>
                                <div className="column">
                                    <div className="row">
                                        <div>
                                            <input className='checkbox' type="checkbox" name='coleira' onChange={handleInputPetAcessorios} />
                                            <label>Coleira </label>
                                        </div>

                                        <div>
                                            <input className='checkbox' type="checkbox" name='corrente-guia' onChange={handleInputPetAcessorios} />
                                            <label>Corrente / Guia </label>
                                        </div>

                                        <div>
                                            <input className='checkbox' type="checkbox" name='focinheira' onChange={handleInputPetAcessorios} />
                                            <label>Focinheira </label>
                                        </div>
                                    </div>
                                </div>

                                <h1>Saúde</h1>
                                <div className="column">
                                    <div className='row'>
                                        <div>
                                            <input className='checkbox' type="checkbox" name='assustado' onChange={handleInputPetBemEstar} />
                                            <label>Assustado </label>
                                        </div>

                                        <div>
                                            <input className='checkbox' type="checkbox" name='ferido' onChange={handleInputPetBemEstar} />
                                            <label>Ferido </label>
                                        </div>

                                        <div>
                                            <input className='checkbox' type="checkbox" name='doente' onChange={handleInputPetBemEstar} />
                                            <label>Doente </label>
                                        </div>

                                        <div>
                                            <input className='checkbox' type="checkbox" name='alegre' onChange={handleInputPetBemEstar} />
                                            <label>Alegre </label>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div>
                                            <input className='checkbox' type="checkbox" name='agressivo' onChange={handleInputPetBemEstar} />
                                            <label>Agressivo </label>
                                        </div>

                                        <div>
                                            <input className='checkbox' type="checkbox" name='calmo' onChange={handleInputPetBemEstar} />
                                            <label>Calmo </label>
                                        </div>
                                    </div>
                                </div>

                                <span className='message-erro'>{messageErro}</span>
                                <span className='message-ok'>{messageOk}</span>

                                <div className="column mobile-botao">
                                    <div className='row'>
                                    {loading && 
                                    <div>
                                        <button className='bt-salvar' type="button" name='salvar' >
                                             Carregando 
                                             {/* <img src="https://static.app.idcommerce.com.br/common/images/climbacommerce/loading.gif"/> */}
                                        </button>
                                        </div>
                                    }
                                    {!loading &&
                                        <div>
                                            <button className='bt-salvar' type="button" name='salvar' onClick={salvarPets} > Salvar </button>
                                          
                                        
                                        </div>

                                        
                                    }
                                        

                                        <div>
                                            <button className='bt-cancelar' type="button" name='cancelar' onClick={handleClickCancelar}> Cancelar </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Formulario