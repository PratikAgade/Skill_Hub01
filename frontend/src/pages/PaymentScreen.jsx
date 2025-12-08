import React from 'react';
import { Shield, Lock, CreditCard, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const PaymentScreen = () => {
    const [balance, setBalance] = React.useState(0);
    const [transactions, setTransactions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [billingMethods, setBillingMethods] = React.useState([
        { id: 1, type: 'VISA', last4: '4242', expiry: '12/28', isDefault: true }
    ]);
    React.useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/payments', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setBalance(data.balance);
                setTransactions(data.transactions);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);
    if (loading) return <div className="p-8 text-center text-gray-500">Loading payments...</div>;
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments & Financials</h1>
                <p className="text-gray-500">Manage your transactions, escrow payments, and billing methods.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                { }
                <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
                    <p className="text-emerald-100 font-medium mb-1">Total Balance</p>
                    <h2 className="text-4xl font-bold mb-6">₹{balance.toLocaleString()}</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={async () => {
                                const amount = prompt("Enter amount to withdraw:");
                                if (amount && !isNaN(amount)) {
                                    try {
                                        const res = await fetch('/api/payments/withdraw', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                                            },
                                            body: JSON.stringify({ amount: Number(amount) })
                                        });
                                        const data = await res.json();
                                        if (res.ok) {
                                            alert(`Successfully withdrew ₹${amount}`);
                                            setBalance(data.balance);
                                            setTransactions([data.transaction, ...transactions]);
                                        } else {
                                            alert(data.message);
                                        }
                                    } catch (err) {
                                        alert("Withdrawal failed");
                                    }
                                }
                            }}
                            className="flex-1 bg-white text-emerald-600 py-2 rounded-lg font-bold hover:bg-emerald-50 transition"
                        >
                            Withdraw
                        </button>
                        <button
                            onClick={async () => {
                                const amount = prompt("Enter amount to add:");
                                if (amount && !isNaN(amount)) {
                                    try {
                                        const res = await fetch('/api/payments/deposit', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                                            },
                                            body: JSON.stringify({ amount: Number(amount) })
                                        });
                                        const data = await res.json();
                                        if (res.ok) {
                                            alert(`Successfully added ₹${amount}`);
                                            setBalance(data.balance);
                                            setTransactions([data.transaction, ...transactions]);
                                        } else {
                                            alert(data.message);
                                        }
                                    } catch (err) {
                                        alert("Deposit failed");
                                    }
                                }
                            }}
                            className="flex-1 bg-emerald-500 text-white border border-emerald-400 py-2 rounded-lg font-medium hover:bg-emerald-400 transition"
                        >
                            Add Funds
                        </button>
                    </div>
                </div>
                { }
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2 text-emerald-600 font-bold">
                        <Shield className="w-6 h-6" /> Escrow Protection Active
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                        Your funds are held safely in escrow until you approve the work. Release payments only when you're 100% satisfied.
                    </p>
                    <Link to="#" className="text-emerald-600 text-sm font-semibold hover:underline flex items-center">
                        Learn more about payment protection <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                    <h3 className="font-bold text-gray-900">Transaction History</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {transactions.length > 0 ? transactions.map(tx => (
                        <div key={tx._id} className="p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1 capitalize">{tx.type}</h4>
                                    <p className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`font-bold ${tx.type === 'deposit' || tx.type === 'earning' ? 'text-emerald-600' : 'text-gray-900'}`}>
                                    {tx.type === 'break' ? '-' : '+'}₹{tx.amount}
                                </span>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-gray-500">No transactions found</div>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Billing Methods</h3>
                    <button
                        onClick={() => {
                            const newMethod = { id: Date.now(), type: 'MASTERCARD', last4: Math.floor(1000 + Math.random() * 9000), expiry: '10/29', isDefault: false };
                            setBillingMethods([...billingMethods, newMethod]);
                        }}
                        className="text-emerald-600 text-sm font-medium hover:underline"
                    >
                        + Add New
                    </button>
                </div>
                <div className="p-6">
                    {billingMethods.length > 0 ? (
                        <div className="space-y-4">
                            {billingMethods.map(method => (
                                <div key={method.id} className="flex items-center justify-between p-4 border rounded-xl border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold tracking-widest">
                                            {method.type}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{method.type} ending in {method.last4}</p>
                                            <p className="text-xs text-gray-500">Expires {method.expiry} {method.isDefault ? '• Default' : ''}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Remove this billing method?')) {
                                                setBillingMethods(billingMethods.filter(m => m.id !== method.id));
                                            }
                                        }}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-4">No billing methods added.</div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PaymentScreen;