import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import './styles.css'

export const ExpenseTracker = () => {

    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotals } = useGetTransactions();

    const {name, profilePhoto} = useGetUserInfo();

    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const { balance, income, expenses } = transactionTotals;

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({ description, transactionAmount, transactionType });

        setDescription("");
        setTransactionAmount("");
    };

    const signUserOut = async () => {
        try{
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch(err){
            console.error(err);
        }
    };

    return (
        <>
            <div className="wrapper">

            <div className="expense-tracker">
        <div className="container">
            <h1> {name}'s Expense Tracker </h1>
            <div className="balance">
                <h3> Your Balance </h3>
                
                { balance >= 0 ? <h2> ₹ {balance} </h2> : <h2> -₹ {balance * -1} </h2> }

            </div>
            <div className="summary">
                <div className="income">
                    <h3> Income </h3>
                    <p> ₹ {income} </p>
                </div>
                <div className="expenses">
                    <h3> Expenses </h3>
                    <p> ₹ {expenses} </p>
                </div>
            </div>
            <form className="add-transaction" onSubmit={onSubmit}>

                <input className="desc" type="text" placeholder="Description" value={description} required 
                    onChange={(e) => setDescription(e.target.value)}/>

                <input className="amt" type="number" placeholder="Amount" value={transactionAmount} required 
                    onChange={(e) => setTransactionAmount(e.target.value)}/>

                <input type="radio" id="expense" value="expense" 
                    onChange={(e) => setTransactionType(e.target.value)}
                    checked={ transactionType === "expense" }
                />
                <label htmlFor="expense"> Expense </label>

                <input type="radio" id="income" value="income" 
                    onChange={(e) => setTransactionType(e.target.value)}
                    checked={ transactionType === "income" }
                />
                <label htmlFor="income"> Income </label>

                <button className="add-transaction-btn" type="submit"> Add Transaction </button>
            </form>
        </div>

        <div className="profile">
            <img src={profilePhoto}/>
            <button className="sign-out-btn" onClick={signUserOut}> Sign Out </button>
        </div>

    </div>

    <div className="transactions">
        <h3> TRANSACTION HISTORY </h3>
        <ul>
            {transactions.map((transaction) => {

                const { description,  transactionAmount, transactionType } = transaction;

                return <li>
                    <h4 className="list-desc"> { description } </h4>
                    <p className="list-para"> ₹ {transactionAmount} - 
                    <label className="list-label" style={{color: transactionType === "expense" ? "red" : "green"}}> {transactionType} </label></p>
                </li>
            })}
        </ul>
    </div>
            </div>
    </>
    )
};
