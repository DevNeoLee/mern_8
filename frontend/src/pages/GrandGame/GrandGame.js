import io from 'socket.io-client'

import Erica0 from './GameErica/Erica0'
import Erica1 from './GameErica/Erica1'
import Erica2 from './GameErica/Erica2'
import Erica3 from './GameErica/Erica3'

import Norman0 from './GameNorman/Norman0'
import Norman1 from './GameNorman/Norman1'
import Norman2 from './GameNorman/Norman2'
import Norman3 from './GameNorman/Norman3'
import Norman4 from './GameNorman/Norman4'
import Norman5 from './GameNorman/Norman5'

import Pete0 from './GamePete/Pete0'
import Pete1 from './GamePete/Pete1'
import Pete2 from './GamePete/Pete2'
import Pete3 from './GamePete/Pete3'

import Instruction from './Instruction'

import { Button } from "react-bootstrap";

import { Link } from "react-router-dom"

import { useEffect, useState } from 'react'

export default function GrandGame() {
    // const roles = ['Erica', 'Pete', 'Norman']
    
    const [role, setRole] = useState('')

    const [pageQuantity, setPageQuantity] = useState(4)

    const [step, setStep] = useState(0) 

    const [ericaMessageForNorman, setEricaMessageForNorman] = useState({customMessageNorman: 'norman...', levelOfWarning: 0})

    const [ericaMessageForPete, setEricaMessageForPete] = useState({ customMessagePete: 'pete...', levelOfWarning: 0 })
        
    const [socket, setSocket] = useState(null)

    const [normanQuestion, setNormanQuestion] = useState(false)

    const [normanHealth, setNormanHealth] = useState(100)
    const [ericaHealth, setEricaHealth] = useState(100)
    const [peteHealth, setPeteHealth] = useState(100)

    const [round, setRound] = useState(1)

    const [electricity, setElectricity] = useState(true)

    const [ players, setPlayers ] = useState(['NormanA', 'NormanB', 'NormanC', 'Pete', 'Erica'])

    // new WebSocket(`wss://${window.location.host}`)
    console.log()

    useEffect(() => {
        console.log('grandGame page begins!')
    }, [])

    useEffect(() => {
        console.log("ericaMessage to norman:", ericaMessageForNorman.customMessageNorman)
        console.log("ericaMessage2 to pete:", ericaMessageForPete.customMessagePete)

    }, [ericaMessageForNorman, ericaMessageForPete])

    useEffect(()=>{
        //////Socket///////////////////////////////////////////////////////////////////
        const socket = io()
        setSocket(socket)
        console.log("socket connected: ")

        socket.on("leaving", () => {
            console.log("someone leaving the room")
        })

        socket.on("left", () => {
            console.log("someone left the room")
        })

        return () => {
            socket.close()
            console.log("socket closed: ")
        }
    }, [setSocket])


    useEffect(() => {
        handleRoleChange(role)
        // socket.emit('role')
    }, [role])


    const giveRoleRandomly = () => {
        console.log('***************giveRoleRandomly clicked!**********')

        setRole(role => ['Erica', 'Pete', 'NormanA', 'NormanB', 'NormanC'][Math.floor(Math.random()*3)])
        // setRole(role => '')

        socket.emit("role")
        console.log('someone joined a room', typeof role)
        // /socket emit/////

        socket.emit("enter_room", 'hello entering', () => {
            console.log("you entered the room1")
            
        })
    }

    const handleRoleChange = () => {
        switch (role) {
         case 'Erica':
            setPageQuantity(quantity => 4)
            console.log("current role: ", role)
            socket.emit("role", {role: role})
            break;
        case 'Pete':
            setPageQuantity(quantity => 4)
            console.log("current role:  ", role)
            socket.emit("role", { role: role })
            break;
        case 'NormanA':
        case 'NormanB':
        case 'NormanC':
            setPageQuantity(quantity => 6)
            console.log("current role: ", role)
            socket.emit("role", { role: role })
            break;
        default:
            setPageQuantity(quantity => 0)
            console.log("current role: none", role)
        }
    }

    //erica communicating through SOCKET  + to do: save to MongoDB
    const ericaSendMessage = (e) => {
        console.log('erica sent message!:')
        e.preventDefault()

        console.log("Data from Erica to Norman: ", JSON.stringify(ericaMessageForNorman))
        // socket interaction
        socket.send(JSON.stringify(ericaMessageForNorman))
    } 

    //erica communicating through SOCKET  + to do: save to MongoDB
    const ericaSendMessage2 = (e) => {
        console.log('erica sent message!:')
        e.preventDefault()

        console.log("Data from Erica to Pete: ", JSON.stringify(ericaMessageForPete))
        // socket interaction
        socket.send(JSON.stringify(ericaMessageForPete))
    } 

    const handleClick = () => {
        console.log("!final click!: ");
    };

    const handleChange = (e) => {
        ericaMessageForNorman(prev => ({ ...prev.levelOfWarning, customMessage: e.target.value}))
        console.log(e.target.value)
    }

    const handleChange2 = (e) => {
        ericaMessageForNorman(prev => ({...prev.customMessage, levelOfWarning: e.target.value}))
        console.log(e.target.value)
    }

    const handleChange3 = (e) => {
        ericaMessageForPete(prev => ({ ...prev.levelOfWarning, customMessage: e.target.value }))
        console.log(e.target.value)
    }

    const handleChange4 = (e) => {
        ericaMessageForPete(prev => ({ ...prev.customMessage, levelOfWarning: e.target.value }))
        console.log(e.target.value)
    }

    const ericas = [
        <Erica0 step={step} role setRole />,
        <Erica1 step={step}/>,
        <Erica2 ericaSendMessage={ericaSendMessage} round={round} ericaSendMessage2={ericaSendMessage2} handleChange={handleChange} handleChange2={handleChange2} handleChange3={handleChange3} handleChange4={handleChange4} ericaMessageForPete={JSON.stringify(ericaMessageForPete)} ericaMessageForNorman={JSON.stringify(ericaMessageForNorman)} ericaHealth={ericaHealth} players={players}/>,
        <Erica3 step={step}/>
    ];
    
    const normans = [
        <Norman0 step={step} />,
        <Norman1 step={step} />,
        <Norman2 step={step} round={round} electricity={electricity} normanQuestion={normanQuestion} normanHealth={normanHealth} ericaMessageForNorman={JSON.stringify(ericaMessageForNorman)} role={role}/>,
        <Norman3 step={step} />,
        <Norman4 step={step} />,
        <Norman5 step={step} />
    ];
    
    const petes = [
        <Pete0 step={step} />,
        <Pete1 step={step} />,
        <Pete2 step={step} round={round} electricity={electricity} normanQuestion={normanQuestion} peteHealth={peteHealth} ericaMessageForNorman={JSON.stringify(ericaMessageForNorman)} />,
        <Pete3 step={step} />
    ];
    
    const Buttons = () => (
        <section className='buttons' >
            {step > 0 && (
                <Button
                type="button"
                onClick={() => {
                    setStep(step - 1);
                    console.log(step)
                }}
                style={{ margin: "0.5rem"}}
                >
                BACK
                </Button>
            )}
            {step === pageQuantity && (
                <Link to="/instructionformpostgame">
                    <Button onClick={handleClick}
                        style={{ margin: "0.5rem" }}
                    >
                    SUBMIT
                    </Button>
                </Link>
            )}

            {step < pageQuantity && (
                <Button
                    type="button"
                    style={{ margin: "0.5rem" }}
                    onClick={() => {
                        setStep(step + 1);
                        console.log("Current Game Page: ", step + 1)
                    }}
                >
                    NEXT
                </Button>
            )}
        </section>
    );
    return (
        <div className="main">
            <div className="gameframe">
            { role ?
                <>
                    { role === 'Erica' ? ericas[step] : role === 'Pete' ? petes[step] : normans[step]}
                    { step !== 2 && <Buttons/> }
                </>
                :
                    <Instruction giveRoleRandomly={giveRoleRandomly} setRole={setRole} />
            }
            </div>
        </div>
    )
}
