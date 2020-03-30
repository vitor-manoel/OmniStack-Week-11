import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft  } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from "../../assets/logo.svg";
import './styles.css'

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [value, setValue] = useState('');

    const ongID = localStorage.getItem('ongID');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            desc,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongID
                }
            });

            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar novo caso, tente novamente.');
        }
    }

    return (
        <div className="incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para atrair ajudar.</p>
                
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do Caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={desc}
                        onChange={e => setDesc  (e.target.value)}
                    />
                    <input 
                        placeholder="Valor em R$" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}