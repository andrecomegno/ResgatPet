import Cabecalho from '../../components/cabecalho';
import MenuLateral from '../../components/menu-lateral';
import Rodape from '../../components/rodape';

function ResgatarPet() {
    return(
        <div>
            <Cabecalho/>
                <div className='container'>
                    <div className='dashboard'>
                        <MenuLateral/>

                        <div className='container-painel'>
                            <div className='titulo'>
                                <label>Resgatar Pet</label>
                            </div>              

                            <div className='tabela-resgatar-pet'>
                                <label> TABELA DE TODOS <br /> OS PETS PARA RESGATAR</label>
                            </div>
                        </div>
                    </div>
                </div>         
            <Rodape/>
        </div>
    )
}
export default ResgatarPet