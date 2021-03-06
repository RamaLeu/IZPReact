import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { BsCheckCircle } from "react-icons/bs";
import { ref, set, push } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

export default function SupportItem(props) {
    var database = props.db;

    let [qOpened, setQ] = useState(false)
    let [q1, setQ1] = useState(false)
    let [q2, setQ2] = useState(false)
    let [q3, setQ3] = useState(false)
    const [question, setQuestion] = useState('');
    const [email, setEmail] = useState('');


    function qShow() {
        console.log(qOpened)
        setQ(!qOpened)
    }
    function openQ(q) {
        if (q == "q1") {
            setQ1(!q1)
        } else if (q == "q2") {
            setQ2(!q2)
        } else {
            setQ3(!q3)
        }
    }

    function questionInput(e, qType, qTopic, q) {
        e.preventDefault()
        // const refs = ref(database, qType + "/");
        // const newPostRef = push(refs);
        console.log("Success?")
        set((push(ref(database, qType + "/"))), {
            Question_topic: qTopic,
            User_email: email,
            User_question: question,
        });
        e.target.reset();
        props.completeSubmit(<div className='successMessage'>Question Submitted Succesfully!<BsCheckCircle style={!q ? {} : { color: '#af83318e' }} /></div>)
        setQuestion('');
        setEmail('');
        openQ(q)
    }
    return (
        <div className="mainSupport">
            <div className="supportBlock">
                <p>{props.name}</p>
                <div className="icon"><FontAwesomeIcon onClick={(e) => { qShow() }} icon={faAngleDown} style={qOpened ? { transform: 'rotate(180deg)' } : {}} /></div>
            </div>
            {qOpened == true &&
                <div className="allItem">
                    <div className="supportItem">
                        <p>{props.q[0]}</p>
                        <div className="icon"><FontAwesomeIcon onClick={(e) => { openQ("q1") }} icon={faAngleDown} style={q1 ? { transform: 'rotate(180deg)' } : {}} /></div>
                    </div>
                    {q1 == true &&
                        <form onSubmit={(e) => questionInput(e, props.dbTopic, props.q[0], "q1")}>
                            <textarea className='suppTextField' onChange={e => setQuestion(e.target.value)} id="supportGamesSoftwere1" placeholder='Describe what is wrong and we will reply as soon as possible' rows='5'></textarea>
                            <div className='sendBottom'>
                                <input className='suppEmail' onChange={e => setEmail(e.target.value)} type='email' placeholder='Your email'></input>
                                <button type='submit' className="sendButton">send</button>
                            </div>
                        </form>
                    }
                    <div className="supportItem">
                        <p>{props.q[1]}</p>
                        <div className="icon"> <FontAwesomeIcon onClick={(e) => { openQ("q2") }} icon={faAngleDown}
                            style={q2 ? { transform: 'rotate(180deg)' } : {}} /></div>
                    </div>
                    {q2 == true &&
                        <form onSubmit={(e) => questionInput(e, props.dbTopic, props.q[1], "q2")}>
                            <textarea className='suppTextField' name="" id="supportGamesSoftwere2" placeholder='Describe what is wrong and we will reply as soon as possible' rows='8'></textarea>
                            <input className='suppEmail' onChange={e => setEmail(e.target.value)} type='email' placeholder='Your email'></input>
                            <button type='submit' className="sendButton">send</button>
                        </form>
                    }
                    <div className="supportItem">
                        <p>{props.q[2]}</p>
                        <div className="icon"><FontAwesomeIcon onClick={(e) => { openQ("q3") }} icon={faAngleDown}
                            style={q3 ? { transform: 'rotate(180deg)' } : {}} /></div>
                    </div>
                    {q3 == true &&
                        <form onSubmit={(e) => questionInput(e, props.dbTopic, props.q[2], "q3")}>
                            <textarea className='suppTextField' name="" id="supportGamesSoftwere3" placeholder='Describe what is wrong and we will reply as soon as possible' rows='8'></textarea>
                            <input className='suppEmail' onChange={e => setEmail(e.target.value)} type='email' placeholder='Your email'></input>
                            <button type='submit' className="sendButton">send</button>
                        </form>
                    }
                </div>
            }
        </div>
    )
}
