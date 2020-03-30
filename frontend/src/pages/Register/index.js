import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft  } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from "../../assets/logo.svg";
import './styles.css'

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [wpp, setWpp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            wpp,
            cidade,
            uf
        };

        const response = await api.post('ongs', data);

        try {
            alert(`Seu ID de acesso : ${response.data.id}`);
            history.push('/');
        }catch(err) {
            alert('Erro no cadastro, tente novamente !');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma.</p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já Possuo Cadastro !
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp" 
                        value={wpp}
                        onChange={e => setWpp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        />
                        <input 
                            placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}