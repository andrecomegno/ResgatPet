import { Link } from 'react-router-dom';

function EsqueceuSenha(){
    return(
        <div>
            <div className='container'>                
                <div className='container-recuperar'>
                    <div className='esqueceu-senha-cont'>
                        <div className='titulo-recuperacao'>
                            <label>Recuperar Senha</label>
                        </div>

                        <div className='user-email-rec'>
                            <input type="text" placeholder='nome@email.com'/>
                        </div>
                        
                        <div className='enviar-recuperacao'>
                            <Link to='/login'>
                                <button >Enviar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EsqueceuSenha